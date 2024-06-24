import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private chartCount = 0;
  private loadedChartCount = 0;

  show() {
    this.loadingSubject.next(true);
  }

  hide() {
    if (this.loadedChartCount === this.chartCount) {
      this.loadingSubject.next(false);
    }
  }

  registerChart() {
    this.chartCount++;
  }

  chartLoaded() {
    this.loadedChartCount++;
    this.hide();
  }
}
