import { Component, OnInit, Inject } from '@angular/core';
import { Thread } from '../thread/thread.model';
import * as ThreadActions from '../thread/thread.actions';
import { AppState } from '../app.reducer';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { List } from 'immutable';
import { FetchMessages } from '../message/message.action';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.css']
})
export class ChatThreadsComponent {
  threads: Observable<List<Thread>>;
  currentThread: Observable<Thread>;
  searchResult;

  constructor(private store: Store<AppState>, private db: AngularFirestore) {
    console.log(localStorage.getItem('user'));
    store.dispatch(new ThreadActions.FetchThread(localStorage.getItem('user')));
    this.threads = store.select('threads').map(threads => threads.threads);
    this.threads.subscribe(threads => console.log('Threads', threads));
  }

  handleThreadClicked(thread) {
    this.store.dispatch(
      new FetchMessages(
        localStorage.getItem('user') + '/' + thread.id + '/messages'
      )
    );
    this.store.dispatch(new ThreadActions.SelectThread(thread));
  }

  seachFriends(text) {
    const info = this.db
      .collection(text)
      .doc('info')
      .valueChanges();
    info.subscribe(data => {
      this.searchResult = data;
      $('#btn_add').removeAttr('disabled');
    });
  }

  addFriend() {
    if (this.searchResult != null) {
      const user = localStorage.getItem('user');
      this.db.collection(user).doc(this.searchResult.name)
        .set({
          name: this.searchResult.name,
          email: this.searchResult.email,
          photoUrl: this.searchResult.photoUrl
        });

      (<any>$('#addFriendsModal')).modal('hide');
    }

    $('#btn_add').attr('disabled', 'disabled');
    this.searchResult = null;
  }
}
