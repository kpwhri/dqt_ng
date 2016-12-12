import {Component, OnInit} from '@angular/core';
import {Category, SearchResult, Value} from "./categories";
import {CategoryService} from "./app.service";
import {Observable, Subject} from "rxjs";
import {Response} from "@angular/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Data Query Tool (Alpha)';
  categories: Array<Category> = [];
  results: Observable<SearchResult[]>;
  count: number = 0;

  private searchTerm: string;

  ngOnInit(): void {
  }

  constructor(private categoryService: CategoryService) { }

  getCategory(stype: string, categoryId: number) {
    for (var idx in this.categories) {
      console.warn(`${this.categories[idx]} ${categoryId}`)
      if (this.categories[idx].id == categoryId) {
        return;
      }
    }
    this.categoryService.getCategory(stype, categoryId).subscribe(res => this.categories.push(res));
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
    var obs = this.categoryService.filterItems(res.join("&"));
    obs.map((r: Response) => r.json().count as number).subscribe(e => this.count = e);
  }

  updateCheckedOptions(value: Value, event) {
    value.selected = event.target.checked;
  }


}
