import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs/Observable";

@Injectable()
export class FirebaseService{

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(private db: AngularFireDatabase){
    this.itemsRef = db.list('thanh/thuong/messages');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    this.items.subscribe(data => console.log(data));
  }

  getItems(itemName: string){
    const list : Observable<any[]> = this.db.list(itemName).valueChanges();
    list.subscribe(data => console.log(data));
  }

  addItem(value){
    const date = new Date();
    this.itemsRef.push({ content: value, sendByMe: true, time: date.getTime() });
  }
}
