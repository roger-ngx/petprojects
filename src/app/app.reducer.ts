
import { UserState, UserReducer } from "./user/user.reducer";
import { combineReducers, ActionReducer } from "@ngrx/store";
import { MessageState } from "./message/message.reducer";
import { ThreadState } from "./thread/thread.reducer";

export interface AppState {
  user: UserState;
  threads: ThreadState;
  messages: MessageState
}
