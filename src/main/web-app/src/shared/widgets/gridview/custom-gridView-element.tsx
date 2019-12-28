import React, { CSSProperties } from 'react';
import {CustomGridview} from "./CustomGridview";
import {CustomWidgetCommon} from "../common/common";
import UniqueID from "../../utils/uniqueKey";

export class CustomGridViewElement extends CustomWidgetCommon<CustomGridview> {
  gridview: CustomGridview;
  attrs: CSSProperties;

  constructor(prop:any) {
    super(prop);
    this.gridview = new CustomGridview();
    this.widget = this.gridview;
    this.widgetID = UniqueID();
    this.widgetPanelID = UniqueID();
    this.initialProps(this.props.widgetProp);
    this.attrs = { width: this.props.width, height: this.height, display: 'flex', fontSize: this.fontSize };
  }

  componentDidMount(): void {
    this.widget.createWidget(this.widgetID);
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div id={this.widgetPanelID} style={this.attrs}>
        <label/>
        <div style={{ padding: '0 4px 0' }}>
          <div style={{ height: this.height, fontSize: this.fontSize, padding: '0' }} id={this.widgetID}/>
        </div>
      </div>);
  }

  destroy(): void {
    this.widget.destroy();
  }
}
