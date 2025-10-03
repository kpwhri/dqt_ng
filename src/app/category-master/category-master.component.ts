import {
  Component, OnInit, Output, EventEmitter, ViewChildren, QueryList, NgZone, ApplicationRef, ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import {Category, EventItem} from '../categories';
import {CategoryService} from '../app.service';
import {CategoryComponent} from '../category/category.component';

@Component({
  selector: 'app-category-master',
  templateUrl: './category-master.component.html',
  styleUrls: ['./category-master.component.css'],
  standalone: false
})
export class CategoryMasterComponent implements OnInit {

  @ViewChildren('categoryComponent') categoryComponents: QueryList<CategoryComponent>;
  categories: Category[];
  activeCategory: number[] = [];
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  isExpanded = false;  // track accordion open/close state

  constructor(private categoryService: CategoryService,
              private changeDetectorRef: ChangeDetectorRef,
              private applicationRef: ApplicationRef,
              private zone: NgZone
  ) {
    this.categoryService.getAllCategories()
      .subscribe(data => this.categories = data['categories']);
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

      this.zone.run(() => {
        this.activeCategory = [category.id];
      });

      setTimeout(() => {
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
        });
        this.changeDetectorRef.detectChanges();
      }, 0);
    }
    this.zone.run(() => this.applicationRef.tick());
    this.changeDetectorRef.detectChanges();
    this.zone.run(() => this.applicationRef.tick());
  }

  collapseAll() {
    this.categoryComponents.forEach(cat => {
        cat.collapseAll();
      }
    );
    this.zone.run(() => this.applicationRef.tick());
    this.changeDetectorRef.detectChanges();
  }

  uncheck(event: EventItem) {
    this.categoryComponents.forEach(c => {
      if (c.category.id === +event.categoryId) {
        c.unselectItem(event);
      }
    });
  }

  onAccordionValueChange(val: number | number[]) {
    this.activeCategory = Array.isArray(val) ? val as number[] : [val as number];
    if (Array.isArray(val)) {
      this.isExpanded = val.includes(0);
    } else {
      this.isExpanded = val === 0;
    }
    this.changeDetectorRef.markForCheck();
  }

}
