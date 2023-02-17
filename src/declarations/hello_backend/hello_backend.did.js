export const idlFactory = ({ IDL }) => {
  const Color = IDL.Variant({
    'diamonds' : IDL.Null,
    'clubs' : IDL.Null,
    'joker' : IDL.Null,
    'spades' : IDL.Null,
    'hearts' : IDL.Null,
  });
  const Card__1 = IDL.Record({ 'num' : IDL.Nat, 'color' : Color });
  const PublicPlayer = IDL.Record({ 'name' : IDL.Text, 'count' : IDL.Nat });
  const PlayerState = IDL.Record({
    'table' : IDL.Vec(Card__1),
    'started' : IDL.Bool,
    'cards' : IDL.Vec(Card__1),
    'players' : IDL.Vec(PublicPlayer),
    'playerTurn' : IDL.Nat,
    'combos' : IDL.Vec(IDL.Vec(Card__1)),
  });
  const Card = IDL.Record({ 'num' : IDL.Nat, 'color' : Color });
  return IDL.Service({
    'join' : IDL.Func([IDL.Nat, IDL.Text], [IDL.Nat], []),
    'new' : IDL.Func([], [IDL.Nat], []),
    'ping' : IDL.Func([IDL.Nat, IDL.Nat], [PlayerState], ['query']),
    'play_combo' : IDL.Func(
        [
          IDL.Nat,
          IDL.Nat,
          IDL.Opt(IDL.Nat),
          IDL.Vec(Card),
          IDL.Variant({ 'suffix' : IDL.Null, 'prefix' : IDL.Null }),
        ],
        [IDL.Bool],
        [],
      ),
    'score' : IDL.Func([], [IDL.Vec(Card), IDL.Nat], []),
    'start' : IDL.Func([IDL.Nat], [], []),
    'take_card' : IDL.Func([IDL.Nat, IDL.Nat], [], ['oneway']),
    'verification' : IDL.Func(
        [IDL.Vec(Card)],
        [IDL.Vec(Card), IDL.Bool],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
