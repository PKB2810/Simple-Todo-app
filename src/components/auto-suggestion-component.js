import React from "react";
import ReactDOM from "react-dom";
import { ListGroup, ListGroupItem } from "reactstrap";

class AutoSuggestion extends React.Component {
  constructor(props) {
    super(props);
    this.focusseditem = React.createRef();
  }

  componentDidUpdate() {
    if (this.focusseditem.current) {
      this.focusseditem.current.focus();
    }
    // console.log(this.focusseditem);
    //
  }

  render() {
    console.log("in auto suggestion" + this.props.userList);
    if (this.props.searchText.trim() !== "") {
      //extract those names which start with text in textbox
      const extractedUserList = this.props.userList.filter(user =>
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
        //if down arrow key is used its count%length matches current item's index we highlight it
        if (
          this.props.keyCode === 40 &&
          this.props.keyPressedCount % userSet.length === index
        ) {
          console.log("here");
          return (
            <ListGroupItem
              className="listitemSelected"
              className="spanOnCursor "
              onClick={e => this.props.validateUserOnClick(e)}
            >
              {/*  <div
                ref={this.focusseditem}
                key={index}
                onFocus={e => {
                  console.log("onFocus");
                  this.props.setUserName(e);
                }}
              > */}
              {user}
              {/* </div> */}
            </ListGroupItem>
          );
        }
        return (
          <ListGroupItem key={index}>
            <span
              className="spanOnCursor"
              onClick={e => this.props.validateUserOnClick(e)}
            >
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
}

export default AutoSuggestion;
