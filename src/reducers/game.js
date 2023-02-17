import { createSlice } from '@reduxjs/toolkit';

import { hello_backend as gameserver } from '../declarations/hello_backend/index.js';

const initialState = {
  player: {
    id: 1,
    name: 'Yobo',
    cards: [
      { color: 'spades', num: '2' },
      { color: 'spades', num: 'ace' },
      { color: 'diamonds', num: 'queen' },
    ],
  },
  combinations: [
    [
      { color: 'spades', num: '2' },
      { color: 'spades', num: '3' },
      { color: 'spades', num: '4' },
    ],
    [
      { color: 'diamonds', num: 'jack' },
      { color: 'diamonds', num: 'queen' },
      { color: 'diamonds', num: 'king' },
    ],
  ],
  others: [
    {
      name: 'John',
      count: 12,
    },
    {
      name: 'Peter',
      count: 11,
    },
    {
      name: 'Alice',
      count: 12,
    },
    {
      name: 'Jessica',
      count: 7,
    },
  ],
  gamestack: {
    visible: { color: 'diamonds', num: 'ace' },
  },
};

const fixcards = x => {
  return x.map(card => {
    return {
      num: card.num,
      color: Object.keys(card.color)[0],
    };
  });
};

const fixcardsMo = x => {
  return x.map(card => {
    return {
      num: Number(card.num),
      color: { [card.color]: null },
    };
  });
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    set_new_game: (state, action) => {
      state.id = action.payload.gameIdx;

      state.player = {
        name: 'Me',
        idx: action.payload.playerIdx,
        cards: [],
      };
      state.combinations = [];
      state.others = [];
      state.gamestack = {
        visible: false,
      };
    },
    update_gamestate: (state, action) => {
      let p = action.payload;
      state.playerTurn = p.playerTurn;
      state.combinations = p.combos;

      let selected = state.player.cards.filter(x => x.selected);

      state.player.cards = fixcards(p.cards);
      for (let card of selected) {
        let found = state.player.cards.findIndex(
          x => x.num === card.num && x.color === card.color
        );
        state.player.cards[found].selected = true;
      }
      state.table = p.table;
      state.others = p.players;
    },
    selectToggle: (state, action) => {
      state.player.cards[action.payload.idx].selected =
        !state.player.cards[action.payload.idx].selected;
    },
    combineSelected: (state, action) => {
      let selected = state.player.cards.filter(x => x.selected);
      state.combinations[action.payload.comboIdx].push(...selected);
      state.player.cards = state.player.cards.filter(x => !x.selected);
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectToggle, combineSelected, set_new_game, update_gamestate } =
  gameSlice.actions;

export const new_game = name => async (dispatch, getState) => {
  let game_id = await gameserver.new();

  let player_id = await gameserver.join(game_id, name);

  dispatch(
    set_new_game({ gameIdx: Number(game_id), playerIdx: Number(player_id) })
  );

  dispatch(ping());
  return game_id;
};

export const ping = () => async (dispatch, getState) => {
  let s = getState();

  let gameIdx = s.game.id;
  let playerIdx = s.game.player.idx;

  let gstate = await gameserver.ping(gameIdx, playerIdx);
  gstate = SerializableIC(gstate);

  dispatch(update_gamestate(gstate));

  setTimeout(() => {
    dispatch(ping());
  }, 1000);
  console.log(gstate);
};

export const join_game = (game_id, name) => async (dispatch, getState) => {
  let player_id = await gameserver.join(game_id, name);

  dispatch(
    set_new_game({ gameIdx: Number(game_id), playerIdx: Number(player_id) })
  );

  dispatch(ping());
};

export const start_game = () => async (dispatch, getState) => {
  let s = getState();
  let gameIdx = s.game.id;

  await gameserver.start(gameIdx);
};

export const play_combo = () => async (dispatch, getState) => {
  let s = getState();
  let gameIdx = s.game.id;
  let playerIdx = s.game.player.idx;

  let selected = fixcardsMo(s.game.player.cards.filter(x => x.selected));
  console.log(selected);
  let rez = await gameserver.play_combo(gameIdx, playerIdx, [], selected, {
    prefix: null,
  });

  console.log(rez);
};

export const SerializableIC = x => {
  if (x === undefined || x === null) return x;
  if (typeof x === 'bigint') return x.toString();
  if (ArrayBuffer.isView(x) || x instanceof ArrayBuffer)
    return [...x].map(y => SerializableIC(y));

  if (Array.isArray(x)) {
    return x.map(y => SerializableIC(y));
  }

  if (typeof x === 'object') {
    if ('toText' in x) return x.toText();

    return Object.fromEntries(
      Object.keys(x).map(k => {
        return [k, SerializableIC(x[k])];
      })
    );
  }
  return x;
};

export default gameSlice.reducer;
