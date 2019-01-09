import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  AfterViewInit,
  Renderer2
} from "@angular/core";
import * as $ from "jquery";

import { CheckEmoticon } from "./check.emoticon";
import { Observable, concat, of } from "rxjs";
import { AngularFireStorage } from "angularfire2/storage";

@Component({
  selector: "app-chat-input",
  templateUrl: "./chat-input.component.html",
  styleUrls: ["./chat-input.component.scss"]
})
export class ChatInputComponent implements OnInit{
  message: string;
  @Output() onMessageSent = new EventEmitter();
  @Output() onStickerSent = new EventEmitter();

  isShowingEmoticones = false;
  isShowingStickers = false;

  currentPosition = 0;

  editting = 0;

  readonly BIG_STICKER_SIZE = 144;
  readonly BIG_STICKER_OFSET = 12;

  readonly SMALL_STICKER_SIZE = 76;
  readonly SMALL_STICKER_OFSET = 6;

  stickies : Observable<any[]>;

  constructor(private renderer: Renderer2, private storage: AngularFireStorage) {
    let stickies = this.storage.ref(`STICKERS/1/1_n.png`).getDownloadURL().map(url => ({name: `STICKERS/1/1.png`, url: url}));

    for(let i = 2; i <= 2; i++){
      let a = this.storage.ref(`STICKERS/1/${i}_n.png`).getDownloadURL().map(url => ({name: `STICKERS/1/${i++}.png`, url: url}));

      //a.subscribe(url => console.log(url));

      stickies = concat(stickies, a);
    }

    let urls = [];
    //this.stickies.map(url => ({name: `STICKERS/1/${i++}.png`, url: url}))
    stickies.subscribe(
      url => urls.push(url),
      error => console.log(error),
      () => this.stickies = of(urls)
    );
  }

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

    const _size = this.SMALL_STICKER_SIZE;
    const _offset = this.SMALL_STICKER_OFSET;

    let _i=0, _j=0;
    setInterval(()=>{
      $('._sticker').css('background-position',`${-_offset-_j*_size}px ${-_offset-_i*_size}px`);
      _j++;
      if(_j==4){
        _i++;
        _j=0;
      }

      if(_i==3){
        _i=0;
      }

    }, 80);

