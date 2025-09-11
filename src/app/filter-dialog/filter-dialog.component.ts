import {Component, OnInit} from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';
import {AlertService} from '../alert.service';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css'],
  standalone: false
})
export class FilterDialogComponent implements OnInit {

  display = false;
  header: string;
  text: string;
  copySuccess = false;

  constructor(
    private clipboard: Clipboard,
    private alertService: AlertService,
  ) {
  }

  ngOnInit() {
  }

  displayDialog(header: string, text: string) {
    this.header = header;
    this.text = text;
    this.display = true;
  }

  copyText() {
    if (this.clipboard.copy(this.text)) {
      this.copySuccess = true;
      this.alertService.showToast('Filter copied.', 'SUCCESS', 1500)

      setTimeout(() => {
        this.copySuccess = false;
      }, 1500)
    }
  }

}
