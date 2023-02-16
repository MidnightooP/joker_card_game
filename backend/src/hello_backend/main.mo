import Game "./game";
import PseudoRandom "./rand";
import Buffer "mo:base/Buffer";

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
      var combos = [[]];
      var players = [];
      var started = false;
    };
    games.add(game);
    lastGame += 1;
    lastGame;
  };

  public query func verification(inp : [Card]) : async ([Card], Bool) {
    Game.verification(inp);
  };

  public func draw() : async [Card] {
    let (drawn, remain) = Game.draw(_deck, 13);
    _deck := remain;
    drawn;
  };

  public func score() : async ([Card], Nat) {
    let (drawn, remain) = Game.draw(_deck, 4);
    (drawn, Game.score(drawn));
  };
};
