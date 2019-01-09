import { Message } from "./message.model";
import {
  MessageActions,
  FETCH_MESSAGES,
  FETCH_MESSAGES_SUCCESS
} from "./message.action";
import { List } from "immutable";

export interface MessageState {
  loading: boolean;
  messages: List<Message>;
}

const initialState: MessageState = {
  loading: false,
  messages: List<Message>()
};

export function messageReducer(state = initialState, action: MessageActions) {
  switch (action.type) {
    case FETCH_MESSAGES:
      return {
        ...state,
        loading: true
      };

    case FETCH_MESSAGES_SUCCESS:
      return {
        loading: false,
        messages: action.payload
      };

    default:
      return state;
  }
}
