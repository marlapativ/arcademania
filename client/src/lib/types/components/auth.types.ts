import type { ReactChildrenProps } from "../globals";

export interface AuthProps extends ReactChildrenProps {
  isAuth: boolean;
}

export type SignUpUserType = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmpassword: string;
};

export type AuthState = {
  token: string;
};
