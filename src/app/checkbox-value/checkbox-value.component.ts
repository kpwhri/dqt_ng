import {Component, OnInit, Input} from '@angular/core';
import { SliderModule } from 'primeng/primeng';

@Component({
  selector: 'app-checkbox-value',
  templateUrl: './checkbox-value.component.html',
  styleUrls: ['./checkbox-value.component.css'],
  providers: [SliderModule]
})
export class CheckboxValueComponent implements OnInit {

  @Input('max') max: number = 100;
  @Input('min') min: number = 0;
  @Input('step') step: number = 5;
  checked: boolean = true;
  private vals: number[];

  constructor() { }

  ngOnInit() {
    this.vals = [this.min, this.max];
  }

}
