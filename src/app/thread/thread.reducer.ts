import { Thread } from "./thread.model";
import {
  ThreadActionType,
  ThreadActions
} from "./thread.actions";
import { Message } from "../message/message.model";
import { List } from "immutable";
import { createSelector } from "@ngrx/store";

export interface ThreadsEntities {
  [id: string]: Thread;
}

export interface ThreadState {
  loading: boolean;
  currentThreadId: string;
  threads: List<Thread>;
}

const initialState: ThreadState = {
  loading: false,
  currentThreadId: null,
  threads: List<Thread>()
};

export const getAllThreads = (state: ThreadState) => state.threads;

export const getCurrentThreadId = (state: ThreadState) => state.currentThreadId;

export const getCurrentThread = createSelector(
  getAllThreads,
  (threads: List<Thread>) => {}
)


export function ThreadsReducer(state: ThreadState = initialState, action: ThreadActions) {
  switch (action.type) {
    case ThreadActionType.FETCH_THREAD:
    return {
      loading: false,
      ...state
    }

    case ThreadActionType.FETCH_THREAD_SUCCESS:
    return {
      loading: true,
      threads: action.payload
    }

    case ThreadActionType.SELECT_THREAD:
    return {
      loading: false,
      threads: state.threads,
      currentThreadId: action.thread.id
    }

    default:
      return state;
  }
};
