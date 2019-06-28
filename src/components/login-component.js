import React from "react";
import { Input, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { connect } from "react-redux";
import { verifyUser } from "../redux/actionCreators";

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
    this.state = { userName: "", password: "", redirect: false };
  }

  setUserName = e => {
    this.setState({ userName: e.target.value });
  };

  setPassword = e => {
    this.setState({ password: e.target.value });
  };

  validateUser = e => {
    if (this.state.userName.trim() !== "") {
      localStorage.setItem("currentUser", this.state.userName);

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
                />
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
                <DisplayUsers userList={this.props.todoList} />
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
