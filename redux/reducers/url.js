import { handleActions } from "redux-actions";
import { API_URL } from "../constants/action-types";
const initialState = {
  URL: "",
};

const API = handleActions(
  {
    [API_URL]: (state, action) => state,
  },
  initialState
);

export default API;
