import {PivotView} from '@syncfusion/ej2-pivotview';
import {
    Grid,
    Edit,
    Toolbar,
    RowSelectEventArgs,
    EditMode,
    NewRowPosition,
} from '@syncfusion/ej2-grids';
import {EmitType} from '@syncfusion/ej2-base';
import {IWidgetCommon} from "../common/common";
import {CheckUserPermissionOnControl} from "../../utils/permission";
import {DataSourceSettingsModel} from "@syncfusion/ej2-pivotview/src/pivotview/model/datasourcesettings-model";

export class CustomPivotGrid implements IWidgetCommon<PivotView> {
    private pivotView: PivotView;
    private isAuthenticated: boolean;

    applyPermission(elementPermissionID: string, userPermissions: string[]): void {
        const isAuthenticated: boolean = CheckUserPermissionOnControl(elementPermissionID, userPermissions);
        this.isAuthenticated = isAuthenticated;
    }

    constructor() {
        this.pivotView = new PivotView();
    }

    selectedEvent(rowSelected: EmitType<RowSelectEventArgs>) {
        this.pivotView.rowSelected = rowSelected;
    }


    getElement() {
        return this.pivotView.element;
    }

    setDataSource(data: any): void {
        this.pivotView.dataSourceSettings.dataSource = data;
    }

    addOrUpdateRow(data: any, idName: string) {
        const dataSource = this.getDataSource();
        const filter = dataSource.filter((f: any) => f[idName] !== data[idName]);
        filter.push(data);
        this.setDataSource(filter);
        this.dataBind();
    }

    getDataSourceSettings(): DataSourceSettingsModel {
        return this.pivotView.dataSourceSettings;
    }

    getDataSource(): any {
        return this.pivotView.dataSourceSettings.dataSource;
    }

    onSelect(rowSelected: EmitType<RowSelectEventArgs>) {
        this.pivotView.rowSelected = rowSelected;
    }


    allowGrouping(allowGrouping: boolean): void {
        this.pivotView.allowGrouping = allowGrouping;
    }

    allowExcelExport(allowExcelExport: boolean): void {
        this.pivotView.allowExcelExport = allowExcelExport;
    }

    allowPdfExport(allowPdfExport: boolean): void {
        this.pivotView.allowPdfExport = allowPdfExport;
    }

    editSettings(allowEditing?: boolean, allowAdding?: boolean, allowDeleting?: boolean, mode?: EditMode, newRowPosition?: NewRowPosition, editTemplate?: string): void {
        if (allowEditing || allowAdding || allowDeleting) {
            Grid.Inject(Edit, Toolbar);
        }
        this.pivotView.editSettings.allowEditing = allowEditing;
        this.pivotView.editSettings.allowAdding = allowAdding;
        this.pivotView.editSettings.allowDeleting = allowDeleting;
        this.pivotView.editSettings.mode = mode;
    }

    showDeleteConfirmDialog(showDeleteConfirmDialog: boolean): void {
        this.pivotView.editSettings.showDeleteConfirmDialog = showDeleteConfirmDialog;
    }

    allowEditOnDblClick(allowEditOnDblClick: boolean): void {
        this.pivotView.editSettings.allowEditOnDblClick = allowEditOnDblClick;
    }

    showConfirmDialog(showConfirmDialog: boolean): void {
        this.pivotView.editSettings.showConfirmDialog = showConfirmDialog;
    }


    enableVirtualization(enableVirtualization: boolean): void {
        this.pivotView.enableVirtualization = enableVirtualization;
    }

    createWidget(element: any): void {
        if (element !== undefined) {
            if (element instanceof HTMLElement) {
                this.pivotView.appendTo(element);
            } else {
                this.pivotView.appendTo('#' + element);
            }
        }
    }

    destroy(): void {
        this.pivotView.destroy();
    }

    getWidget() {
        return this.pivotView;
    }

    setHeight(height: number | string) {
        this.pivotView.height = height;
    }

    setWidth(width: string | number) {
        this.pivotView.width = width;
    }

    dataBind(): void {
        this.pivotView.dataBind();
    }

    refresh(): void {
        this.pivotView.refresh();
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
