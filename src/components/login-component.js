import React from "react";
import { Input, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { connect } from "react-redux";
import { verifyUser } from "../redux/actionCreators";
import { ListGroup, ListGroupItem } from "reactstrap";

import { Redirect } from "react-router-dom";
import DisplayUsers from "./view-user-list-component";

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
      keyPressedCount: 0,
      keyCode: 0,
      currSuggInd: 0,
      currSugg: "",
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

  /*  setUserNameFromAutoSuggestion = e => {
    this.setState({
      userName: e.target.innerHTML
    });
  };
 */
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

  validateUser = e => {
    e.preventDefault();
    if (this.state.userName.trim() !== "") {
      localStorage.setItem("currentUser", this.state.userName);

      this.setState({ redirect: true });
    }
  };

  validateUserOnClick = e => {
    e.preventDefault();
    if (e.target.innerHTML !== "") {
      localStorage.setItem("currentUser", e.target.innerHTML);

      this.setState({ redirect: true });
    }
    /*  e.preventDefault();
    const userObj = {
      userName: this.state.userName,
      password: this.state.password
    };
    this.props.verifyUser(userObj);
    if (
      this.props.currentUser &&
      this.props.currentUser.userName.trim() !== "" &&
      this.props.currentUser.password.trim() !== ""
    ) {
      console.log(this.props.todoList);
      console.log("user verified");
      this.setState({ redirect: true });
    } */
  };
  renderAutoSuggestion = () => {
    if (this.state.displayAutoSuggestionBox === true) {
      if (this.state.userName.trim() !== "") {
        //extract those names which start with text in textbox
        /*  const extractedUserList = this.props.todoList.filter(user =>
          user.userName.trim().startsWith(this.state.userName)
        );
        //remove duplicates
        const userSet = Array.from(
          new Set(
            extractedUserList.map(user => {
              return user.userName;
            })
          )
        );
 */
        const listOfUsers = this.state.userList.map((user, index) => {
          let className = "";
          if (index === this.state.currSuggInd) {
            className = "active-suggestion";
          }
          return (
            <ListGroupItem
              className={className}
              key={index}
              onClick={
                e => {
                  console.log("event is" + e);
                  this.setUserName(e);
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
            <ListGroup className=" autoSuggestionPositioningClass suggestionsList">
              {listOfUsers}
            </ListGroup>
          );
        }
        return null;
      }
    }

    return null;

    /* return (
        <AutoSuggestion
          searchText={this.state.userName}
          userList={this.props.todoList}
          setUserNameFromAutoSuggestion={this.setUserNameFromAutoSuggestion}
          currSuggInd={this.state.currSuggInd}
        />
      ); */
  };
  setKeyData = e => {
    if (e.keyCode === 38) {
      if (this.state.currSuggInd === 0) {
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
        currSuggInd: 0,
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
    return (
      <div>
        <Form>
          <FormGroup>
            <Row>
              <Col className="offset-5 col-sm-2">
                <h1 className="heading"> Todo App</h1>
              </Col>
            </Row>
            <Row>
              <hr />
            </Row>
            <Row>
              <Col className="col-12 offset-1 col-sm-1">
                <span className="textStlye">UserId:</span>
              </Col>
              <Col className=" col-12 col-sm-5">
                <Input
                  value={this.state.userName}
                  onChange={e => this.setUserName(e)}
                  onKeyDown={e => this.setKeyData(e)}
                />
                {this.renderAutoSuggestion()}
              </Col>
              <Col className=" col-12 col-sm-1 pt-1">
                <Button
                  color="primary"
                  type="submit"
                  onClick={e => this.validateUser(e)}
                >
                  Login
                </Button>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col className=" col-12 offset-2 col-sm-5 pt-1">
                <DisplayUsers
                  userList={this.props.todoList}
                  validateUserOnClick={this.validateUserOnClick}
                />
              </Col>
            </Row>
          </FormGroup>
          {this.redirectToApp()}
        </Form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
