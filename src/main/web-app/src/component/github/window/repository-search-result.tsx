import React from 'react';
import {connect} from "react-redux";
import '../contents/styles/rps-game-page.css';
import {
    CustomWidgetWindowElement,
    IDirectionWindowAction,
    IWindowWidget
} from "../../../shared/widgets/window/CustomWidgetWindowElement";
import {resetIfNotAthenticated} from "../service/restart-service";
import {IRootState} from "../../../shared/reducer";
import {fetchCommitList} from "../reducer/github-reducer";
import {Col, Row} from "react-bootstrap";
import {CustomGridViewElement} from "../../../shared/widgets/gridview/custom-gridView-element";
import {CustomGridview} from "../../../shared/widgets/gridview/CustomGridview";
import {IWidgetOps} from "../../../shared/widgets/common/common";
import {LoadingBar} from "../../../shared/widgets/spinner/LoadingBar";
import {CustomPivotGridElement} from "../../../shared/widgets/pivot/custom-pivot-grid-element";
import {CustomPivotGrid} from "../../../shared/widgets/pivot/CustomPivotGrid";
import {CustomStockChartElement} from "../../../shared/widgets/stockChart/custom-stock-chart-element";
import {CustomWidgetStockChart} from "../../../shared/widgets/stockChart/custom-widget-stock-chart";
import {CustomWidgetChartElement} from "../../../shared/widgets/charts/custom-widget-chart-element";
import {CustomWidgetChart} from "../../../shared/widgets/charts/custom-widget-chart";


export interface WindowPropModel {
    panelID?: string;
    repositoryID?: string;

    show?(data: any): void;
}

interface IProps extends StateProps, DispatchProps {
    windowProp: WindowPropModel
}

class RepositorySearchResult extends React.Component<IProps> implements IDirectionWindowAction {
    private _windowContributor: IWindowWidget = {};
    private repositoryUrl = '';
    private commitGrid: IWidgetOps<CustomGridview> = {};
    private loadingBar: LoadingBar;
    private pivotGrid: IWidgetOps<CustomPivotGrid> = {};
    private chart: IWidgetOps<CustomWidgetChart> = {};

    showWindow(): boolean {
        this.loadingBar.showLoading();
        this.props.fetchContributorList(this.repositoryUrl, this.props.windowProp.repositoryID);
        return true;
    }

    close(event: Function): boolean {
        return true;
    }

    constructor(props: any) {
        super(props);
        resetIfNotAthenticated(props);
        this.props.windowProp.show = (url) => {
            this.repositoryUrl = url;
            this.showWindow()
        }
    }

    componentDidMount(): void {
        this.loadingBar = new LoadingBar(this.props.windowProp.panelID);
        const pivot = this.pivotGrid.getWidget();
        pivot.setWidth('800px');
        pivot.setHeight('100%');
        pivot.getWidget().gridSettings.columnWidth = 190;
      //  this.configStockChart();
        const grid = this.commitGrid.getWidget();
        grid.columns([
            {field: 'name'},
            {field: 'email', width: 300},
            {field: 'date', width: 300, type: 'date'},
            {field: 'count'}
        ]);

    }


    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any): void {
        const commitsReducer = this.props.githubStateType.commitReducer;
        if (commitsReducer !== prevProps.githubStateType.commitReducer &&
            commitsReducer.repositoryID === this.props.windowProp.repositoryID) {
            const data = commitsReducer.detailDtos.map(m => ({...m, date: new Date(m['date'])}));
            this.configPivotGrid(data);
            this.loadingBar.hideLoading();
         //   this.setChartSeries(data);
            this.commitGrid.getWidget().setDataSource(data);
            this._windowContributor.widget.showDialog();
        }
    }

    private configPivotGrid(detailDtos: any[]) {
        const dataSourceSettings = this.pivotGrid.getWidget().getDataSourceSettings();
        dataSourceSettings.enableSorting = true;
        dataSourceSettings.columns = [{name: 'date', showSubTotals: true}];
        dataSourceSettings.values = [{name: 'count', type: 'Count'}];
        dataSourceSettings.rows = [{name: 'name', showSubTotals: true}];
        dataSourceSettings.expandAll = false;
        dataSourceSettings.filters = [];
        dataSourceSettings.dataSource = detailDtos;
        this.pivotGrid.getWidget().dataBind();
    }

    private configStockChart() {
        const chart = this.chart.getWidget();
        chart.setprimaryXAxis({
            valueType: 'DateTime',
            labelFormat: 'y',
            intervalType: "Hours",
            edgeLabelPlacement: "Shift",
            majorGridLines: {width: 0}
        });
        chart.setprimaryYAxis({
            labelFormat: '{value}%',
            rangePadding: 'None',
            minimum: 0,
            maximum: 100,
            interval: 20,
            lineStyle: {width: 0},
            majorTickLines: {width: 0},
            minorTickLines: {width: 0}
        });
        chart.setChartArea({
            border: {
                width: 0
            }
        });
        chart.setTitle('timeline');
        chart.setTooltip({enable: true});
        chart.setWidth('100%');
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <CustomWidgetWindowElement windowWidget={this._windowContributor}
                                       settleElementID={this.props.windowProp.panelID}
                                       width={800}
                                       height={600}>
                <Row>
                    <Col md={5}><CustomGridViewElement widgetProp={this.commitGrid}/></Col>
                    <Col md={7}><CustomPivotGridElement widgetProp={this.pivotGrid}/></Col>
                </Row>
                {/*<Row>*/}
                {/*    <CustomWidgetChartElement width={'100%'} widgetProp={this.chart}/>*/}
                {/*</Row>*/}
            </CustomWidgetWindowElement>);
    }

    private setChartSeries(data: { date: Date; name: string; count: string; email: string }[]) {
        const chartSeries = data.map(m => ({x: m.date, y: m.count}));
        this.chart.getWidget().setseries([{
            type: 'Line',
            dataSource: chartSeries,
            xName: 'x', width: 2, marker: {
                visible: true,
                width: 10,
                height: 10
            },
            yName: 'y', name: 'timeline',
        }]);
        this.chart.getWidget().getWidget().refresh();
    }
}

const mapStateToProps = ({githubStateType, mainOperations, authenticationState}: IRootState) => ({
    authenticationState,
    mainOperations,
    githubStateType
});

const mapDispatchToProps = {
    fetchContributorList: fetchCommitList
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RepositorySearchResult);