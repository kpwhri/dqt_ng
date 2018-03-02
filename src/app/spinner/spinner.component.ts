import {Component, Input, OnInit} from '@angular/core';
import {LoaderService} from '../loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  @Input() name = '';
  @Input() group = '';
  @Input() loadingImage: string;
  @Input() show = false;
  @Input() size = 'medium';

  constructor(
    private spinnerService: LoaderService
  ) { }

  ngOnInit(): void {
    this.spinnerService._register(this);
  }
}
