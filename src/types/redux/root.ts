import { AdminLoginState } from "../../redux/features/Admin/AdminSlice";
import { LoginState } from "../../redux/features/loginSlice";

export interface BaseState {
  success: boolean;
  data: unknown;
  error: string;
  loading: boolean;
};

export type RootState = {
    login: LoginState,
    signUp: BaseState,
    document: BaseState,
    institution: BaseState,
    user: BaseState,
    verify: BaseState,
    adminLogin: AdminLoginState
}
