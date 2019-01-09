import { Thread } from "./thread.model";
import { Message } from "../message/message.model";
import * as uuid from 'uuid/v1';
import { Action } from "@ngrx/store";

export enum ThreadActionType {
  ADD_MESSAGE = "[Thread] Add Message",
  ADD_THREAD = "[Thread] Add",
  SELECT_THREAD = '[Thread] Select',
  FETCH_THREAD = '[Thread] Fetch',
  FETCH_THREAD_SUCCESS = '[Thread] Fetch Success'
}

export class AddThread implements Action {
  readonly type = ThreadActionType.ADD_THREAD
  constructor(public thread: Thread){}
}

export class AddMessage implements Action {
  readonly type = ThreadActionType.ADD_MESSAGE;
  constructor (public thread: Thread, public message: Message){}
}

export class SelectThread implements Action {
  readonly type = ThreadActionType.SELECT_THREAD
  constructor(public thread: Thread){}
}

export class FetchThread implements Action {
  readonly type = ThreadActionType.FETCH_THREAD
  constructor(public payload: any){}
}

export class FetchThreadSuccess implements Action {
  readonly type = ThreadActionType.FETCH_THREAD_SUCCESS
  constructor(public payload: Thread[]){}
}

export type ThreadActions = AddThread | AddMessage | SelectThread | FetchThread | FetchThreadSuccess;
