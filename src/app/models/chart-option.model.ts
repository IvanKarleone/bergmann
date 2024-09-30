import { ChartOptionData } from '../types/chart-option-data.type';
import { ChartType } from '../types/chart-type.type';

export interface IChartOption {
  title: string;
  yAxisTitle: string;
  type: ChartType;
  color: string;
  name: string;
  data: ChartOptionData;
  startYear: number;
  endYear: number;
}
