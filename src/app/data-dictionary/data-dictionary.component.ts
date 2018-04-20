import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../app.service';
import {DataCategory} from '../categories';

@Component({
  selector: 'app-data-dictionary',
  templateUrl: './data-dictionary.component.html',
  styleUrls: ['./data-dictionary.component.css']
})
export class DataDictionaryComponent implements OnInit {

  dataDictionary: DataCategory[];

  constructor(private categoryService: CategoryService) {
    this.loadDataDictionary();
  }

  ngOnInit() {

  }

  loadDataDictionary() {
    this.categoryService.getDataDictionary()
      .subscribe(
        data => this.dataDictionary = data['data_entries']
      );
  }
}
