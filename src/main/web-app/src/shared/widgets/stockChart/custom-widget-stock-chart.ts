import {StockChart} from '@syncfusion/ej2-charts';
import {
    DateTime,
    AreaSeries,
    CandleSeries,
    HiloOpenCloseSeries,
    HiloSeries,
    LineSeries,
    SplineSeries
} from '@syncfusion/ej2-charts';
import {
    AccumulationDistributionIndicator,
    AtrIndicator,
    BollingerBands,
    EmaIndicator,
    MomentumIndicator
} from '@syncfusion/ej2-charts';
import {
    MacdIndicator,
    RsiIndicator,
    Trendlines,
    SmaIndicator,
    StochasticIndicator,
    Export
} from '@syncfusion/ej2-charts';
import {
    TmaIndicator,
    RangeTooltip,
    Tooltip,
    Crosshair,
} from '@syncfusion/ej2-charts';
import {IWidgetCommon} from "../common/common";
import {CheckUserPermissionOnControl} from "../../utils/permission";

StockChart.Inject(DateTime, AreaSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, LineSeries, SplineSeries);
StockChart.Inject(AccumulationDistributionIndicator, AtrIndicator, BollingerBands, EmaIndicator, MomentumIndicator);
StockChart.Inject(MacdIndicator, RsiIndicator, SmaIndicator, StochasticIndicator);
StockChart.Inject(Trendlines, TmaIndicator, RangeTooltip, Tooltip, Crosshair, Export);

export class CustomWidgetStockChart implements IWidgetCommon<StockChart> {
    private stockChart: StockChart;
    private isAuthenticated: boolean;
    widgetID: string;

    applyPermission(elementPermissionID: string, userPermissions: string[]): void {
        const isAuthenticated: boolean = CheckUserPermissionOnControl(elementPermissionID, userPermissions);
        this.isAuthenticated = isAuthenticated;
    }

    constructor() {
        this.stockChart = new StockChart();
    }

    initialize(dataSource: any, title: string, xName: string, yName: string, name: string) {
        this.stockChart.chartArea = {border: {width: 0}};
        this.stockChart.primaryXAxis = {
            valueType: 'DateTime',
            majorGridLines: {color: 'transparent'},
            crosshairTooltip: {enable: true}
        };
        this.stockChart.primaryYAxis = {
            lineStyle: {color: 'transparent'},
            majorTickLines: {color: 'transparent'},
            crosshairTooltip: {enable: true}
        };
        this.stockChart.series = [
            {
                dataSource: dataSource, xName: xName, yName: yName, type: 'Area', fill: '#BDEDE9'
            }
        ];
        this.stockChart.seriesType = [];
        this.stockChart.indicatorType = [];
        this.stockChart.title = title;
        this.stockChart.crosshair = {enable: true};
        console.log(document.getElementById(this.widgetID).innerHTML);
        if (document.getElementById(this.widgetID).innerHTML === undefined)
            this.createWidget(this.widgetID);
    }


    getElement() {
        return this.stockChart.element;
    }

    createWidget(element: any): void {
        if (element !== undefined) {
            if (element instanceof HTMLElement) {
                this.stockChart.appendTo(element);
            } else {
                this.stockChart.appendTo('#' + element);
            }
        }
    }

    destroy(): void {
        this.stockChart.destroy();
    }

    getWidget() {
        return this.stockChart;
    }

    setHeight(height: string) {
        this.stockChart.height = height;
    }

    setWidth(width: string) {
        this.stockChart.width = width;
    }

    dataBind(): void {
        this.stockChart.dataBind();
    }

    refresh(): void {
        this.stockChart.refresh();
    }

    getLabel(): string {
        return '';
    }

    setLabel(label: string) {
    }

    private setDisability(b: boolean) {
    }

    setWidgetDirection(isRtl: boolean): void {
    }
}
