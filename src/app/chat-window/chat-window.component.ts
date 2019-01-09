import { Component, OnInit, Inject, ElementRef, ChangeDetectionStrategy, AfterViewInit } from "@angular/core";
import { Thread } from "../thread/thread.model";
import { User } from "../user/user.model";
import { Store, select } from "@ngrx/store";
import { AppState } from "../app.reducer";
import { Observable } from "rxjs";
import { FirebaseService } from "../services/firebase.service";
import { FetchMessages } from "../message/message.action";
import { Message } from "../message/message.model";
import { List } from "immutable";
import { getCurrentThreadId, ThreadState } from "../thread/thread.reducer";
import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireStorage } from "angularfire2/storage";

@Component({
  selector: "app-chat-window",
  templateUrl: "./chat-window.component.html",
  styleUrls: ["./chat-window.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent implements OnInit{
  currentThread: Observable<Thread>;
  draftMessage: { text: string };
  currentUser: User;

  messages: Observable<List<Message>>;

  currentThreadId;

  constructor(private store: Store<AppState>, private el: ElementRef, private db: AngularFirestore, private storage: AngularFireStorage) {

    this.draftMessage = { text: "" };
    this.messages = store.select('messages').map(msgs => msgs.messages);

    store.select('threads').subscribe((state: ThreadState) => {
        console.log(state);
        this.currentThreadId = state.currentThreadId || this.currentThreadId;
    });
  }

  ngOnInit(){
    const scrollPane: any = this.el.nativeElement.querySelector(".card-body");
    this.messages.subscribe((msg => this.scrollToBottom(scrollPane)));
  }

  scrollToBottom(scrollPane): void {
    if (scrollPane) {
      setTimeout(() => (scrollPane.scrollTop = scrollPane.scrollHeight), 1000);
    }
  }

  onMessageSent(message){

      this.db.collection(localStorage.getItem('user')).doc(this.currentThreadId).update({content: message});
      this.db.collection(localStorage.getItem('user') + '/' + this.currentThreadId + '/messages').add({ content: message, sendByMe: true, time: new Date().getTime() });


      this.db.collection(this.currentThreadId).doc(localStorage.getItem('user')).update({content: message});
      this.db.collection(this.currentThreadId + '/' + localStorage.getItem('user') + '/messages').add({ content: message, sendByMe: false, time: new Date().getTime() });
  }

  onStickerSent(sticker){

    this.storage.ref(sticker).getDownloadURL().subscribe( url => {

      console.log(url);

      this.db.collection(localStorage.getItem('user')).doc(this.currentThreadId).update({content: 'You sent a sticker'});
      this.db.collection(localStorage.getItem('user') + '/' + this.currentThreadId + '/messages').add({isSticker: true, content: url, sendByMe: true, time: new Date().getTime() });


      this.db.collection(this.currentThreadId).doc(localStorage.getItem('user')).update({content: 'You received a sticker'});
      this.db.collection(this.currentThreadId + '/' + localStorage.getItem('user') + '/messages').add({isSticker: true, content: url, sendByMe: false, time: new Date().getTime() });
    });
  }
}
