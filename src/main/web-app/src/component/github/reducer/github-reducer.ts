import axios from 'axios';
import {FAILURE, REQUEST, SUCCESS} from "../../../shared/utils/action-type.util";
import {IPayloadContributor, IPayloadRepository} from "../../../shared/type/dataTypes-utils";
import {RepositoryRequestParamModel} from "../models/repository-request-param-model";
import {RepositoryResponseModel} from "../models/repository-response-model";
import {CommitModel} from '../models/commit-model';


export const ACTION_TYPES = {
    FETCH_BOOKMARK_LIST: ':github/FETCH_BOOKMARK_LIST',
    INSERT_BOOKMARK: ':github/INSERT_BOOKMARK',
    UPDATE_BOOKMARK_LIST: ':github/UPDATE_BOOKMARK_LIST',
    DELETE_BOOKMARK_LIST: ':github/DELETE_BOOKMARK_LIST',
    FETCH_REPOSITORY_LIST: ':github/FETCH_REPOSITORY_LIST',
    FETCH_COMMIT_LIST: ':github/FETCH_CONTRIBUTOR_LIST'
};

export const objectType: Readonly<any> = {};
export const arrayType: Readonly<any> = [];
export const commitType: Readonly<{ detailDtos?: CommitModel[], repositoryID?: string }> = {};
export const repositoryType: Readonly<RepositoryResponseModel> = {};

const initialState = {
    loading: false,
    repositoryReducer: repositoryType,
    bookmarkListReducer: arrayType,
    bookmarkInsertReducer: objectType,
    bookmarkEditReducer: objectType,
    bookmarkDeleteReducer: objectType,
    commitReducer: commitType,
};

export type GithubStateType = Readonly<typeof initialState>;

// Reducer
export default (state: GithubStateType = initialState, action: any): GithubStateType => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.FETCH_REPOSITORY_LIST):
        case REQUEST(ACTION_TYPES.FETCH_COMMIT_LIST):
        case REQUEST(ACTION_TYPES.FETCH_BOOKMARK_LIST):
        case REQUEST(ACTION_TYPES.INSERT_BOOKMARK):
        case REQUEST(ACTION_TYPES.UPDATE_BOOKMARK_LIST):
        case REQUEST(ACTION_TYPES.DELETE_BOOKMARK_LIST):
            return {
                ...state,
                loading: true
            };
        case FAILURE(ACTION_TYPES.FETCH_REPOSITORY_LIST):
        case FAILURE(ACTION_TYPES.FETCH_COMMIT_LIST):
        case FAILURE(ACTION_TYPES.FETCH_BOOKMARK_LIST):
        case FAILURE(ACTION_TYPES.INSERT_BOOKMARK):
        case FAILURE(ACTION_TYPES.UPDATE_BOOKMARK_LIST):
        case FAILURE(ACTION_TYPES.DELETE_BOOKMARK_LIST):
            return {
                ...state,
                loading: false,
            };
        case SUCCESS(ACTION_TYPES.FETCH_REPOSITORY_LIST):
            return {
                ...state,
                loading: false,
                repositoryReducer: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.FETCH_COMMIT_LIST):
            return {
                ...state,
                loading: false,
                commitReducer: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.FETCH_BOOKMARK_LIST):
            return {
                ...state,
                loading: false,
                bookmarkListReducer: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.INSERT_BOOKMARK):
            return {
                ...state,
                loading: false,
                bookmarkInsertReducer: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.UPDATE_BOOKMARK_LIST):
            return {
                ...state,
                loading: false,
                bookmarkEditReducer: action.payload.data
            };
        case SUCCESS(ACTION_TYPES.DELETE_BOOKMARK_LIST):
            return {
                ...state,
                loading: false,
                bookmarkDeleteReducer: action.payload.data
            };
        default:
            return state;
    }
};

// Actions
export const fetchBookmarkList: IPayloadContributor<any> = () => ({
    type: ACTION_TYPES.FETCH_COMMIT_LIST,
    payload: axios.get('/api/github-bookmark-url')
});

// Actions
export const insertBookmark: IPayloadContributor<any> = entiry => ({
    type: ACTION_TYPES.FETCH_COMMIT_LIST,
    payload: axios.post('/api/github-bookmark-url', entiry)
});

// Actions
export const deleteBookmark: IPayloadContributor<any> = entiry => ({
    type: ACTION_TYPES.FETCH_COMMIT_LIST,
    payload: axios.delete('/api/github-bookmark-url', {data: entiry})
});

// Actions
export const editBookmark: IPayloadContributor<any> = entiry => ({
    type: ACTION_TYPES.FETCH_COMMIT_LIST,
    payload: axios.put('/api/github-bookmark-url', entiry)
});

// Actions
export const fetchRepositoryList: IPayloadRepository<any> = (entity: RepositoryRequestParamModel) => ({
    type: ACTION_TYPES.FETCH_REPOSITORY_LIST,
    payload: axios.post('/api/github-repository-url', entity)
});

// Actions
export const fetchCommitList: IPayloadContributor<any> = (url, repositoryID) => ({
    type: ACTION_TYPES.FETCH_COMMIT_LIST,
    payload: axios.get('/api/github-repository-url?repositoryUrl=' + url + '&repositoryID=' + repositoryID)
});