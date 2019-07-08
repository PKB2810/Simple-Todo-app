import { SET_CURRENT_USER } from "./action-types";
import initialState from "./initial-state";

function currentUserReducer(state = initialState.currentUser, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      state = action.payload;
      return state;

    default:
      return state;
  }
}

export default currentUserReducer;
