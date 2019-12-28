import React, {CSSProperties} from 'react';
import {CustomWidgetStockChart} from "./custom-widget-stock-chart";
import {CustomWidgetCommon} from "../common/common";
import UniqueID from "../../utils/uniqueKey";

export class CustomStockChartElement extends CustomWidgetCommon<CustomWidgetStockChart> {
    stockChart: CustomWidgetStockChart;
    attrs: CSSProperties;

    constructor(prop: any) {
        super(prop);
        this.stockChart = new CustomWidgetStockChart();
        this.widget = this.stockChart;
        this.widgetID = UniqueID();
        this.widgetPanelID = UniqueID();
        this.initialProps(this.props.widgetProp);
    }

    componentDidMount(): void {
        this.widget.widgetID = this.widgetID;
        //this.widget.createWidget(this.widgetID);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div style={{width: this.props.width, height: this.height}} id={this.widgetPanelID}>
                <button style={{height: this.height, fontSize: this.fontSize}} id={this.widgetID}/>
            </div>);
    }

    destroy(): void {
        this.widget.destroy();
    }
}
