import { AppDispatch, AppThunk } from '../store';
import { setLoadingAction, setUserAction } from './user.reducer';
import { userService } from '../../services';
import { userModel } from '../../models';

export const getUserAction = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(setLoadingAction(true));
  return userService
    .getCurrentUser()
    .then((data) => {
      const user = userModel(data);
      dispatch(setUserAction(user));
    })
    .finally(() => dispatch(setLoadingAction(false)));
};
