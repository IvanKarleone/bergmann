import {
  ChangeDetectionStrategy,
  Component,
  effect,
  Input,
  input,
  WritableSignal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-mat-date-year-picker',
  templateUrl: './mat-date-year-picker.component.html',
  styleUrl: './mat-date-year-picker.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatDateYearPickerComponent {
  @Input({ required: true })
  dateYear!: WritableSignal<number | null>;

  label = input.required<string>();

  min = input(null, {
    transform: (value: number | null) => value && new Date(value, 0),
  });

  max = input(null, {
    transform: (value: number | null) => value && new Date(value, 0),
  });

  readonly dateFormControl = new FormControl<Date | null>(null);

  constructor() {
    effect(() => {
      if (this.dateYear() === null) {
        this.dateFormControl.reset();
      }
    });
  }

  setDateYear(date: Date): void {
    this.dateFormControl.setValue(date);

    this.dateYear.set(date.getFullYear());
  }
}
