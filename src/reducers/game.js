import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = gameSlice.actions;

export default gameSlice.reducer;
