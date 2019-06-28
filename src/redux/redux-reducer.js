import {
  ADD_TODO,
  COMPLETED_TODO,
  UPDATE_TODO,
  VERIFY_USER
} from "./actionTypes";
import initialState from "./initialState";
import { COMPLETED } from "../globalConstants";

function reducer(state = initialState.todoList, action) {
  switch (action.type) {
    case ADD_TODO:
      console.log(state); //display all tasks
      const todoList = state.concat(action.payload);
      console.log(todoList); //display all tasks
      localStorage.setItem("todoList", JSON.stringify(todoList));
      return todoList;

    case COMPLETED_TODO:
      const currentTodoList = state.map(item => {
        if (
          item.id === action.payload.id &&
          item.userName == action.payload.userName
        ) {
          item.status = COMPLETED;
        }
        return item;
      });

      console.log(currentTodoList); //display all tasks
      localStorage.setItem("todoList", JSON.stringify(currentTodoList));

      return currentTodoList;

    case UPDATE_TODO:
      const updatedTodoList = state.map(item => {
        if (
          item.id === action.payload.task.id &&
          item.userName == action.payload.task.userName //bug introduced unknowingly fixed
        ) {
          item.task = action.payload.updatedTask;
        }
        return item;
      });

      console.log(updatedTodoList); //display all tasks
      localStorage.setItem("todoList", JSON.stringify(updatedTodoList));

      return updatedTodoList;
    case VERIFY_USER:
      const userObj = state.filter(
        user =>
          user.userName == action.payload.userName &&
          user.password == action.payload.password
      )[0];
      if (userObj) {
        return {
          ...state,
          currentUser: {
            userName: userObj.userName,
            password: userObj.password
          }
        };
      }
      return state;

    default:
      return state;
  }
}

export default reducer;
