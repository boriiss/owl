import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productsReducer from '../features/products/productsSlice';
import feedbackReducer from '../features/feedback/feedbackSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    feedback: feedbackReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;