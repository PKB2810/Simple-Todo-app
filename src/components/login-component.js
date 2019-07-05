import React from "react";
import { Input, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { connect } from "react-redux";
import { verifyUser } from "../redux/actionCreators";
import { ListGroup, ListGroupItem } from "reactstrap";

import { Redirect } from "react-router-dom";
import DisplayUsers from "./view-user-list-component";
import TextComponent from "./text-component";

const mapStateToProps = state => {
  return {
    todoList: state.todoList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    verifyUser: userObj => dispatch(verifyUser(userObj))
  };
};
class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.setAutoSuggestion = null;
    this.state = {
      userName: "",
      password: "",
      redirect: false,
      displayAutoSuggestionBox: false,
      keyCode: 0,
      currSuggInd: -1,
      currSugg: "",
      noUserName:false,
      userList: Array.from(
        new Set(
          this.props.todoList.map(user => {
            return user.userName;
          })
        )
      )
    };
  }
  componentWillUnmount() {
    this.setState({ currSuggInd: 0 });
  }

  setUserName = e => {
    console.log("inside setusername");

    //extract those names which start with text in textbox
    const extractedUserList = this.props.todoList.filter(user =>
      user.userName.trim().startsWith(e.target.value)
    );
    //remove duplicates
    const userSet = Array.from(
      new Set(
        extractedUserList.map(user => {
          return user.userName;
        })
      )
    );
    this.setState(
      {
        userName: e.target.value ? e.target.value : e.target.innerHTML,
        userList: userSet
      },

      function() {
        //debouncing
        if (this.setAutoSuggestion) {
          //if already set , clear previous timeout so as to have updated userName
          clearTimeout(this.setAutoSuggestion);
        }
        this.setAutoSuggestion = setTimeout(() => {
          if (this.state.userName.trim() !== "") {
            this.setState({ displayAutoSuggestionBox: true });
          } else {
            this.setState({ displayAutoSuggestionBox: false });
          }
        }, 500);
      }
    );
  };

  //redirect to main.js
  validateUser = e => {
    e.preventDefault();
    if (this.state.userName.trim() !== "") {
      localStorage.setItem("currentUser", this.state.userName);

      this.setState({ redirect: true,noUserName:false });
    }else{
        this.setState({noUserName:true});

    }
  };

  //validateUserOnClick() called to login from DisplayUserList
  validateUserOnClick = e => {
    e.preventDefault();
    if (e.target.innerHTML !== "") {
      localStorage.setItem("currentUser", e.target.innerHTML);
      this.setState({ redirect: true,noUserName:false });
    }else{
      this.setState({noUserName:true});
    }
  };

  //renderAutoSuggestion() renders autosuggestion listbox
  renderAutoSuggestion = () => {
    if (this.state.displayAutoSuggestionBox === true) {
      if (this.state.userName.trim() !== "") {
        const listOfUsers = this.state.userList.map((user, index) => {
          let className = "";
          if (index === this.state.currSuggInd) {
            className = "active-suggestion";
          }
          return (
            <ListGroupItem
              className={className}
              key={index}
              onClick={e => {
                console.log("event is" + e);
                this.setUserName(e);
              }}
            >
              {user}
            </ListGroupItem>
          );
        });

        if (listOfUsers.length > 0) {
          return (
            <ListGroup className=" autoSuggestionPositioningClass suggestionsList">
              {listOfUsers}
            </ListGroup>
          );
        }
        return null;
      }
    }

    return null;
  };

  //setKeyData()-sets currSuggInd , used to extract hovered or selected element inside renderAutoSuggestion()
  setKeyData = e => {
    if (e.keyCode === 38) {
      if (this.state.currSuggInd === -1) {
        return;
      }
      this.setState({ currSuggInd: this.state.currSuggInd - 1 });
    }
    if (e.keyCode === 40) {
      if (this.state.currSuggInd === this.state.userList.length - 1) {
        return;
      }
      this.setState({ currSuggInd: this.state.currSuggInd + 1 });
    }
    if (e.keyCode === 13) {
      this.setState({
        currSuggInd: -1,
        displayAutoSuggestionBox: false,
        userName:
          this.state.userList[this.state.currSuggInd] === undefined
            ? e.target.value
            : this.state.userList[this.state.currSuggInd]
      });
    }
  };

  redirectToApp = () => {
    if (this.state.redirect)
      return (
        <Redirect
          to={{
            pathname: "/app",
            state: this.state.userName
          }}
        />
      );
  };
  render() {
    if(this.state.noUserName){

      throw new Error("User Id field cannot be blank.Please enter User Id! ");

    }
    return (
      <section >
              <section >
                <TextComponent className="textStlye" textSize="md">UserId:</TextComponent>
                <Input type="text"
                  value={this.state.userName}
                  onChange={e => this.setUserName(e)}
                  onKeyDown={e => this.setKeyData(e)}
                />
                {this.renderAutoSuggestion()}
                <Button
                  color="primary"
                  type="button"
                  onClick={e => this.validateUser(e)}
                >
                  Login
                </Button>
              </section>
              <section >
                <DisplayUsers
                  userList={this.props.todoList}
                  validateUserOnClick={this.validateUserOnClick}
                />
              </section>
            {this.redirectToApp()}
      </section>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
