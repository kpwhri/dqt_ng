import {Component, OnInit, ViewChild, ChangeDetectorRef, ApplicationRef} from '@angular/core';
import {Category, EventItem, SubjectTableDataItem} from '../categories';
import {CategoryService} from '../app.service';
import {CategoryMasterComponent} from '../category-master/category-master.component';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';
import {MenuListener} from '../menuListener';
import {SubjectTableComponent} from '../subject-table/subject-table.component';
import {FilterDialogComponent} from '../filter-dialog/filter-dialog.component';

import {MatDialog} from '@angular/material/dialog';
import {SearchDialogComponent} from '../search-dialog/search-dialog.component';
import {LoaderService} from '../loader.service';
import {GoogleAgeChartComponent} from '../google-age-chart/google-age-chart.component';
import {MatSidenav} from '@angular/material/sidenav';

declare var google: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild('master', {static: false}) masterComponent: CategoryMasterComponent;
  @ViewChild('gAgeBlChart', {static: false}) gAgeChartComponent: GoogleAgeChartComponent;
  @ViewChild('gAgeFuChart', {static: false}) gAgeFuChartComponent: GoogleAgeChartComponent;
  @ViewChild('breadcrumb', {static: false}) breadcrumbComponent: BreadcrumbComponent;
  @ViewChild('subjectTable', {static: false}) subjectTableComponent: SubjectTableComponent;
  @ViewChild('filterDialog', {static: false}) filterDialogComponent: FilterDialogComponent;
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
  ageBlTitle = 'Age Distribution (Baseline)';
  ageFuTitle = 'Age Distribution (Follow-up)';
  categories: Array<Category> = [];
  searchTerm = '';
  buttonText = 'SHOW · FILTERS';
  opened = false;
  mode = 'side';
  private chartData = '';
  private rangeFilters: Map<string, string[]> = new Map<string, string[]>();
  private filters: Map<string, Map<string, boolean>> = new Map<string, Map<string, boolean>>();
  private showFilters = 'SHOW · FILTERS';
  private hideFilters = 'HIDE · FILTERS';

  ngOnInit(): void {
    // give everything a chance to get loaded before starting the animation to reduce choppiness
    this.menuListener.RemoveValue.on(e => this.removeFilter(e));
    this.menuListener.SelectCategory.on(categoryId => this.selectCategory(null, categoryId));
    this.menuListener.SelectItem.on(itemCatId => this.selectCategory(itemCatId[0], itemCatId[1]));
    this.menuListener.ExportFilter.on(e => this.exportFilters());
    this.menuListener.CollapseAll.on(e => this.collapseAll());
    this.menuListener.NavigationMode.on(e => this.switchNavigationMode());
    this.menuListener.Refresh.on(e => this.refreshData());
  }

  toggleSidenav(): void {
    /*
    Without toggling twice, the navbar covers one of the graphs
     */
    this.sidenav.toggle();
    if (this.sidenav.opened && this.mode === 'side') {
      this.buttonText = this.hideFilters;
    } else {  // open
      this.buttonText = this.showFilters;
    }
  }

  switchNavigationMode(): void {
    if (this.mode === 'over') {
      this.mode = 'side';
    } else {
      this.mode = 'over';
    }
  }

  constructor(private categoryService: CategoryService,
              private menuListener: MenuListener,
              private changeDetectorRef: ChangeDetectorRef,
              private applicationRef: ApplicationRef,
              public dialog: MatDialog,
              private spinnerService: LoaderService
  ) {
    this.loadGoogle();
  }

  loadGoogle() {
    /*
      TODO: reset to 'current' when this bug resolved:
        * https://github.com/google/google-visualization-issues/issues/2693
        Alternatively, need to load chart after page is viewed (refresh). Worried about viz not yet being loaded, etc.
     */
    google.charts.load('45.2', {
      'packages': ['controls', 'corechart']
    });
    google.charts.setOnLoadCallback(() => {
      this.filterItems();
    });
  }

  promoteCategory(itemId: number, categoryId: number) {
    this.masterComponent.bringCategoryToTop(itemId, categoryId);
  }

  openDialog() {
    let dialogRef = this.dialog.open(SearchDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(r => {
        if (r) {
          this.promoteCategory(r['itemId'], r['categoryId']);
        }
      }
    )
  }

  refreshData() {
    this.filterItems();
  }

  filterItems() {
    const fs = this.parseFilters();
    const rfs = this.parseRangeFilters();
    const res = fs.concat(rfs);
    if (res.length > 0) {
      this.chartData = res.join('&');
    } else {
      this.chartData = '';
    }

    const obs = this.categoryService.filterItems(this.chartData);
    obs.subscribe(e => {
      this.spinnerService.hide('startSpinner');
      this.gAgeChartComponent.updateChart(google, e.age_bl_g as any[]);
      this.gAgeFuChartComponent.updateChart(google, e.age_fu_g as any[]);
      this.subjectTableComponent.updateTable(e.subject_counts as SubjectTableDataItem[]);
    });
  }

  collapseAll() {
    this.masterComponent.collapseAll();
    this.changeDetectorRef.detectChanges();
    this.applicationRef.tick();
  }

  parseFilters(): string[] {
    const res: string[] = [];
    this.filters.forEach(
      (valMap: any, item) => {
        const items = [];
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
    const res: string[] = [];
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
    if (e.eventItem.selected) {
      this.breadcrumbComponent.addItem(e.eventItem);
    } else {
      this.breadcrumbComponent.removeItem(e.eventItem);
    }
  }

  updateChanges(e: EventItem) {
    if (e.id != null) {  // this is a single value
      if (this.filters.has(e.itemId)) {
        const newVal = this.filters.get(e.itemId);
        newVal.set(e.id, e.selected);
        this.filters.set(e.itemId, newVal);
      } else {
        const m = new Map<string, boolean>();
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
    const obs = this.categoryService.exportFilters(this.chartData);
    obs.subscribe(r => {
      this.filterDialogComponent.displayDialog('Current Filter', r['filterstring']);
    });
  }

}
