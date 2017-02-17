import {Component, OnInit, ViewChild} from '@angular/core';
import {Category, SearchResult, AgeGraphClass, EnrollGraphClass, EventItem, SubjectTableDataItem} from "./categories";
import {CategoryService} from "./app.service";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {CategoryMasterComponent} from "./category-master/category-master.component";
import {AgeChartComponent} from "./age-chart/age-chart.component";
import {BreadcrumbComponent} from "./breadcrumb/breadcrumb.component";
import {MenuListener} from "./menuListener";
import {SubjectTableComponent} from "./subject-table/subject-table.component";
import {FilterDialogComponent} from "./filter-dialog/filter-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('master') masterComponent: CategoryMasterComponent;
  @ViewChild('ageChart') ageChartComponent: AgeChartComponent;
  @ViewChild('breadcrumb') breadcrumbComponent: BreadcrumbComponent;
  @ViewChild('subjectTable') subjectTableComponent: SubjectTableComponent;
  @ViewChild('filterDialog') filterDialogComponent: FilterDialogComponent;
  title = 'ACT Data Query Tool';
  categories: Array<Category> = [];
  results: Observable<SearchResult[]>;
  count: number = 0;
  searchTerm: string = "";
  checked: true;
  display: boolean = false;
  private chartData: string = "";
  private ageGraphData: AgeGraphClass;
  private enrollGraphData: EnrollGraphClass;
  private rangeFilters: Map<string, string[]> = new Map<string, string[]>();
  private filters: Map<string, Map<string, boolean>> = new Map<string, Map<string, boolean>>();


  ngOnInit(): void {
    // give everything a chance to get loaded before starting the animation to reduce choppiness
    this.menuListener.RemoveValue.on(e => this.removeFilter(e));
    this.menuListener.SelectCategory.on(categoryId => this.selectCategory(null, categoryId));
    this.menuListener.SelectItem.on(itemCatId => this.selectCategory(itemCatId[0], itemCatId[1]));
    this.menuListener.ExportFilter.on(e => this.exportFilters());
  }

  constructor(private categoryService: CategoryService, private menuListener: MenuListener) {
    this.filterItems();
  }

  promoteCategory(itemId: number, categoryId: number) {
    this.masterComponent.bringCategoryToTop(itemId, categoryId);
  }

  search(e, term: string) {
    if (term.length >= 3) {
      this.results = this.categoryService.search(term);
      this.display = true;
    } else {
      this.results = null;
      this.display = false;
    }
  }

  filterItems() {
    var fs = this.parseFilters();
    var rfs = this.parseRangeFilters();
    var res = fs.concat(rfs);
    if (res.length > 0) {
      this.chartData = res.join("&");
    } else {
      this.chartData = '';
    }

    var obs = this.categoryService.filterItems(this.chartData);
    obs.map((r: Response) => r.json()).subscribe(e => {
      this.ageChartComponent.updateChart(e.age as AgeGraphClass);
      this.subjectTableComponent.updateTable(e.subject_counts as SubjectTableDataItem[]);
    });
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
    this.updateChanges(e.eventItem);

    this.filterItems();
    if (e.eventItem.selected)
      this.breadcrumbComponent.addItem(e.eventItem);
    else
      this.breadcrumbComponent.removeItem(e.eventItem);
  }

  updateChanges(e: EventItem) {
    if (e.id != null) {  // this is a single value
      if (this.filters.has(e.itemId)) {
        var newVal = this.filters.get(e.itemId);
        newVal.set(e.id, e.selected);
        this.filters.set(e.itemId, newVal);
      } else {
        var m = new Map<string, boolean>();
        m.set(e.id, e.selected);
        this.filters.set(e.itemId, m);
      }
    } else {  // this is a range
      if (e.selected) {
        this.rangeFilters.set(e.itemId, e.values);
      } else {
        this.rangeFilters.delete(e.itemId);
      }
    }
  }


  removeFilter(e: EventItem) {
    e.selected = false;
    this.updateChanges(e);
    this.filterItems();
    this.breadcrumbComponent.removeItem(e);
    this.masterComponent.uncheck(e);
  }

  selectCategory(itemId: string, categoryId: string) {
    this.promoteCategory(+itemId, +categoryId);
  }

  exportFilters() {
    // don't update, just export most recent set of filters
    var obs = this.categoryService.exportFilters(this.chartData);
    obs.map((r: Response) => r.json()).subscribe(e => {
      this.filterDialogComponent.displayDialog("Current Filter", e.filterstring);
    });
  }

}
