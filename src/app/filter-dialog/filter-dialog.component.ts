import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent implements OnInit {

  display = false;
  header: string;
  text: string;

  constructor() { }

  ngOnInit() {
  }

  displayDialog(header: string, text: string) {
    this.header = header;
    this.text = text;
    this.display = true;
  }

}
