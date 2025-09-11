import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CategoryService} from '../app.service';
import {Observable, of, Subject} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
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
  }

  private sanitize(term: string): string {
    const normalized = (term ?? '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
    // retain only ASCII and spaces
    const lettersAndSpaces = normalized.replace(/[^A-Za-z ]/g, '');
    // collapse multiple spaces
    return lettersAndSpaces.replace(/\s+/g, ' ').trim();

  }

  search(e, term: string, target) {
    const trimmed = this.sanitize(term);
    if (trimmed.length > 50) {
      // impose maximum length of input: keep current table
      this.alertService.showToast('Input too long!', 'WARNING', 1500);
    } else if (trimmed.length >= 3) {
      // This triggers a backend call on each invocation
      this.results$ = this.categoryService.search(trimmed).pipe(
        map((data: any) => (data?.['search'] ?? []) as SearchResult[]),
        catchError(err => {
          console.warn('Error:', trimmed, err);
          return of([]);
        })
      );
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
