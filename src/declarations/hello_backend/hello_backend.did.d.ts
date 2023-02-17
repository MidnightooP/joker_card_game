import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Card { 'num' : bigint, 'color' : Color }
export interface Card__1 { 'num' : bigint, 'color' : Color }
export type Color = { 'diamonds' : null } |
  { 'clubs' : null } |
  { 'joker' : null } |
  { 'spades' : null } |
  { 'hearts' : null };
export interface PlayerState {
  'table' : Array<Card__1>,
  'started' : boolean,
  'cards' : Array<Card__1>,
  'players' : Array<PublicPlayer>,
  'playerTurn' : bigint,
  'combos' : Array<Array<Card__1>>,
}
export interface PublicPlayer { 'name' : string, 'count' : bigint }
export interface _SERVICE {
  'join' : ActorMethod<[bigint, string], bigint>,
  'new' : ActorMethod<[], bigint>,
  'ping' : ActorMethod<[bigint, bigint], PlayerState>,
  'play_combo' : ActorMethod<
    [
      bigint,
      bigint,
      [] | [bigint],
      Array<Card>,
      { 'suffix' : null } |
        { 'prefix' : null },
    ],
    boolean
  >,
  'score' : ActorMethod<[], [Array<Card>, bigint]>,
  'start' : ActorMethod<[bigint], undefined>,
  'take_card' : ActorMethod<[bigint, bigint], undefined>,
  'verification' : ActorMethod<[Array<Card>], [Array<Card>, boolean]>,
}
