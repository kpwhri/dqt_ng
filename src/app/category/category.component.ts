import {
  Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList, ViewChild,
  ChangeDetectionStrategy, NgZone, ApplicationRef, ChangeDetectorRef
} from '@angular/core';
import {Category, Item, EventItem} from '../categories';
import {ItemComponent} from '../item/item.component';
import {Accordion} from 'primeng/accordion';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class CategoryComponent implements OnInit {
  @ViewChildren('itemComponent') itemComponents: QueryList<ItemComponent>;
  @Input('category') category: Category;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  private id: number;
  name: string;
  description: string;
  items: Item[] = [];
  position = 'before';
  activeIndex: number | null = null;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private applicationRef: ApplicationRef,
              private zone: NgZone) {
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
    this.activeIndex = 0;
    this.itemComponents.forEach(item => {
      if (item.item.id === itemId) {
        item.expand();
      } else {
        item.collapse();
      }
    });
    this.refresh(true);
  }

  collapseAll() {
    this.activeIndex = null;
    this.itemComponents.forEach(item => {
      item.collapse();
    });
    this.refresh(false);
  }

  expandItems() {
    this.activeIndex = 0;
    this.itemComponents.forEach(item => {
      item.expand();
    });
    this.refresh(true);
  }

  unselectItem(event: EventItem) {
    this.itemComponents.forEach(i => {
      if (i.item.id === +event.itemId) {
        i.unselectValue(event);
      }
    });
  }

  refresh(status: boolean) {
    this.changeDetectorRef.detectChanges();
    this.applicationRef.tick();
    this.zone.run(() => {
      this.activeIndex = status ? 0 : null;
    });
  }
}
