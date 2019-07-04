import React from "react";
import ReactDOM from "react-dom";
import { ListGroup, ListGroupItem } from "reactstrap";

class AutoSuggestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: this.props.userList,
      searchText: this.props.searchText,
      currSuggInd: 0
    };
  }

  render() {
    console.log("in auto suggestion" + this.props.userList);
    if (this.props.searchText.trim() !== "") {
      //extract those names which start with text in textbox
      const extractedUserList = this.state.userList.filter(user =>
        user.userName.trim().startsWith(this.props.searchText)
      );
      //remove duplicates
      const userSet = Array.from(
        new Set(
          extractedUserList.map(user => {
            return user.userName;
          })
        )
      );

      const listOfUsers = userSet.map((user, index) => {
        let className = "";
        if (index === this.props.currSuggInd) {
          className = "active-suggestion";
        }
        return (
          <ListGroupItem
            className={className}
            key={index}
            onClick={
              e => {
                console.log("event is" + e);
                this.props.setUserNameFromAutoSuggestion(e);
              }
              /*this.props.validateUserOnClick(e)*/
            }
          >
            {user}
          </ListGroupItem>
        );
      });

      if (listOfUsers.length > 0) {
        return (
          <ListGroup className="listGrpStyle autoSuggestionPositioningClass suggestionsList">
            {listOfUsers}
          </ListGroup>
        );
      }
      return null;
    }
    return null;
  }
}

export default AutoSuggestion;
