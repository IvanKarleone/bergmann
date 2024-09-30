import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ChartType } from '../../types/chart-type.type';
import { CHART_TYPES } from '../../consts/chart-type.const';
import { IChartDialogOption } from '../../models/chart-dialog-option.model';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-mat-chart-dialog',
  templateUrl: './mat-chart-dialog.component.html',
  styleUrl: './mat-chart-dialog.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule,MatButton, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatChartDialogComponent {
  readonly chartOptionsForm = new FormGroup({
    type: new FormControl<ChartType>('line', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    color: new FormControl<string>('red', {
      nonNullable: true,
    }),
  });

  readonly chartTypes = CHART_TYPES;
  readonly chartTypesKeys = Object.keys(CHART_TYPES) as ChartType[];

  readonly addChart = output<IChartDialogOption>();

  onAddChart(): void {
    const { type, color } = this.chartOptionsForm.getRawValue();

    this.addChart.emit({ type, color });
  }
}
