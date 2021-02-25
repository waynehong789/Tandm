import { Action, createReducer, on } from '@ngrx/store';
import * as appActions from './actions';

export interface IAppState {
  loaded: boolean;
  data: {
    userName: string;
    token: string;
  };
}

const INITIAL_STATE: IAppState = {
  loaded: false,
  data: {
    userName: undefined,
    token: undefined,
  },
};

const appReducer = createReducer(
  INITIAL_STATE,
  on(appActions.setToken, (state: IAppState, { username, token }) => ({
    ...state,
    loaded: true,
    data: { userName: username, token: token },
  })),
  on(appActions.clearToken, (state: IAppState) => ({
    ...state,
    loaded: false,
    data: { userName: undefined, token: undefined },
  }))
);

export function reducer(state: IAppState | undefined, action: Action) {
  return appReducer(state, action);
}
