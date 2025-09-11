import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CategoryService} from '../app.service';
import {Observable, of} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {SearchResult} from '../categories';

@Component({
    selector: 'app-search-dialog',
    templateUrl: './search-dialog.component.html',
    styleUrls: ['./search-dialog.component.css'],
    standalone: false
})
export class SearchDialogComponent implements OnInit {

  searchTerm = '';
  results$: Observable<SearchResult[]> = of([]);
  display = false;

  constructor(
    public dialogRef: MatDialogRef<SearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
  }

  search(e, term: string, target) {
    if (term && term.length >= 3) {
      this.results$ = this.categoryService.search(term)
        .pipe(
          map((data: any) => (data?.['search'] ?? []) as SearchResult[]),
          catchError(err => {
            console.warn('Error:', term, err);
            return of([]);
          })
        )
      ;
      this.display = true;
    } else {
      this.results$ = of([]);
      this.display = false;
    }
  }

  promoteCategory(itemId, categoryId): void {
    this.dialogRef.close({itemId: itemId, categoryId: categoryId});
  }

}
