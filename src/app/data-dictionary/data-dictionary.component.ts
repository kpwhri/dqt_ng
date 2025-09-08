import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../app.service';
import {Checksum, DataCategory} from '../categories';

@Component({
    selector: 'app-data-dictionary',
    templateUrl: './data-dictionary.component.html',
    styleUrls: ['./data-dictionary.component.css'],
    standalone: false
})
export class DataDictionaryComponent implements OnInit {

  dataDictionary: DataCategory[];
  checksums: Checksum[];

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
    this.categoryService.getDataDictionaryMeta()
      .subscribe(
        data => this.checksums = data['checksums']
      );
  }

  downloadFile() {
    window.location.href = this.categoryService.getDataDictionaryFile();
  }
}
