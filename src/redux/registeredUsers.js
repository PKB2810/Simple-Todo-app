import initialState from "./initialState";

const regiteredUsersState = {
  currentUser: {
    userName: "",
    password: ""
  },
  userList: [
    {
      userName: "admin",
      password: "admin",
      todoList: initialState.todoList,
      registered: true
    }
  ]
};

export default regiteredUsersState;
