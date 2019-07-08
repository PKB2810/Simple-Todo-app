import {
  ADD_TODO,
  COMPLETED_TODO,
  UPDATE_TODO
  
} from "./action-types";
import initialState from "./initial-state";

function userOperationsReducer(state = initialState.todoList, action) {
  switch (action.type) {
    case ADD_TODO:
      return action.payload; //newTodoList;

    case COMPLETED_TODO:
      return action.payload; //currentTodoList;

    case UPDATE_TODO:
      return action.payload; //updatedTodoList

    default:
      return state;
  }
}

export default userOperationsReducer;
