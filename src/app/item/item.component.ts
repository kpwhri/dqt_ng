import { Component, OnInit } from '@angular/core';
import {Item} from "../categories";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {


  constructor(item: Item) {
  }

  ngOnInit() {
  }

}
