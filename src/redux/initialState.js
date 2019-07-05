const initialState = {
  todoList:
    localStorage.getItem("todoList") === null ||
    localStorage.getItem("todoList") === ""
      ? []
      : JSON.parse(localStorage.getItem("todoList"))
};

export default initialState;
