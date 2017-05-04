import { Component, OnInit } from '@angular/core';
import {SubjectTableDataItem} from '../categories';
import {CategoryService} from '../app.service';

@Component({
  selector: 'app-subject-table',
  templateUrl: './subject-table.component.html',
  styleUrls: ['./subject-table.component.css']
})
export class SubjectTableComponent implements OnInit {

  summary: string;
  caption: string;
  datarows: SubjectTableDataItem[];  // list of {}
  comments: string[] = [];
  maskValue = 0;
  title = '';

  constructor(private categoryService: CategoryService) {
    this.categoryService.getComments('table')
      .subscribe(result => {
        this.comments = result.comments as string[];
        this.maskValue = result.mask as number;
        this.title = result.cohortTitle as string;
      });
  }

  ngOnInit() {
  }

  updateTable(data: SubjectTableDataItem[]) {
    this.datarows = data;
  }

}
