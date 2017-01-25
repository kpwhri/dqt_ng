import {Component, OnInit, Input} from '@angular/core';
import {EventItem} from "../categories";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {

  private items: any[];

  constructor() { }

  ngOnInit() {
    this.items = [{label: 'test'}];
  }

  addItem(item: EventItem) {
    var val;
    if (item.value) {
      val = item.value;
    } else {
      val = `${item.values[0]}-${item.values[1]}`;
    }
    this.items.push({
      label: item.item,
      items: [
        {label: item.category},
        {label: val}
      ]
    });
  }

  removeItem(item: EventItem) {

  }

}
