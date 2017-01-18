import {Component, OnInit, Input} from '@angular/core';
import {Category, Item} from "../categories";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input('category') category: Category;
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

}
