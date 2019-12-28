import React, {CSSProperties} from 'react';
import {CustomPivotGrid} from "./CustomPivotGrid";
import {CustomWidgetCommon} from "../common/common";
import UniqueID from "../../utils/uniqueKey";

export class CustomPivotGridElement extends CustomWidgetCommon<CustomPivotGrid> {
    pivotGrid: CustomPivotGrid;
    attrs: CSSProperties;

    constructor(prop: any) {
        super(prop);
        this.pivotGrid = new CustomPivotGrid();
        this.widget = this.pivotGrid;
        this.widgetID = UniqueID();
        this.widgetPanelID = UniqueID();
        this.initialProps(this.props.widgetProp);
    }

    componentDidMount(): void {
        this.widget.createWidget(this.widgetID);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="control-section"  style={{height: '100%', width: '100%'}}>
                <div id={this.widgetPanelID} className="content-wrapper" style={{height: '100%', width: '100%'}}>
                    <div id={this.widgetID} />
                </div>
            </div>
        );
    }

    destroy(): void {
        this.widget.destroy();
    }
}
