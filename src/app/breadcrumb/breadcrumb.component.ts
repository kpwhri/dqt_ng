import {Component, OnInit, Input, EventEmitter} from '@angular/core';
import {EventItem, Value} from "../categories";
import {MenuItem} from "primeng/components/common/api";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {

  private items: MenuItem[];

  constructor() {
  }

  ngOnInit() {
    this.items = [];
    this.items.push(new OptionsMenuItem());
  }

  private getValue(item: EventItem) {
    if (item.value) {
      return item.value;
    } else {
      return `${item.values[0]}-${item.values[1]}`;
    }
  }

  addItem(item: EventItem) {
    var val = this.getValue(item);
    var itemToAdd = new PrimaryMenuItem(item.item, item.category, val);

    var added: boolean = false;
    this.items.forEach(mi => {
      if (mi instanceof PrimaryMenuItem && mi.label == item.item) {
        // add value to item list
        mi.addValue(val);
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

  constructor(label: string, category: string = null, value: string = null) {
    this.label = label;
    if (value && category) {
      this.items = [
        new CategoryMenuItem(category),
        new ValueMenuItem(value)
      ];
    }
  }

  addValue(val) {
    this.items.push(new ValueMenuItem(val));
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

  constructor(label: string) {
    this.label = label;
    this.items = [new RemoveMenuItem()];
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

  constructor() {
    this.label = 'Remove';
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

  constructor(category: string) {
    this.label = category;
  }
}


