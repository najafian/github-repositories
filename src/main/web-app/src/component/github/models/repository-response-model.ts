import {RepositoryItemModel} from "./repository-item-model";

export interface RepositoryResponseModel {
    total_count?: number;
    incomplete_results?: boolean;
    items?: RepositoryItemModel[];
}