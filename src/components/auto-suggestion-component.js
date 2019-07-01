import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

function AutoSuggestion({ searchText, userList, validateUserOnClick }) {
  console.log("in auto suggestion" + userList);
  if (searchText.trim() !== "") {
    const extractedUserList = userList.filter(user =>
      user.userName.trim().startsWith(searchText)
    );
    const userSet = Array.from(
      new Set(
        extractedUserList.map(user => {
          return user.userName;
        })
      )
    );

    const listOfUsers = userSet.map(user => {
      return (
        <ListGroupItem>
          <span className="spanOnCursor" onClick={e => validateUserOnClick(e)}>
            {user}
          </span>
        </ListGroupItem>
      );
    });
    if (listOfUsers.length > 0) {
      return (
        <ListGroup className="listGrpStyle autoSuggestionPositioningClass ">
          {listOfUsers}
        </ListGroup>
      );
    }
    return null;
  }
  return null;
}

export default AutoSuggestion;
