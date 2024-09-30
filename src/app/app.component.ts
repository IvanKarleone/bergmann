import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChartsPanelComponent } from './components/charts-panel/charts-panel.component';
import { MatButton } from '@angular/material/button';
import { IChartsPanel } from './models/charts-panel.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [MatButton, ChartsPanelComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  chartsPanels: IChartsPanel[] = [];

  onAddChartsPanel(): void {
    const chartPanel: IChartsPanel = {
      id: crypto.randomUUID()
    };

    this.chartsPanels = [...this.chartsPanels, chartPanel];
  }
}
