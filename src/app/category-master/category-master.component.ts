import {Component, OnInit, Output, EventEmitter, ViewChildren, QueryList} from '@angular/core';
import {Category, EventItem} from '../categories';
import {CategoryService} from '../app.service';
import {CategoryComponent} from '../category/category.component';

@Component({
  selector: 'app-category-master',
  templateUrl: './category-master.component.html',
  styleUrls: ['./category-master.component.css']
})
export class CategoryMasterComponent implements OnInit {

  @ViewChildren('categoryComponent') categoryComponents: QueryList<CategoryComponent>;
  categories: Category[];
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  constructor(private categoryService: CategoryService) {
    this.categoryService.getAllCategories().subscribe(e => this.categories = e);
  }

  ngOnInit() {
  }

  categoryUpdated(e) {
    this.onChange.emit({eventItem: e.eventItem});
  }

  bringCategoryToTop(itemId: number, categoryId: number) {
    let idx: number;
    let category: Category;
    this.categories.forEach((cat, index) => {
      if (cat.id === categoryId) {
        idx = index;
        category = cat;
        return;
      }
    });

    // can't check for idx as it might be 0
    if (idx !== undefined && category) {
      this.categories.splice(idx, 1);
      this.categories.splice(0, 0, category);
      this.categoryComponents.forEach(cat => {
          if (cat.category.id === category.id) {
            if (itemId) {
              cat.expandItem(itemId);
            } else {
              cat.expandItems();
            }
          } else {
            cat.collapseAll();
          }
        }
      );
    }
  }

  uncheck(event: EventItem) {
    this.categoryComponents.forEach(c => {
      if (c.category.id === +event.categoryId) {
        c.unselectItem(event);
      }
    });
  }
}
