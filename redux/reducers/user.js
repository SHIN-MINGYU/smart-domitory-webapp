import { handleActions } from "redux-actions";
import { Login, Logout } from "../constants/action-types";

const initialState = {
  isLogined: false,
  info: {
    std_id: "",
    std_name: "",
  },
};

const User = handleActions(
  {
    [Login]: (state, { payload: user }) => {
      return {
        ...state,
        isLogined: true,
        info: { std_id: user.id, std_name: user.name },
      };
    },
    [Logout]: (state, action) => {
      return {
        ...state,
        isLogined: false,
        info: {
          std_id: "",
          std_name: "",
        },
      };
    },
  },
  initialState
);

export default User;
