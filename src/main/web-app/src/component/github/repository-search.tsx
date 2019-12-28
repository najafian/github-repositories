import React from "react";
import {connect} from "react-redux";
import {resetIfNotAthenticated} from "./service/restart-service";
import {IRootState} from "../../shared/reducer";
import {CustomWidgetInputElement} from "../../shared/widgets/textbox/CustomWidgetInputElement";
import {Col, Row} from "react-bootstrap";
import {CustomWidgetButtonElement} from "../../shared/widgets/button/CustomWidgetButtonElement";
import {IWidgetOps} from "../../shared/widgets/common/common";
import RepositoryPanel from "./modules/repository-result-panel";
import {CustomWidgetInput} from "../../shared/widgets/textbox/CustomWidgetInput";
import {CustomWidgetButton} from "../../shared/widgets/button/CustomWidgetButton";
import {fetchBookmarkList, fetchRepositoryList} from "./reducer/github-reducer";
import {CustomWidgetPagerElement} from "../../shared/widgets/pager/CustomWidgetPagerElement";
import {CustomWidgetPager} from "../../shared/widgets/pager/CustomWidgetPager";
import {CustomWidgetDropDownElement} from "../../shared/widgets/dropDownBox/CustomWidgetDropDownElement";
import {CustomWidgetDropDown} from "../../shared/widgets/dropDownBox/CustomWidgetDropDown";
import UniqueID from "../../shared/utils/uniqueKey";
import {languageDatasource} from "./models/language-json-data";
import {LoadingBar} from "../../shared/widgets/spinner/LoadingBar";
import {CustomListBoxElement} from "../../shared/widgets/listbox/CustomListBoxElement";
import {CustomListBox} from "../../shared/widgets/listbox/CustomListBox";

interface ICardInstituteProps extends StateProps, DispatchProps {
    windowProp: { show?(data: any): void }
}

class RepositorySearch extends React.Component<ICardInstituteProps> {
    private repositorySearchInput: IWidgetOps<CustomWidgetInput> = {};
    private repositorySearchButton: IWidgetOps<CustomWidgetButton> = {};
    private languageList: IWidgetOps<CustomWidgetDropDown> = {};
    private pager: IWidgetOps<CustomWidgetPager> = {};
    private pageSize: IWidgetOps<CustomWidgetInput> = {};
    private pageNumber: IWidgetOps<CustomWidgetInput> = {};
    private pageId = UniqueID();
    private loadingBar: LoadingBar;
    private bookmarkList: IWidgetOps<CustomListBox> = {};


    constructor(props: any) {
        super(props);
        resetIfNotAthenticated(props);
    }

    componentDidMount(): void {
        this.initializeFields();
    }

    private initializeFields() {
        this.loadingBar = new LoadingBar(this.pageId);

        const searchInput = this.repositorySearchInput.getWidget();
        searchInput.setWidth('100%');

        this.initialLeftField();

        const pager = this.pager.getWidget();
        pager.onClick(((a: any) => {
            this.searchRepository(a['currentPage']);
        }));

        this.initializeSearchButton();
    }

    private initialLeftField() {
        const pageNumber = this.pageNumber.getWidget();
        pageNumber.setType('number');
        pageNumber.setValue('1');
        pageNumber.setLabel('Page number:');

        const pageSizeInput = this.pageSize.getWidget();
        pageSizeInput.setType('number');
        pageSizeInput.setValue('10');
        pageSizeInput.setLabel('Page size:');

        const languageDropDown = this.languageList.getWidget();
        languageDropDown.setDataSource(languageDatasource);
        languageDropDown.setFloatLabelType("Always");
        languageDropDown.setLabel('language :');
        languageDropDown.setIndex(0);

        const bookmarkList = this.bookmarkList.getWidget();
        bookmarkList.setWidth('100%');
        bookmarkList.setHeight(200);
    }

    searchRepository(pageNumber: number) {
        const searchInput = this.repositorySearchInput.getWidget();
        const value = searchInput.getValue();
        if (value.length > 0) {
            this.loadingBar.showLoading();
            this.props.fetchRepositoryList({
                requestValue: value,
                page: pageNumber,
                pageSize: parseInt(this.pageSize.getWidget().getValue(), 0),
                language: this.languageList.getWidget().getValue().toString(),
                sort: 'stars'
            });
        } else
            this.props.mainOperations.toastAction.showToast('please fill the search input!');
    }

    private initializeSearchButton() {
        this.repositorySearchButton.getWidget().onClick(() => {
            const pageNumber = parseInt(this.pageNumber.getWidget().getValue(), 0);
            this.searchRepository(pageNumber);
        });
        this.repositorySearchButton.getWidget().setLabel('search');
    }

    private setPager(repositoryReducer: any) {
        const pageSize = parseInt(this.pageSize.getWidget().getValue(), 0);
        let totalCount = repositoryReducer.total_count;
        if (totalCount > 1000) {
            totalCount = 1000;
        }
        this.pager.getWidget().setTotalRecordCount(totalCount);
        this.pager.getWidget().setPageSize(pageSize);

    }

    render() {
        const result = this.props.githubStateType.repositoryReducer;
        let items = [] as any;
        if (result.items !== undefined) {
            items = result.items.map(r => <RepositoryPanel repositoryItem={r}/>);
            this.setPager(result);
            this.loadingBar.hideLoading();
        }
        return (
            <div id={this.pageId} className="login-page-form" style={{height: '90%', width: '95%'}}>
                <Row>
                    <label className="repository-note">message from github: Only the first 1000 search results are
                        available","documentation_url":"https://developer.github.com/v3/search/"</label>
                </Row>
                <div className="row" style={{height: 'calc(100% - 25px)', overflowX: 'hidden', overflowY: 'auto'}}>
                    <div className="col-md-2">

                        <CustomWidgetInputElement widgetProp={this.pageSize}/>
                        <CustomWidgetInputElement widgetProp={this.pageNumber}/>
                        <CustomWidgetDropDownElement widgetProp={this.languageList}/>

                        <div className="e-card panel-bookmark">
                            <label className={"label-bookmark"}>Bookmark List</label>
                            <CustomListBoxElement widgetProp={this.bookmarkList}/>
                        </div>
                    </div>
                    <div className="col-md-10" style={{borderLeft: '1px solid gray'}}>
                        <br/>
                        <Row>
                            <Col md={7}>
                                <h3> {result.total_count ? (result.total_count + ' repository results') : ''} </h3>
                            </Col>
                            <Col md={3}>
                                <CustomWidgetInputElement width={'100%'} widgetProp={this.repositorySearchInput}/>
                            </Col>
                            <Col md={2}>
                                <CustomWidgetButtonElement widgetProp={this.repositorySearchButton}/>
                            </Col>
                        </Row>
                        <hr/>
                        <div className="row repository-list-panel-class">
                            <ul style={{height: '100%', overflow: 'auto', width: '100%'}}>
                                {items}
                            </ul>
                        </div>
                        <div
                            style={{position: "absolute", bottom: '10px', width: '100%'}}>
                            <hr/>
                            <div style={{margin: '0 auto', width: 'calc(100% - 130px)'}}>
                                <CustomWidgetPagerElement widgetProp={this.pager}/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = ({mainOperations, authenticationState, githubStateType}: IRootState) => ({
    authenticationState,
    mainOperations,
    githubStateType
});

const mapDispatchToProps = {
    fetchRepositoryList,
    fetchBookmarkList
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RepositorySearch);
