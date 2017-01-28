import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewChildren, QueryList} from '@angular/core';
import {Item, EventItem} from "../categories";
import {Fieldset} from "primeng/components/fieldset/fieldset";
import {ValueComponent} from "../value/value.component";
import {CheckboxValueComponent} from "../checkbox-value/checkbox-value.component";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @ViewChild('fieldset') fieldset: Fieldset;
  @ViewChildren('valueItem') valueList: QueryList<ValueComponent>;
  @ViewChild('valueCheckbox') valueCheckbox: CheckboxValueComponent;
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
    this.fieldset.expand(null);
  }

  collapse() {
    this.fieldset.collapse(null);
  }

  unselectValue(event: EventItem) {
    if (this.valueList.length > 0) {
      this.valueList.forEach(v => {
        if (`${v.value.id}` == event.id) {
          v.uncheckValue();
        }
      });
    } else if (this.valueCheckbox) {
      console.warn('preparing to remove');
      console.warn(this.valueCheckbox.checked);
      this.valueCheckbox.checked = false;
    }
  }

}
