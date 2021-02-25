import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState } from './reducers';

const selectAppState = createFeatureSelector<IAppState>('appState');

export const isAppLoaded = createSelector(
  selectAppState,
  (state: IAppState) => state.loaded
);

export const selectUserToken = createSelector(
  selectAppState,
  (state: IAppState) => state.data.token
);
