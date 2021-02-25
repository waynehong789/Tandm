import { createAction, props } from '@ngrx/store';

export const setToken = createAction(
  '[Login Page] Login',
  props<{ username: string; token: string }>()
);

export const clearToken = createAction(
  '[Login Page] LogOut'
);
