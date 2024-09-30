import { Injectable, signal } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { IChartOption } from '../models/chart-option.model';
import { ChartType } from '../types/chart-type.type';
import { RandomHelper } from '../helpers/random.helper';
import { ChartOptionData } from '../types/chart-option-data.type';

@Injectable()
export class ChartService {
  readonly charts = signal<Chart[]>([]);
  private readonly initialChartOptions: IChartOption[] = [];

  public addChart(type: ChartType, color: string, startYear: number, endYear: number): void {
    const yAxisTitle = RandomHelper.generateIndicator();

    const options: IChartOption = {
      title: `Annual Average ${yAxisTitle}`,
      yAxisTitle,
      type,
      color,
      name: RandomHelper.generateCity(),
      data: this.generateChartData(startYear, endYear),
      startYear,
      endYear
    };

    this.initialChartOptions.push(options);
    const charts = [...this.charts(), this.createChart(options)];

    this.charts.set(charts);
  }

  public setDateFilter(startYear: number, endYear: number): void {
    const charts: Chart[] = [];

    for(const options of this.initialChartOptions) {
      const data: ChartOptionData = {};

      for (const dataKey of Object.keys(options.data)) {
        if (+dataKey >= startYear && +dataKey <= endYear) {
          data[dataKey] = options.data[dataKey];
        }
      }

      const chart = this.createChart({
        ...options,
        data,
        startYear,
        endYear
      });

      charts.push(chart);
    }

    this.charts.set(charts);
  }

  public resetDateFilter(): void {
    const charts: Chart[] = [];

    for (const options of this.initialChartOptions) {
      const chart = this.createChart(options);

      charts.push(chart);
    }

    this.charts.set(charts);
  }

  private createChart({
    title,
    yAxisTitle,
    type,
    color,
    name,
    data,
    startYear,
  }: IChartOption): Chart {
    return new Chart({
      chart: {
        type: 'line',
      },
      title: {
        text: title,
      },
      xAxis: {
        title: {
          text: 'Year',
        },
        type: 'datetime',
      },
      yAxis: {
        title: {
          text: yAxisTitle,
        },
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true,
          },
          enableMouseTracking: true,
        },
      },
      series: [
        {
          type: type,
          color: color,
          name: name,
          data: Object.values(data),
          pointStart: Date.UTC(startYear),
          pointInterval: 3600 * 1000 * 24 * 365, // one year
        },
      ],
    });
  }

  private generateChartData(startYear: number, endYear: number): ChartOptionData {
    const amountData = endYear - startYear + 1;
    const dataNumbers = RandomHelper.generateRandomNumbers(0, 20, amountData);
    const data: ChartOptionData = {};

    for (let i = 0; i < amountData; i++) {
      const year = startYear + i;

      data[year] = dataNumbers[i];
    }

    return data;
  }
}
