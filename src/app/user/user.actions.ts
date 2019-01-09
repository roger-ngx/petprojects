import { User } from "./user.model";
import { Action } from "@ngrx/store";

export const SET_CURRENT_USER = "[User] Set Current";
export interface SetCurrentUserAction extends Action {
  user: User;
}

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user: user
});
