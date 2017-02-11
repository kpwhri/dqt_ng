import { Component, OnInit } from '@angular/core';
import {SubjectTableDataItem} from "../categories";

@Component({
  selector: 'app-subject-table',
  templateUrl: './subject-table.component.html',
  styleUrls: ['./subject-table.component.css']
})
export class SubjectTableComponent implements OnInit {

  summary: string;
  caption: string;
  datarows: SubjectTableDataItem[];  // list of {}


  constructor() { }

  ngOnInit() {
  }

  updateTable(data: SubjectTableDataItem[]) {
    this.datarows = data;
  }

}
