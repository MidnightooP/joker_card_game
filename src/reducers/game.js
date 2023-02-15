import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  player: {
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

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
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
export const { selectToggle, combineSelected } = gameSlice.actions;

export default gameSlice.reducer;
