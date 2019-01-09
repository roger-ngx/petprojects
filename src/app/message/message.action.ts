import { Action } from "@ngrx/store";
import { Message } from "./message.model";

export const FETCH_MESSAGES = 'FETCH MESSAGES';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';

export class FetchMessages implements Action{
  readonly type = FETCH_MESSAGES;
  constructor(public payload: any) {};
}

export class FetchMessagesSuccess implements Action {
  readonly type = FETCH_MESSAGES_SUCCESS;
  constructor(public payload: Message[]) {}
}

export type MessageActions = FetchMessages | FetchMessagesSuccess;
