import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import musicConfigReducer from './slices/musicConfig';
import videoConfigReducer from './slices/videoConfig';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    musicConfig: musicConfigReducer,
    videoConfig: videoConfigReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
