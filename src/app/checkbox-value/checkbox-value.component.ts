import { Component, OnInit } from '@angular/core';
import { SliderModule } from 'primeng/primeng';

@Component({
  selector: 'app-checkbox-value',
  templateUrl: './checkbox-value.component.html',
  styleUrls: ['./checkbox-value.component.css'],
  providers: [SliderModule]
})
export class CheckboxValueComponent implements OnInit {

  private vals: number[] = [60, 100];
  private max: number = 110;
  private min: number = 60;
  private step: number = 5;
  checked: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
