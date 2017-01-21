import {Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList, ViewChild} from '@angular/core';
import {Category, Item} from "../categories";
import {ItemComponent} from "../item/item.component";
import {Fieldset} from "primeng/components/fieldset/fieldset";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @ViewChildren('itemComponent') itemComponents: QueryList<ItemComponent>;
  @ViewChild('fieldset') fieldset: Fieldset;
  @Input('category') category: Category;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  private id: number;
  private name: string;
  private description: string;
  private items: Item[] = [];

  constructor() {
  }

  ngOnInit() {
    this.id = this.category.id;
    this.name = this.category.name;
    this.description = this.category.description;
    for (var i in this.category.items) {
      this.items.push(this.category.items[i]);
    }
  }

  itemUpdated(e) {
    this.onChange.emit({eventItem: e.eventItem});
  }

  expandItem(itemId: number) {
    this.fieldset.toggle(null);
    this.itemComponents.forEach(item => {
      if (item.item.id == itemId) {
        item.expand();
      }
    });
  }

  expandItems() {
    this.fieldset.toggle(null);
    this.itemComponents.forEach(item => {
      item.expand();
    });
  }
}
