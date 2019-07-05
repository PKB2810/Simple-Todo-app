import { VERIFY_USER } from "./actionTypes";
import registeredUsers from "./registeredUsers";

function userReducer(state = registeredUsers.userList, action) {
  switch (action.type) {
    case VERIFY_USER:
      const user = state.filter(
        user =>
          user.userName == action.payload.userName &&
          user.password == action.payload.password
      );
      if (user !== null) {
        return user;
      }
      return {};
  }
}
