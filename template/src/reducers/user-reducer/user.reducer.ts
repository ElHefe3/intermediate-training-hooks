import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { userModel } from '../../models';
import { UserModelProps, UserState } from '../../types';

const initialState: UserState = {
  isLoading: false,
  user: userModel(),
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUserAction: (state, action: PayloadAction<UserModelProps>) => {
      state.user = action.payload;
    },
  },
});

export const { setLoadingAction, setUserAction } = userSlice.actions;
export const userSelector = (state: RootState) => state.userReducer;

export default userSlice.reducer;
