import initialState from "./initialState";

const regiteredUsersState = {
  currentUser: {
    userName: "",
    admin: ""
  },
  userList: [
    {
      userName: "admin",
      todoList: initialState.todoList,
      registered: true
    }
  ]
};

export default regiteredUsersState;
