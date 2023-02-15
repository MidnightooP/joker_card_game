import { configureStore } from '@reduxjs/toolkit';
import game from './reducers/game';

export const store = configureStore({
  reducer: { game },
});
