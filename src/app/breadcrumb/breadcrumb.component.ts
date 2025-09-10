import {Component, OnInit, EventEmitter, Injectable} from '@angular/core';
import {EventItem} from '../categories';
import {MenuListener} from '../menuListener';
import {AlertService} from '../alert.service';
import {MenuItem} from 'primeng/api';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.css'],
    standalone: false
})
export class BreadcrumbComponent implements OnInit {

  items: MenuItem[];

  constructor(
    private menuListener: MenuListener,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.items = [];
    this.items.push(
      new OptionsMenuItem(
        () => this.removeAllItems(),
        this.menuListener,
        this.alertService
      )
    );
  }

  private getValue(item: EventItem) {
    if (item.value) {
      return item.value;
    } else {
      return `${item.values[0]}-${item.values[1]}`;
    }
  }

  addItem(item: EventItem) {
    const val = this.getValue(item);
    const itemToAdd = new PrimaryMenuItem(this.menuListener, item.item,
      item.category, val, item);

    let added = false;
    this.items.forEach(mi => {
      if (mi instanceof PrimaryMenuItem && mi.label === item.item) {
        // add value to item list
        mi.addValue(new ValueMenuItem(this.menuListener, val, item));
        added = true;
      }
    });

    if (!added) {
      this.items.push(itemToAdd);
      this.items = [...this.items];  // required to refresh menubar
    }
  }

  removeAllItems() {
    for (let i = this.items.length - 1; i >= 0; i--) {
      const mi = this.items[i];
      if (mi instanceof PrimaryMenuItem) {
        mi.removeAllValues();
      }
    }
    this.menuListener.triggerRefresh('all');
  }

  removeItem(item: EventItem) {
    const val = this.getValue(item);
    let idx = -1;
    this.items.some((mi, i) => {
      if (mi instanceof PrimaryMenuItem && mi.label === item.item) {
        mi.removeValue(val);
        this.items = [...this.items];
        if (mi.isEmpty()) {
          idx = i;
        }
        return true;
      }
    });
    if (idx > -1) {
      this.items.splice(idx, 1);
      this.items = [...this.items];
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

  constructor(
    clearAllFiltersFunction,
    listener: MenuListener,
    alerts: AlertService
  ) {
    this.label = 'Options';
    this.items = [
      new ClearAllFiltersMenuItem(clearAllFiltersFunction),
      new ExportFiltersMenuItem(listener),
      new MessagesMenuItem(alerts),
      new CollapseAllMenuItem(listener),
      new NavigationModeMenuItem(listener),
    ];
  }
}

class ClearAllFiltersMenuItem implements MenuItem {
  label?: string;
  icon?: string;
  command?: (event?: any) => void;
  url?: string;
  routerLink?: any;
  eventEmitter?: EventEmitter<any>;
  items?: MenuItem[];
  expanded?: boolean;
  disabled?: boolean;

  constructor(command) {
    this.label = 'Clear All Filters';
    this.command = command;
  }
}
class ExportFiltersMenuItem implements MenuItem {
  label?: string;
  icon?: string;
  command?: (event?: any) => void;
  url?: string;
  routerLink?: any;
  eventEmitter?: EventEmitter<any>;
  items?: MenuItem[];
  expanded?: boolean;
  disabled?: boolean;

  constructor(listener: MenuListener) {
    this.label = 'Export Filters';
    this.command = (e) => {
      listener.triggerExportFilters(null);
    };
  }
}

@Injectable()
class MessagesMenuItem implements MenuItem {
  label?: string;
  icon?: string;
  command?: (event?: any) => void;
  url?: string;
  routerLink?: any;
  eventEmitter?: EventEmitter<any>;
  items?: MenuItem[];
  expanded?: boolean;
  disabled?: boolean;

  constructor(alerts: AlertService) {
    this.label = 'View Messages';
    this.command = (e) => {
      alerts.showMessageHistoryDialog();
    };
  }
}

@Injectable()
class CollapseAllMenuItem implements MenuItem {
  label?: string;
  icon?: string;
  command?: (event?: any) => void;
  url?: string;
  routerLink?: any;
  eventEmitter?: EventEmitter<any>;
  items?: MenuItem[];
  expanded?: boolean;
  disabled?: boolean;

  constructor(private listener: MenuListener) {
    this.label = 'Collapse All';
    this.command = (e) => {
      this.listener.triggerCollapseAll(null);
    };
  }
}

@Injectable()
class NavigationModeMenuItem implements MenuItem {
  label?: string;
  icon?: string;
  command?: (event?: any) => void;
  url?: string;
  routerLink?: any;
  eventEmitter?: EventEmitter<any>;
  items?: MenuItem[];
  expanded?: boolean;
  disabled?: boolean;

  constructor(private listener: MenuListener) {
    this.label = 'Pop-up Navigation';
    this.command = (e) => {
      if (this.label === 'Pop-up Navigation') {
        this.label = 'Side Navigation';
      } else {
        this.label = 'Pop-up Navigation';
      }
      this.listener.triggerNavigationMode(null);
    };
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
    };
  }

  addValue(val: ValueMenuItem) {
    if (this.onlyOneValue) {
      this.items[1] = val;
    } else {
      this.items.push(val);
    }
  }

  removeAllValues() {
    for (let i = this.items.length - 1; i >= 0; i--) {
      const mi = this.items[i];
      if (mi instanceof ValueMenuItem) {
        mi.remove();  // send remove item command to each value
      }
    }
  }


  removeValue(val) {
    const index = this.getIndex(val);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  getIndex(value: string): number {
    let idx = -1;
    this.items.some((item, i) => {
      if (item.label === value) {
        idx = i;
        return true;
      }
    });
    return idx;
  }

  isEmpty() {
    return this.items.length === 1;  // the category will not be removed
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
    };
  }

  remove() {
    this.items.forEach((mi, i) => {
      if (mi instanceof RemoveMenuItem) {
        mi.command(null);  // send remove item command
      }
    });
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
    };
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
    };
  }
}


