import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  EventEmitter,
  Output
} from "@angular/core";
import { Message } from "../message/message.model";
import { List } from "immutable";
import { Observable } from "rxjs";

@Component({
  selector: "app-chat-message",
  templateUrl: "./chat-message.component.html",
  styleUrls: ["./chat-message.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessageComponent implements OnInit {
  @Input() messages: Observable<List<Message>>;

  readonly BIG_STICKER_SIZE = 144;
  readonly BIG_STICKER_OFSET = 12;

  constructor(){}

  ngOnInit(): void {
    const size = this.BIG_STICKER_SIZE;
    const offset = this.BIG_STICKER_OFSET;

    let i=0, j=0;

    setInterval(()=>{
      $('.sticker').css('background-position',`${-offset-j*size}px ${-offset-i*size}px`);
      j++;
      if(j==4){
        i++;
        j=0;
      }

      if(i==3){
        i=0;
      }

    }, 80);
  }

  getTime(time) {
    return new Date(time).toString();
  }

  trackMessage(index, message) {
    return message.time;
  }
}
