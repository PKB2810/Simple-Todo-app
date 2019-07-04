import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

function DisplayUsers({ userList, validateUserOnClick }) {
  const list = userList.map(user => {
    if (user.userName) {
      return user.userName;
    }
  });
  console.log(userList);
  const userSet = Array.from(new Set(list));
  console.log("set is " + userSet);
  const users = userSet.map(user => {
    if (user !== "")
      return (
        <ListGroupItem
          className="spanOnCursor"
          onClick={e => validateUserOnClick(e)}
        >
          {user}
        </ListGroupItem>
      );
  });
  if (users.length > 0) {
    return (
      <div>
        <h6 className="heading"> Users </h6>
        <div className="listGrpStyle">
          <ListGroup>{users}</ListGroup>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default DisplayUsers;
