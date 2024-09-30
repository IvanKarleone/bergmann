import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { MatDateYearPickerComponent } from '../mat-date-year-picker/mat-date-year-picker.component';
import { AsyncPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { ChartModule } from 'angular-highcharts';
import { MatDialog } from '@angular/material/dialog';
import { MatChartDialogComponent } from '../mat-chart-dialog/mat-chart-dialog.component';
import { ChartService } from '../../services/chart.service';
import { MatDisallowedButtonComponent } from '../mat-disallowed-button/mat-disallowed-button.component';
import {
  CHART_END_YEAR,
  CHART_START_YEAR,
} from '../../consts/chart-years.const';

@Component({
  selector: 'app-charts-panel',
  templateUrl: './charts-panel.component.html',
  styleUrl: './charts-panel.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    ChartModule,
    MatButton,
    MatDateYearPickerComponent,
    MatDisallowedButtonComponent,
  ],
  providers: [ChartService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsPanelComponent {
  readonly dialog = inject(MatDialog);
  readonly chartService = inject(ChartService);

  readonly startYear = signal<number | null>(null);
  readonly endYear = signal<number | null>(null);

  constructor() {
    this.listenDateFilterChanges();
  }

  onResetDateFilter(): void {
    this.startYear.set(null);
    this.endYear.set(null);
  }

  onAddChart(): void {
    this.dialog
      .open(MatChartDialogComponent)
      .componentInstance.addChart.subscribe(({ type, color }) => {
        const startYear = this.startYear() || CHART_START_YEAR;
        const endYear = this.endYear() || CHART_END_YEAR;

        this.chartService.addChart(type, color, startYear, endYear);
      });
  }

  private listenDateFilterChanges(): void {
    effect(
      () => {
        const startYear = this.startYear();
        const endYear = this.endYear();

        if (!!startYear && !!endYear) {
          this.chartService.setDateFilter(startYear, endYear);
        }

        if (startYear === null && endYear === null) {
          this.chartService.resetDateFilter();
        }
      },
      { allowSignalWrites: true }
    );
  }
}
