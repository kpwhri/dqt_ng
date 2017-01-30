import {Component, OnInit, Input, EventEmitter} from '@angular/core';
import {EventItem, Value} from "../categories";
import {MenuItem} from "primeng/components/common/api";
import {MenuListener} from "../menuListener";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {

  private items: MenuItem[];

  constructor(private menuListener: MenuListener) {
  }

  ngOnInit() {
    this.items = [];
    this.items.push(new OptionsMenuItem());
  }

  private getValue(item: EventItem) {
    console.warn(item);
    console.warn(item.value);
    if (item.value) {
      return item.value;
    } else {
      return `${item.values[0]}-${item.values[1]}`;
    }
  }

  addItem(item: EventItem) {
    var val = this.getValue(item);
    var itemToAdd = new PrimaryMenuItem(this.menuListener, item.item,
      item.category, val, item);

    var added: boolean = false;
    this.items.forEach(mi => {
      if (mi instanceof PrimaryMenuItem && mi.label == item.item) {
        // add value to item list
        mi.addValue(new ValueMenuItem(this.menuListener, val, item));
        added = true;
      }
    });

    if (!added) {
      this.items.push(itemToAdd);
    }
  }

  removeItem(item: EventItem) {
    var val = this.getValue(item);
    var idx = -1;
    this.items.some((mi, i) => {
      if (mi instanceof PrimaryMenuItem && mi.label == item.item) {
        mi.removeValue(val);
        if (mi.isEmpty()) {
          idx = i;
        }
        return true;
      }
    });
    if (idx > -1) {
      this.items.splice(idx, 1);
    }
  }

}


class OptionsMenuItem implements MenuItem {
  label?: string;
  icon?: string;
  command?: (event?: any) => void;
  url?: string;
  routerLink?: any;
  eventEmitter?: EventEmitter<any>;
  items?: MenuItem[];
  expanded?: boolean;
  disabled?: boolean;

  constructor() {
    this.label = 'Options';
    this.items = [
      {label: 'Clear All Filters'},
      {label: 'Export Filters'},
    ]
  }
}

class PrimaryMenuItem implements MenuItem {
  label?: string;
  icon?: string;
  command?: (event?: any) => void;
  url?: string;
  routerLink?: any;
  eventEmitter?: EventEmitter<any>;
  items?: MenuItem[];
  expanded?: boolean;
  disabled?: boolean;
  onlyOneValue: boolean;

  constructor(private menuListener: MenuListener, label: string,
              category: string = null, value: string = null, event: EventItem) {
    this.label = label;
    if (event.value) {
      this.onlyOneValue = false;
    } else {
      this.onlyOneValue = true;
    }
    if (value && category) {
      this.items = [
        new CategoryMenuItem(menuListener, category, event.categoryId),
        new ValueMenuItem(menuListener, value, event)
      ];
    }
    this.command = (e) => {
      menuListener.triggerSelectItem(event.itemId, event.categoryId);
    }
  }

  addValue(val: ValueMenuItem) {
    if (this.onlyOneValue) {
      this.items[1] = val;
    } else {
      this.items.push(val);
    }
  }

  removeValue(val) {
    var index = this.getIndex(val);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  getIndex(value: string): number {
    var idx = -1;
    this.items.some((item, i) => {
      if (item.label == value) {
        idx = i;
        return true;
      }
    });
    return idx;
  }

  isEmpty() {
    return this.items.length == 1;  // the category will not be removed
  }
}

class ValueMenuItem implements MenuItem {
  label?: string;
  icon?: string;
  command?: (event?: any) => void;
  url?: string;
  routerLink?: any;
  eventEmitter?: EventEmitter<any>;
  items?: MenuItem[];
  expanded?: boolean;
  disabled?: boolean;

  constructor(private menuListener: MenuListener, label: string, event: EventItem) {
    this.label = label;
    this.items = [new RemoveMenuItem(menuListener, event)];
    this.command = (e) => {
      menuListener.triggerSelectItem(event.itemId, event.categoryId);
    }
  }
}

class RemoveMenuItem implements MenuItem {
  label?: string;
  icon?: string;
  command?: (event?: any) => void;
  url?: string;
  routerLink?: any;
  eventEmitter?: EventEmitter<any>;
  items?: MenuItem[];
  expanded?: boolean;
  disabled?: boolean;
  private parent: ValueMenuItem;

  constructor(private menuListener: MenuListener, event: EventItem) {
    this.label = 'Remove';
    this.command = (e) => {
      menuListener.triggerRemove(event);
    }
  }
}

class CategoryMenuItem implements MenuItem {
  label?: string;
  icon?: string;
  command?: (event?: any) => void;
  url?: string;
  routerLink?: any;
  eventEmitter?: EventEmitter<any>;
  items?: MenuItem[];
  expanded?: boolean;
  disabled?: boolean;

  constructor(private menuListener: MenuListener, category: string, categoryId: string) {
    this.label = category;
    this.command = (e) => {
      menuListener.triggerSelectCategory(categoryId);
    }
  }
}

