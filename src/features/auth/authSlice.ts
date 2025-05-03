import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getCurrentUser } from '../../api/fakerApi';

interface User {
  website: any;
  address: any;
  phone: string;
  email: string;
  id: number;
  firstname: string;
  lastname: string;
  birthday: string;
  image?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export const login = () => async (dispatch: any) => {
  try {
    dispatch(loginStart());
    const user = await getCurrentUser();
    dispatch(loginSuccess(user));
  } catch (err) {
    dispatch(loginFailure(err?err.toString(): ''));
  }
};

export default authSlice.reducer;