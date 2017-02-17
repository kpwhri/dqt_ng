import {
  Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList, ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import {Category, Item, EventItem} from '../categories';
import {ItemComponent} from '../item/item.component';
import {AccordionTab} from 'primeng/components/accordion/accordion';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit {
  @ViewChildren('itemComponent') itemComponents: QueryList<ItemComponent>;
  @ViewChild('fieldset') fieldset: AccordionTab;
  @Input('category') category: Category;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  private id: number;
  name: string;
  description: string;
  items: Item[] = [];

  constructor() {
  }

  ngOnInit() {
    this.id = this.category.id;
    this.name = this.category.name;
    this.description = this.category.description;
    let items = [];
    this.category.items.forEach(function (element) {
      items.push(element);
    });
    this.items = items;
  }

  itemUpdated(e) {
    e.eventItem.category = this.name;
    e.eventItem.categoryId = this.id;
    this.onChange.emit({eventItem: e.eventItem});
  }

  expandItem(itemId: number) {
    this.fieldset.selected = true;
    this.itemComponents.forEach(item => {
      if (item.item.id === itemId) {
        item.expand();
      } else {
        item.collapse();
      }
    });
  }

  collapseAll() {
    this.fieldset.selected = false;
    this.itemComponents.forEach(item => {
      item.collapse();
    });
  }

  expandItems() {
    this.fieldset.selected = true;
    this.itemComponents.forEach(item => {
      item.expand();
    });
  }

  unselectItem(event: EventItem) {
    this.itemComponents.forEach(i => {
      if (`${i.item.id}` === event.itemId) {
        i.unselectValue(event);
      }
    });
  }
}
