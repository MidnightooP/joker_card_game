import Game "./game";
import PseudoRandom "./rand";
import Buffer "mo:base/Buffer";
import Array "mo:base/Array";

actor {
  type Card = Game.Card;

  var rand = PseudoRandom.PseudoRandom();
  var _deck : [Card] = [];

  var lastGame : Nat = 0;
  let games = Buffer.Buffer<Game.GameState>(1);

  public func new() : async Nat {
    let game : Game.GameState = {
      var deck = Game.shuffle(rand, Game.create_deck());
      var table = [];
      var combos = [];
      var players = [];
      var started = false;
    };
    games.add(game);
    lastGame += 1;
    lastGame - 1;
  };

  public func join(gameIdx : Nat, name : Text) : async Nat {
    // returns player idx
    let game = games.get(gameIdx);
    let player : Game.Player = { var cards = []; name };
    game.players := Array.append(game.players, [player]);
    Buffer.fromArray<Game.Player>(game.players).size() - 1; // Array.size non existent
  };

  public func start(gameIdx : Nat) : async () {
    let game = games.get(gameIdx);

    var remaining = game.deck;
    game.players := Array.mapEntries<Game.Player, Game.Player>(
      game.players,
      func(player, idx) {
        let (drawn, after) = Game.draw(remaining, 13);
        remaining := after;
        {
          var cards = drawn;
          name = player.name;
        };
      },
    );
    game.deck := remaining;
    game.started := true;
  };

  public query func ping(gameIdx : Nat, playerIdx : Nat) : async Game.PlayerState {
    let game = games.get(gameIdx);
    let player = game.players.get(playerIdx);
    {
      cards = player.cards;
      table = game.table;
      combos = game.combos;
      started = game.started;
      visible = game.deck[0];
      players = Array.mapEntries<Game.Player, Game.PublicPlayer>(
        game.players,
        func((x, idx)) {
          {
            name = x.name;
            count = Buffer.fromArray<Card>(x.cards).size(); // Array.size non existent
          };
        },
      );
    };
  };

  public query func verification(inp : [Card]) : async ([Card], Bool) {
    Game.verification(inp);
  };

  public func score() : async ([Card], Nat) {
    let (drawn, remain) = Game.draw(_deck, 4);
    (drawn, Game.score(drawn));
  };
};