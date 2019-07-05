import {
  ADD_TODO,
  COMPLETED_TODO,
  UPDATE_TODO,
  VERIFY_USER
} from "./actionTypes";

import { COMPLETED } from "../globalConstants";

export function completedTodo(task, todoList) {
  const currentTodoList = todoList.map(item => {
    if (item.id === task.id && item.userName == task.userName) {
      item.status = COMPLETED;
    }
    return item;
  });

  console.log(currentTodoList); //display all tasks
  localStorage.setItem("todoList", JSON.stringify(currentTodoList));

  return { type: COMPLETED_TODO, payload: currentTodoList };
}

export function addTodo(task, todoList) {
  console.log(todoList); //display all tasks
  const newTodoList = todoList.concat(task);
  console.log(newTodoList); //display all tasks with added task
  localStorage.setItem("todoList", JSON.stringify(newTodoList));
  return { type: ADD_TODO, payload: newTodoList };
}

export function updateTodo(task, updatedTask, todoList) {
  const updatedTodoList = todoList.map(item => {
    if (item.id === task.id && item.userName == task.userName) {
      item.task = updatedTask;
    }
    return item;
  });

  console.log(updatedTodoList); //display all tasks
  localStorage.setItem("todoList", JSON.stringify(updatedTodoList));

  return {
    type: UPDATE_TODO,
    payload: updatedTodoList
  };
}

export function verifyUser(userObj) {
  return {
    type: VERIFY_USER,
    payload: userObj
  };
}
