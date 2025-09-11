import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CategoryService} from '../app.service';
import {Observable, of, Subject} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators';
import {SearchResult} from '../categories';
import {AlertService} from '../alert.service';

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

  private searchTerms = new Subject<string>();

  constructor(
    public dialogRef: MatDialogRef<SearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    private alertService: AlertService,
  ) {
  }

  ngOnInit() {
    this.results$ = this.searchTerms.pipe(
      // debounce user typing
      debounceTime(300),
      // skip duplicate consecutive queries
      distinctUntilChanged(),
      // toggle display after debounce and sanitization
      switchMap(sanitized => {
        if (sanitized.length < 3) {
          return of([]);
        }
        return this.categoryService.search(sanitized).pipe(
          map((data: any) => (data?.['search'] ?? []) as SearchResult[]),
          catchError(err => {
            console.warn('Error:', sanitized, err);
            return of([]);
          })
        );
      })
    );
  }


  private sanitize(term: string): string {
    const normalized = (term ?? '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    // retain only ASCII and spaces
    return normalized
      .replace(/[^A-Za-z ]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 51);
  }

  search(e, term: string, target) {
    // Push raw input; pipeline will sanitize, debounce, and search
    const trimmed = this.sanitize(term);
    this.display = trimmed.length >= 3;
    if (trimmed.length > 50) {
      // impose maximum length of input: keep current table
      this.alertService.showToast('Input too long!', 'WARNING', 1500);
      return;
    }
    this.searchTerms.next(trimmed);
  }

  // search(e, term: string, target) {
  //   const trimmed = this.sanitize(term);
  //   if (trimmed.length > 50) {
  //     // impose maximum length of input: keep current table
  //     this.alertService.showToast('Input too long!', 'WARNING', 1500);
  //   } else if (trimmed.length >= 3) {
  //     // This triggers a backend call on each invocation
  //     this.results$ = this.categoryService.search(trimmed).pipe(
  //       map((data: any) => (data?.['search'] ?? []) as SearchResult[]),
  //       catchError(err => {
  //         console.warn('Error:', trimmed, err);
  //         return of([]);
  //       })
  //     );
  //     this.display = true;
  //   } else {
  //     this.results$ = of([]);
  //     this.display = false;
  //   }
  // }

  promoteCategory(itemId, categoryId): void {
    this.dialogRef.close({itemId: itemId, categoryId: categoryId});
  }

}
