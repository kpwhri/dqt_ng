import {Component, OnInit, Input} from '@angular/core';
import {Item} from "../categories";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input('item') item: Item;

  constructor() {
  }

  ngOnInit() {
  }

  itemChanged(e) {
    if (e.eventItem.id === null) {
      e.eventItem.id = this.item.id;
    }
    console.warn(e.eventItem.id);
    console.warn(e.eventItem.selected);
    console.warn(e.eventItem.values);
  }

}
