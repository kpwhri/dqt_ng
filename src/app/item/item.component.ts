import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {Item} from "../categories";
import {Fieldset} from "primeng/components/fieldset/fieldset";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @ViewChild('fieldset') fieldset: Fieldset;
  @Input('item') item: Item;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  itemChanged(e) {
    e.eventItem.itemId = this.item.id;
    e.eventItem.item = this.item.name;
    this.onChange.emit({eventItem: e.eventItem});
  }

  expand() {
    this.fieldset.toggle(null);
  }
}
