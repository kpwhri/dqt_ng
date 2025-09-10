import {
  Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewChildren, QueryList,
  ChangeDetectionStrategy, ChangeDetectorRef, ApplicationRef, NgZone
} from '@angular/core';
import {Item, EventItem} from '../categories';
import {ValueComponent} from '../value/value.component';
import {CheckboxValueComponent} from '../checkbox-value/checkbox-value.component';
import {Accordion} from 'primeng/accordion';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ItemComponent implements OnInit {
  @ViewChildren('valueItem') valueList: QueryList<ValueComponent>;
  @ViewChild('valueCheckbox', {static: false}) valueCheckbox: CheckboxValueComponent;
  @Input('item') item: Item;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  position = 'before';
  isExpanded = false;  // track accordion open/close state

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
    this.zone.run(() => {
      console.log(`${this.isExpanded}`);
      this.isExpanded = true;
      setTimeout(() => {
        this.changeDetectorRef.detectChanges();
        this.changeDetectorRef.markForCheck();
      });
      this.applicationRef.tick();
    });
  }

  collapse() {
    this.zone.run(() => {
      this.isExpanded = false;
      this.changeDetectorRef.markForCheck();
    });
  }

  unselectValue(event: EventItem) {
    if (this.valueList.length > 0) {
      this.valueList.forEach(v => {
        if (v.value.id === +event.id) {
          v.uncheckValue();
        }
      });
    } else if (this.valueCheckbox) {
      this.zone.run(() => {
        this.valueCheckbox.checked = false;
      });
    }
    this.collapse();
  }

  onAccordionValueChange(val: number | number[]) {
    // keep local state in sync when user toggles
    if (Array.isArray(val)) {
      this.isExpanded = val.includes(0);
    } else {
      this.isExpanded = val === 0;
    }
    this.changeDetectorRef.markForCheck();
  }

}
