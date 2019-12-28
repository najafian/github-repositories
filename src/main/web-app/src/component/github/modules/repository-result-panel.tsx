import React from 'react';
import {Col, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {RepositoryItemModel} from "../models/repository-item-model";
import RepositorySearchResult, {WindowPropModel} from "../window/repository-search-result";
import UniqueID from "../../../shared/utils/uniqueKey";
import {CustomWidgetButtonElement} from "../../../shared/widgets/button/CustomWidgetButtonElement";
import {IWidgetOps} from "../../../shared/widgets/common/common";
import {CustomWidgetButton} from "../../../shared/widgets/button/CustomWidgetButton";
import {repositoryIcon} from "../contents/icon-string";

interface IProps extends StateProps, DispatchProps {
    repositoryItem: RepositoryItemModel;
}


class RepositoryResultPanel extends React.Component<IProps> {
    private windowProp: WindowPropModel = {};
    private repositoryButton: IWidgetOps<CustomWidgetButton> = {};

    constructor(props: any) {
        super(props);
        this.windowProp.panelID = 'root';
        this.windowProp.repositoryID = UniqueID()
    }

    componentDidMount(): void {
        this.repositoryButton.getWidget().setLabel(repositoryIcon + ' repository')
        this.repositoryButton.getWidget().onClick(() => {
            this.selectContributor(this.props.repositoryItem.full_name);
        });
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const repository = this.props.repositoryItem;
        return (<li className="e-card">
                <Row><img src="" alt=""/><a
                    href={repository.html_url}>{repository.full_name}</a></Row>
                <Row><h6>{repository.name}</h6></Row>
                <Row><p style={{color: "gray", maxWidth: '90%'}}>{repository.description}</p></Row>
                <Row>
                    <Col md={2}>
                        <span className="repo-language-color" style={{backgroundColor: '#b07219'}}/>
                        <label className="repo-text-with-icon">{repository.language}</label>
                    </Col>
                    <Col md={2}>
                        <svg aria-label="star" viewBox="0 0 14 16" version="1.1" width="14" height="16" role="img">
                            <path  d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"/>
                        </svg>
                        <a href={repository.stargazers_url} className="repo-text-with-icon">
                            {repository.stargazers_count}
                        </a>
                    </Col>
                    <CustomWidgetButtonElement widgetProp={this.repositoryButton}/>
                    <RepositorySearchResult windowProp={this.windowProp}/>
                </Row>
            </li>
        );
    }

    private selectContributor(full_name: string) {
        this.windowProp.show(full_name);
    }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = {};
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RepositoryResultPanel);