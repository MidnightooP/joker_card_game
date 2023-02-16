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
      var playerTurn = 0;
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

  public func take_card(gameIdx : Nat, playerIdx : Nat) : () {
    let game = games.get(gameIdx);
    let (drawn, after) = Game.draw(game.deck, 1);
    game.deck := after;
    game.players[playerIdx].cards := Array.append(game.players[playerIdx].cards, drawn);

  };

  public func play_combo(gameIdx : Nat, playerIdx : Nat, groupIdx : ?Nat, cards : [Card], where : { #prefix; #suffix }) : async Bool {
    let game = games.get(gameIdx);

    let combo = switch (groupIdx) {
      case (null) {
        // new group
        [];
      };
      case (?idx) {
        // group already exists
        game.combos[idx];
      };
    };

    let combo_added = switch (where) {
      case (#prefix) Array.append(cards, combo);
      case (#suffix) Array.append(combo, cards);
    };

    let (cards_for_score, ok) = Game.verification(combo_added);
    if (ok == false) return false;
    // remove cards from player
    let buf = Buffer.fromArray<Card>(cards); // make it a buffer because we need indexOf
    game.players[playerIdx].cards := Array.filter(
      game.players[playerIdx].cards,
      func(pcard : Card) : Bool {
        switch (
          Buffer.indexOf<Card>(
            pcard,
            buf,
            func(a, b) {
              a.num == b.num and a.color == b.color
            },
          ),
        ) {
          case (null) true;
          case (?idx) false;
        };
      },
    );

    // add cards to group
    switch (groupIdx) {
      case (null) {
        // new group
        game.combos := Array.append(game.combos, [combo_added]);
      };
      case (?idx) {
        // group already exists (replace)
        let bf = Buffer.fromArray<[Card]>(game.combos);
        bf.put(idx, combo_added);
        game.combos := Buffer.toArray(bf);
      };
    };
    true;
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
      playerTurn = game.playerTurn;
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
