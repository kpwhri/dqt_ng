import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Category} from "../categories";
import {CategoryService} from "../app.service";

@Component({
  selector: 'app-category-master',
  templateUrl: './category-master.component.html',
  styleUrls: ['./category-master.component.css']
})
export class CategoryMasterComponent implements OnInit {

  private categories: Category[];
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  constructor(private categoryService: CategoryService) {
    this.categoryService.getAllCategories().subscribe(e => this.categories = e);
  }

  ngOnInit() {
  }

  categoryUpdated(e) {
    this.onChange.emit({eventItem: e.eventItem});
  }
}
