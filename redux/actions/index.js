import { createAction } from "redux-actions";
import { API_URL, Login, Logout } from "../constants/action-types";

export const api_url = createAction(API_URL);
export const login = createAction(Login);
export const logout = createAction(Logout);
