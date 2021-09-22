export type UserModelProps = {
  email: string;
  mobile: string;
};

export interface UserState {
  isLoading: boolean;
  user: UserModelProps;
}
