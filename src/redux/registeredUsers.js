import initialState from "./initialState";

const regiteredUsersState = {
  currentUser: {
    userName: "",
    admin: ""
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
