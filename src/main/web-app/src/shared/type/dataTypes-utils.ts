import {AxiosPromise} from "axios";
import {RepositoryRequestParamModel} from "../../component/github/models/repository-request-param-model";

export interface IPayload<T> {
    type: string;
    payload: AxiosPromise<T>;
    meta?: any;
}


export type IPayloadRepository<T> = (entity?: RepositoryRequestParamModel) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export type IPayloadContributor<T> = (url?: string, repositoryID?: string) => IPayload<T> | ((dispatch: any) => IPayload<T>);
