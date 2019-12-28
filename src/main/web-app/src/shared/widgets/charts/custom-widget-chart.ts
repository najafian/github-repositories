import {
  Chart,
  Category,
  Legend,
  Tooltip,
  ILoadedEventArgs,
  StackingLineSeries,
  TooltipSettingsModel,
  SeriesModel,
  ChartAreaModel,
  AxisModel,
  MultiColoredAreaSeries,
  ChartAnnotation,
  DateTime,
  ChartAnnotationSettingsModel,
  LegendSettingsModel
} from '@syncfusion/ej2-charts';
import { EmitType } from '@syncfusion/ej2-base';
import {IWidgetCommon} from "../common/common";
import {CheckUserPermissionOnControl} from "../../utils/permission";

Chart.Inject(StackingLineSeries, Category, Legend, Tooltip, DateTime, Tooltip, ChartAnnotation, MultiColoredAreaSeries);

export class CustomWidgetChart implements IWidgetCommon<Chart> {
  private chart: Chart;
  permissionID: boolean;

  applyPermission(elementPermissionID: string, userPermissions: string[]): void {
    const isAuthenticated: boolean = CheckUserPermissionOnControl(elementPermissionID, userPermissions);
    this.permissionID = isAuthenticated;
  }
  constructor(element?: string | HTMLElement, placeHolder?: string, isRtl?: boolean) {
    this.chart = new Chart();
    this.setWidgetDirection(isRtl);
    this.createWidget(element);
  }

  setWidgetDirection(isRtl: any): void {
    this.chart.enableRtl = isRtl;
  }

  setHeight(height: number) {
  }

  setAnnotation(annotations: ChartAnnotationSettingsModel[]) {
    this.chart.annotations = annotations;
  }

  setlegendSettings(legendSettings: LegendSettingsModel) {
    this.chart.legendSettings = legendSettings;
  }

  setLoad(load: EmitType<ILoadedEventArgs>) {
    this.chart.load = load;
  }

  setWidth(width: string) {
    this.chart.width = width;
    // this.chart.width = Browser.isDevice ? '100%' : '60%';
  }

  destroy(): void {
    this.chart.destroy();
  }

  getWidget() {
    return this.chart;
  }

  getElement() {
    return this.chart.element;
  }

  createWidget(element: any): void {
    if (element !== undefined) {
      if (element instanceof HTMLElement) {
        this.chart.appendTo(element);
      } else {
        this.chart.appendTo('#' + element);
      }
    }
  }

  setTooltip(tooltip: TooltipSettingsModel) {
    this.chart.tooltip = tooltip;
  }

  setTitle(title: string) {
    this.chart.title = title;
  }

  setprimaryXAxis(primaryXAxis: AxisModel) {
    this.chart.primaryXAxis = primaryXAxis;
  }

  setprimaryYAxis(primaryYAxis: AxisModel) {
    this.chart.primaryYAxis = primaryYAxis;
  }

  setChartArea(chartArea: ChartAreaModel) {
    this.chart.chartArea = chartArea;
  }

  setseries(series: SeriesModel[]) {
    this.chart.series = series;
  }
  getLabel(): string {
    return '';
  }

  setLabel(label: string) {
  }
}
