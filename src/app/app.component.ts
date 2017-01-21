import {Component, OnInit} from '@angular/core';
import {Category, SearchResult, Value} from "./categories";
import {CategoryService} from "./app.service";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {CategoryMasterComponent} from "./category-master/category-master.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'Data Query Tool';
  categories: Array<Category> = [];
  results: Observable<SearchResult[]>;
  count: number = 0;
  checked: true;
  private chartData: string;
  private rangeFilters: Map<string, string[]> = new Map<string, string[]>();
  private filters: Map<string, Map<string, boolean>> = new Map<string, Map<string, boolean>>();


  ngOnInit() : void {
    // give everything a chance to get loaded before starting the animation to reduce choppiness
  }

  constructor(private categoryService: CategoryService) { }

  getCategory(stype: string, categoryId: number) {
    for (var idx in this.categories) {
      console.warn(`${this.categories[idx]} ${categoryId}`);
      if (this.categories[idx].id == categoryId) {
        return;
      }
    }
    // this.categoryService.getCategory(stype, categoryId).subscribe(res => this.categoryMaster.add(res));
  }

  search(term: string) {
    this.results = this.categoryService.search(term);
  }

  filterItems() {
    var fs = this.parseFilters();
    var rfs = this.parseRangeFilters();
    var res = fs.concat(rfs);
    console.warn(rfs);
    console.warn(fs);
    if (res.length > 0) {
      this.chartData = res.join("&");
    } else {
      this.chartData = '';
    }
    console.warn(this.chartData);

    var obs = this.categoryService.filterItems(this.chartData);
    obs.map((r: Response) => r.json().count as number).subscribe(e => this.count = e);
  }

  parseFilters(): string[] {
    var res: string[] = [];
    this.filters.forEach(
      (valMap: any, item) => {
        var items = [];
        valMap.forEach(
          (checked, val) => {
            if (checked) {
              items.push(val);
            }
          }
        );
        if (items.length > 0) {
          res.push(`${item}=${items.join('_')}`);
        }
      }
    );
    return res;
  }

  parseRangeFilters(): string[] {
    var res: string[] = [];
    this.rangeFilters.forEach(
      (vals, item) => {
        res.push(`${item}=${vals[0]}~${vals[1]}`);
      }
    );
    return res;
  }


  /*
    Update filters and rangeFilters (filters which include a range rather than binary off/on values
   */
  categoryUpdated(e) {
    if (e.eventItem.id != null) {  // this is a single value
      if (this.filters.has(e.eventItem.itemId)) {
        var newVal = this.filters.get(e.eventItem.itemId);
        newVal.set(e.eventItem.id, e.eventItem.selected);
        this.filters.set(e.eventItem.itemId, newVal);
      } else {
        var m = new Map<string, boolean>();
        m.set(e.eventItem.id, e.eventItem.selected);
        this.filters.set(e.eventItem.itemId, m);
      }
    } else {  // this is a range
      if (e.eventItem.selected) {
        this.rangeFilters.set(e.eventItem.itemId, e.eventItem.values);
      } else {
        this.rangeFilters.delete(e.eventItem.itemId);
      }
    }
    this.filterItems();
  }
}
