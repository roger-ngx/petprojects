import { User } from "./user.model";
import { SetCurrentUserAction, SET_CURRENT_USER } from "./user.actions";
import { Action } from "@ngrx/store";

export interface UserState {
  currentUser: User;
}

const initialState: UserState = {
  currentUser: null
};

export function UserReducer(state: UserState = initialState, action: Action): UserState{
    switch(action.type){
      case SET_CURRENT_USER:
      const user: User = (<SetCurrentUserAction> action).user;
      return {
        currentUser: user
      }

      default:
      return state;
    }
  }
