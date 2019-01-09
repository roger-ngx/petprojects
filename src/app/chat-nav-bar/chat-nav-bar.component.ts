import { Component, OnInit, Inject } from "@angular/core";
import { AppState } from "../app.reducer";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-chat-nav-bar",
  templateUrl: "./chat-nav-bar.component.html",
  styleUrls: ["./chat-nav-bar.component.css"]
})
export class ChatNavBarComponent {
  unreadMessagesCount: Observable<number>;

  constructor(private store: Store<AppState>) {
    store.subscribe(() => this.updateState());
    this.updateState();
  }

  updateState() {
  }

  rightClickEvent(event) {
    event.preventDefault();
  }
}
