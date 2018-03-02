import { Injectable } from '@angular/core';
import {SpinnerComponent} from './spinner/spinner.component';

@Injectable()
export class LoaderService {

  private spinnerCache = new Set<SpinnerComponent>();

  constructor() { }

  _register(spinner: SpinnerComponent): void {
    this.spinnerCache.add(spinner);
  }

  show(spinnerName: string): void {
    this.spinnerCache.forEach(spinner => {
      if (spinner.name === spinnerName) {
        spinner.show = true;
      }
    });
  }

  hide(spinnerName: string): void {
    this.spinnerCache.forEach(spinner => {
      if (spinner.name === spinnerName) {
        spinner.show = false;
      }
    });
  }

  showGroup(spinnerGroup: string): void {
    this.spinnerCache.forEach(spinner => {
      if (spinner.group === spinnerGroup) {
        spinner.show = true;
      }
    });
  }

  hideGroup(spinnerGroup: string): void {
    this.spinnerCache.forEach(spinner => {
      if (spinner.group === spinnerGroup) {
        spinner.show = false;
      }
    });
  }

}
