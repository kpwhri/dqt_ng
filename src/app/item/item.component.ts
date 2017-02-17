import {
  Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewChildren, QueryList,
  ChangeDetectionStrategy
} from '@angular/core';
import {Item, EventItem} from "../categories";
import {Fieldset} from "primeng/components/fieldset/fieldset";
import {ValueComponent} from "../value/value.component";
import {CheckboxValueComponent} from "../checkbox-value/checkbox-value.component";
import {AccordionTab} from "primeng/components/accordion/accordion";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent implements OnInit {
  @ViewChild('fieldset') fieldset: AccordionTab;
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
    this.fieldset.selected = true;
  }

  collapse() {
    this.fieldset.selected = false;
  }

  unselectValue(event: EventItem) {
    if (this.valueList.length > 0) {
      this.valueList.forEach(v => {
        if (`${v.value.id}` == event.id) {
          v.uncheckValue();
        }
      });
    } else if (this.valueCheckbox) {
      this.valueCheckbox.checked = false;
    }
  }

}