    this.createEmoticonTable(97, 7);
  }

  onEnter(event) {
    const message = $('.message_area')[0].innerHTML;
    // console.log( $('.message_area')[0].innerHTML);
    if (message.trim() === "") return;

    this.onMessageSent.emit(message);

    $('.message_area')[0].innerHTML = "";

    $(".message_area").val("").blur().focus();
  }

  sendThisSticker(item){
    this.onStickerSent.emit(item);
  }

  showEmoticons() {
    this.isShowingStickers = false;
    this.isShowingEmoticones = !this.isShowingEmoticones;
    const left = $('#btn_emoticon').css('left');
    $('.sticker_list').css('left', left);
  }

  showStickers() {
    this.isShowingStickers = !this.isShowingStickers;
    this.isShowingEmoticones = false;

    const p = $('#btn_sticker').position();
    $('.sticker_list').css('left', p.left + 'px');
  }

  async createEmoticonTable(numberOfIcon, iconPerRow){
    const numberOfRows = Math.floor(numberOfIcon/iconPerRow) + 1;

    let tableBody = document.querySelector('#s_t_body');

    let count = 1;

    for(let r = 1; r <= numberOfRows; r++){
      const tr = this.renderer.createElement('tr');
      for(let i = 1; i <= iconPerRow; i++){
        if(count > numberOfIcon) break;

        const td = this.renderer.createElement('td');
        const img = this.renderer.createElement('img');
        this.renderer.setAttribute(img, 'src', `./assets/smileys/${count}.gif`);

        this.renderer.appendChild(td, img);

        this.renderer.appendChild(tr, td);
        count++;
      }

      this.renderer.appendChild(tableBody, tr);
    }
  }

  getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
      sel = win.getSelection();
      if (sel.rangeCount > 0) {
        var range = win.getSelection().getRangeAt(0);
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
      }
    } else if ((sel = doc.selection) && sel.type != "Control") {
      var textRange = sel.createRange();
      var preCaretTextRange = doc.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint("EndToEnd", textRange);
      caretOffset = preCaretTextRange.text.length;
    }

    return caretOffset;
  }

  setCaretPosition(elem, caretPos) {

    const range = document.createRange();
    const sel = window.getSelection();
    const len = elem.childNodes.length;

    for(let i = 0; i < len; i++){

      const _len = elem.childNodes[i].length;
      if(_len > 0){
        if(caretPos <= _len){
          range.setStart(elem.childNodes[i], caretPos);
          break;
        }else{
          caretPos -= _len;
        }
      }

    }
    //range.setStart(elem.childNodes[len-1], 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  processInput(event) {
    this.currentPosition = this.getCaretCharacterOffsetWithin(
      $(".message_area")[0]
    );

    this.message =  $('.message_area')[0].innerText;
    //console.log(this.message);

    const span = this.message.substring(0, this.currentPosition).split(" ");

    let symbolText = span[span.length - 2];

    const symbolCode = CheckEmoticon.checkEmoticon(symbolText);

    //console.log($('.message_area')[0].innerHTML);

    if (symbolCode > 0) {
      this.currentPosition -= symbolText.length;

      const emoticon = `<span><img src='./assets/smileys/${symbolCode}.gif'></span>`;
      symbolText = symbolText.replace('&', '&amp;').replace('>', '&gt;').replace('<', '&lt;');
      $('.message_area')[0].innerHTML = $('.message_area')[0].innerHTML.replace(symbolText, emoticon);

      //console.log(this.currentPosition);
      this.setCaretPosition($('.message_area')[0], this.currentPosition);

      this.message = "";
    }
  }

  /*

  processInput(event) {
    this.currentPosition = this.getCaretCharacterOffsetWithin(
      $(".message_area")[0]
    );

    console.log(this.currentPosition);

    if (event.data == null) {
      if (event.target.childElementCount > 0) {
        this.editting = +event.target.lastChild.className.split("-")[1];
      }
    } else {
      //console.log($(`.chat > .editing-${this.editting}`));

      $(`.chat > .editing-${this.editting}`).text(
        $(`.chat > .editing-${this.editting}`).text() + event.data
      );
    }

    this.message = $(`.chat > .editing-${this.editting}`).text();

    const span = this.message.split(" ");

    const symbolCode = CheckEmoticon.checkEmoticon(span[span.length - 2]);

    console.log($('.message_area')[0].innerHTML);

    if (symbolCode > 0) {
      const emoticon = `<span><img src='./assets/smileys/${symbolCode}.gif'></span>`;
      $(".chat").append(emoticon);

      $('.message_area')[0].innerHTML = $('.message_area')[0].innerHTML.replace(span[span.length - 2], emoticon);

      this.message = $(`.chat > .editing-${this.editting}`).text()
        .replace(span[span.length - 2] + " ", "");

      $(`.chat > .editing-${this.editting}`).text(this.message);
      this.editting++;

      const editing = `<span class='editing-${this.editting}'></span>`;
      $(".chat").append(editing);

      this.message = "";
    }

    // $(".message_area").empty();
    // $(".message_area").append(
    //   $(".chat")
    //     .clone()
    //     .removeAttr("hidden")
    //     .removeClass("chat")
    // );

    // const el = $(".message_area")[0];
    // this.setCaretPosition(el, this.currentPosition);
  }

  */

  /*
processInput(event) {
    console.log(event);
    console.log(event.target.textContent);

    const inputStr = event.target.textContent;

    this.message = inputStr.substring(this.currentPosition);

    $(".editing").text(this.message);

    const span = this.message.split(" ");

    const symbolCode = CheckEmoticon.checkEmoticon(span[span.length - 2]);

    if (symbolCode > 0) {
      const emoticon =
        "<span><img src='./assets/smileys/" + symbolCode + ".gif'></span>";
      $(".chat").append(emoticon);

      this.message = this.message.replace(span[span.length - 2], "");
      $(".editing").text(this.message);
      $(".editing").removeClass("editing");

      const editing = "<span class='editing'></span>";
      $(".chat").append(editing);

      this.currentPosition = inputStr.length;

      this.message = "";

      //$('.message_area')[0].innerHTML = $('.chat')[0].innerHTML;

      //console.log($('.message_area')[0].innerHTML);
      //console.log($('.chat')[0].innerHTML);
    }

    //$('.message_area')[0].innerHTML = $('.chat')[0].innerHTML;
  }

  */
}
