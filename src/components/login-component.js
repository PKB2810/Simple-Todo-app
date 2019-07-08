import React from "react";
import { Input, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from "reactstrap";
import {setCurrentUser} from "../redux/action-creators";
import { Redirect } from "react-router-dom";
import DisplayUsers from "./view-user-list-component";
import TextComponent from "./text-component";

const mapStateToProps = state => {
  return {
    todoList: state.todoList,
    currentUser:state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser : (userName) => dispatch(setCurrentUser(userName))
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
      this.props.setCurrentUser(this.state.userName);
      localStorage.setItem("currentUser", this.state.userName);

      this.setState({ redirect: true,noUserName:false });
    }else{
        this.setState({noUserName:true});

    }
  };

  //validateUserOnClick() called to login from DisplayUserList
  validateUserOnClick = e => {
    e.preventDefault();
    e.persist();
    if (e.target.innerHTML !== "") {
      this.props.setCurrentUser(e.target.innerHTML);
      this.setState({userName: e.target.innerHTML},function(){
        localStorage.setItem("currentUser", e.target.innerHTML);
      
        this.setState({ redirect: true,noUserName:false });
      });
     
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
    if (this.state.redirect){


      return (
        <Redirect
          to={{
            pathname: "/app",
            state: {userName:this.state.userName}
          }}
        />
      )
    }
     ;
  };
  render() {
    if(this.state.noUserName){

      throw new Error("User Id field cannot be blank.Please enter User Id! ");

    }
    return (
      
        <div>
        <Form>
          <FormGroup>
            
            <Row>
              <hr />
            </Row>
            <Row>
              <Col className="col-12 offset-1 col-sm-1">
                <label for="userId"><TextComponent className="textStlye" textSize="md">UserId:</TextComponent></label>
              </Col>
              <Col className=" col-12 col-sm-5">
                <Input
                  value={this.state.userName}
                  onChange={e => this.setUserName(e)}
                  onKeyDown={e => this.setKeyData(e)}
                  name="userId"
                  id="userId"
                />
                {this.renderAutoSuggestion()}
              </Col>
              <Col className=" col-12 col-sm-1 pt-1">
                <button
                  
                  type="submit"
                  onClick={e => this.validateUser(e)}
                >
                 
                    Login
                
                </button>
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
