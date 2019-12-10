import {
  Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewChildren, QueryList,
  ChangeDetectionStrategy, ChangeDetectorRef, ApplicationRef, NgZone
} from '@angular/core';
import {Item, EventItem} from '../categories';
import {ValueComponent} from '../value/value.component';
import {CheckboxValueComponent} from '../checkbox-value/checkbox-value.component';
import {AccordionTab} from 'primeng';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent implements OnInit {
  @ViewChild('fieldset', {static: false}) fieldset: AccordionTab;
  @ViewChildren('valueItem') valueList: QueryList<ValueComponent>;
  @ViewChild('valueCheckbox', {static: false}) valueCheckbox: CheckboxValueComponent;
  @Input('item') item: Item;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  position = 'before';

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private applicationRef: ApplicationRef,
              private zone: NgZone
  ) {
  }

  ngOnInit() {
  }

  itemChanged(e) {
    e.eventItem.itemId = this.item.id;
    e.eventItem.item = this.item.name;
    this.onChange.emit({eventItem: e.eventItem});
  }

  expand() {
    let event = new FakeEvent();
    if (! this.fieldset.selected) {
      this.fieldset.toggle(event);
    }
    // this.fieldset.selected = true;
    this.changeDetectorRef.detectChanges();
    this.applicationRef.tick();
    this.zone.run(() => {this.fieldset.selected = true; });
  }

  collapse() {
    let event = new FakeEvent();
    if (this.fieldset.selected) {
      this.fieldset.toggle(event);
    }
    this.fieldset.selected = false;
    this.changeDetectorRef.detectChanges();
    this.applicationRef.tick();
    this.zone.run(() => {this.fieldset.selected = false; });
  }

  unselectValue(event: EventItem) {
    if (this.valueList.length > 0) {
      this.valueList.forEach(v => {
        if (v.value.id === +event.id) {
          v.uncheckValue();
        }
      });
    } else if (this.valueCheckbox) {
      this.zone.run(() => {this.valueCheckbox.checked = false; });
    }
    this.collapse();
  }
}

export class FakeEvent {
 preventDefault() {

 }
 stopPropogation() {

 }
}
