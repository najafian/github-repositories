import {combineReducers} from 'redux';
import authenticationState, {AuthenticationState} from "../../component/authentication/reducer/authentication-reducer";
import mainOperations, {MainOperations} from "./actions-reducer";
import githubStateType, {GithubStateType} from "../../component/github/reducer/github-reducer";


export interface IRootState {
    readonly githubStateType: GithubStateType;
    readonly authenticationState: AuthenticationState;
    readonly mainOperations: MainOperations

}

const rootReducer = combineReducers<IRootState>({
    authenticationState,
    mainOperations,
    githubStateType
});

export default rootReducer;
