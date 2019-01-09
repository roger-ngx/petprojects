import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { AngularFireDatabase } from "angularfire2/database";
import { ThreadActionType, ThreadActions, FetchThread, FetchThreadSuccess } from "./thread.actions";
import { Thread } from "./thread.model";
import { AngularFirestore } from "angularfire2/firestore";
import { List } from "immutable";

@Injectable()
export class ThreadEffects {
  constructor(private action: Actions, private db: AngularFireDatabase, private afs: AngularFirestore){}

  @Effect()
  threads$ = this.action.ofType(ThreadActionType.FETCH_THREAD)
  .map((action: FetchThread) => action.payload)
  .mergeMap(payload => this.afs.collection(payload).snapshotChanges())
  .map(threads => threads.map(thread => {
          const threadId =  (<any>thread.payload.doc).id;

          if(threadId != 'info'){
            let obj = {};

            const data = thread.payload.doc.data();
            console.log(data);
            obj['id'] = threadId;
            obj['content'] = (<any>data).content;
            obj['photoUrl'] = (<any>data).photoUrl;

            return obj;
          }
    })
  ).map(threads =>  {
    threads.splice(0, 1);
    return new FetchThreadSuccess(<Thread[]> threads);
  });
}
