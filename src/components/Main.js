import React, { useState, useEffect } from "react";
import ListTodo from "./list-todo-component";
import { connect } from "react-redux";
import { addTodo, completedTodo, updateTodo } from "../redux/actionCreators";
import { PENDING } from "../globalConstants";
import { Button, Form, FormGroup, Input, Row, Col } from "reactstrap";
import TextComponent from "./text-component";
import ViewCompletedTasks from "./view-completed-tasks";
import { Redirect } from "react-router-dom";

import MyContext from "../MyContext";

const mapStateToProps = state => {
  return {
    todoList: state.todoList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo: (todo, todoList) => dispatch(addTodo(todo, todoList)),
    completedTodo: (todo, todoList) => dispatch(completedTodo(todo, todoList)),
    updateTodo: (todo, updatedTask, todoList) =>
      dispatch(updateTodo(todo, updatedTask, todoList))
  };
};

class Main extends React.Component{
  
  constructor(props){
        super(props);
        this.state ={value :localStorage.getItem("value") || " " , redirect:false,userName:this.props.location.state.userName };


  }
  

  componentWillUnmount(){
        this.setState({value:"",userName:""});

  }

   textboxChangeHandler = e => {
    console.log(e.target);
    this.setState({value:e.target.value});
  };
   addTask = e => {
    e.preventDefault();
    let count = localStorage.getItem("count")
      ? parseInt(localStorage.getItem("count")) + 1
      : 0;
    localStorage.setItem("count", count.toString());
    const todo = {
      userName:this.state.userName,//localStorage.getItem("currentUser"),
      id: count,
      task: this.state.value,
      status: PENDING
    };
    if (this.state.value.trim() !== "") {
      this.props.addTodo(todo, this.props.todoList);
      this.setState({value:""});
    }
  };
   completeTask = (item, todoList) => {
    this.props.completedTodo(item, todoList);
  };
   updateTask = (item, updatedtask, todoList) => {
    this.props.updateTodo(item, updatedtask, todoList);
  };

   logout = e => {
    e.preventDefault();
    localStorage.setItem("currentUser", "");
    this.setState({userName:"",redirect:true});
  };
   redirectToLogin = () => {
    if (this.state.redirect)
      return (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      );
  };
  render(){
    return (
      <div>
        <Form>
          <FormGroup>
            <Row>
              <Col className="paddingToLogoutBtn col-xs-2 col-sm-2">
                <Button color="primary" type="button" onClick={this.logout}>
                  Logout
                </Button>
              </Col>
            </Row>
            <Row>
              <hr />
            </Row>
            <Row>
              <Col className="offset-6 col-3  col-sm-3">
                <TextComponent className="textStyle" textSize="md">  Welcome {this.state.userName} !!</TextComponent>
              </Col>
            </Row>
            <Row>
              <hr />
            </Row>
            <Row>
              <Col className="offset-1  col-xs-2 col-sm-1">
                <TextComponent className="textStyle" textSize="md">Todo:</TextComponent>
              </Col>
              <Col className="col-4 col-sm-8">
                <Input value={this.state.value} onChange={this.textboxChangeHandler} />
              </Col>
              <Col className="col-1 col-sm-1">
                <Button
                  type="submit"
                  color="primary"
                  onClick={e => this.addTask(e)}
                  onKeyDown={e => this.addTask(e)}
                  value="Add"
                >
                  Add
                </Button>
              </Col>
            </Row>
            <Row>
              <hr />
            </Row>
            <Row>
              <Col className="offset-xs-2 col-10 offset-sm-2 col-sm-4">
                <ListTodo
                  userName={this.state.userName}
                  todo={this.props.todoList}
                  changeToComplete={this.completeTask}
                  textboxChangeHandler={this.textboxChangeHandler}
                  updateTodo={this.updateTask}
                />
              </Col>
              <Col className=" offset-xs-2 col-10  col-sm-4">
                <ViewCompletedTasks
                  userName={this.state.userName}
                  todo={this.props.todoList}
                />
              </Col>
            </Row>
            <Row>
              <hr />
            </Row>
            <Row>
              <Col className=" offset-2 col-10   col-sm-4">
                <TextComponent className="textStyle" textSize="md">Change backgroundcolor to: </TextComponent>
                <MyContext.Consumer>
                  {context => (
                    <div>
                      <Button
                        color="primary"
                        style={{ marginLeft: "2px" }}
                        type="button"
                        onClick={e => {
                          context.handleBGChange(e);
                        }}
                      >
                        White
                      </Button>
  
                      <Button
                        color="primary"
                        style={{ marginLeft: "2px" }}
                        type="button"
                        onClick={e => {
                          context.handleBGChange(e);
                        }}
                      >
                        Yellow
                      </Button>
                    </div>
                  )}
                </MyContext.Consumer>
              </Col>
            </Row>
          </FormGroup>
        </Form>
        {this.redirectToLogin()}
      </div>
    );
  }
  
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
