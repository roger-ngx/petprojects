import { Injectable } from "@angular/core";
import { Effect, Actions } from '@ngrx/effects';
import { FETCH_MESSAGES, FetchMessages, FetchMessagesSuccess, MessageActions } from "./message.action";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Message } from "./message.model";
import { AngularFirestore } from "angularfire2/firestore";

@Injectable()
export class MessageEffects {
  constructor(private actions: Actions, private db: AngularFirestore) {}

  @Effect()
  getPost: Observable<MessageActions> = this.actions.ofType(FETCH_MESSAGES)
          .map((action: FetchMessages) => action.payload)
          .mergeMap(payload => this.db.collection(payload, ref => ref.orderBy('time')).valueChanges())
          .map((post) => {
            return new FetchMessagesSuccess(<Message[]>post);
          })
}
