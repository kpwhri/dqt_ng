import {Component, OnInit, Input, EventEmitter} from '@angular/core';
import {EventItem, Value} from "../categories";
import {MenuItem} from "primeng/components/common/api";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {

  private items: PrimaryMenuItem[];

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
      if (mi.label == item.item) {
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

  addValue(val) {
    this.items.push(new ValueMenuItem(val));
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


