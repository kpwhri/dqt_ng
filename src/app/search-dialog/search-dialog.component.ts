import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CategoryService} from '../app.service';
import {Observable} from 'rxjs/Rx';
import {SearchResult} from '../categories';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent implements OnInit {

  results: Observable<SearchResult[]>;
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
      this.categoryService.search(term)
        .subscribe(
          data => {
            this.results = data['search'];
          },
          err => {
            console.warn('Error:', term, err);
            this.results = null;
          }
        );
      this.display = true;
    } else {
      this.results = null;
      this.display = false;
    }
  }

  promoteCategory(itemId, categoryId): void {
    this.dialogRef.close({itemId: itemId, categoryId: categoryId});
  }

}
