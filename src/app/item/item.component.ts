import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Item} from "../categories";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input('item') item: Item;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  itemChanged(e) {
    e.eventItem.itemId = this.item.id;
    this.onChange.emit({eventItem: e.eventItem});
  }

}
