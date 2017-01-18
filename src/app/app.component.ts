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
    var res = [];
    for (var i in this.categories) {
      for (var j in this.categories[i].items) {
        for (var k in this.categories[i].items[j].values) {
          if (this.categories[i].items[j].values[k].selected == true) {
            res.push(`${this.categories[i].items[j].id}=${this.categories[i].items[j].values[k].id}`);
          }
        }
      }
    }
    if (res.length > 0) {
      this.chartData = res.join("&");
    } else {
      this.chartData = '';
    }
    var obs = this.categoryService.filterItems(res.join("&"));
    obs.map((r: Response) => r.json().count as number).subscribe(e => this.count = e);
  }

  updateCheckedOptions(value: Value, event) {
    value.selected = event.target.checked;
  }


}
