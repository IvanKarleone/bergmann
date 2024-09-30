import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'mat-disallowed-button',
  standalone: true,
  imports: [MatButton, MatTooltip],
  templateUrl: './mat-disallowed-button.component.html',
  styleUrl: './mat-disallowed-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatDisallowedButtonComponent {
  readonly isDisallowed = input(false);
  readonly disallowedTooltip = input('');

  readonly clickEvent = output();
}
