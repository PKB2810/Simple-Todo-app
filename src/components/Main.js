import React, { useState, useEffect } from "react";
import ListTodo from "./list-todo-component";
import { connect } from "react-redux";
import { addTodo, completedTodo, updateTodo } from "../redux/actionCreators";
import { PENDING } from "../globalConstants";
import { Button, Form, FormGroup, Input, Row, Col } from "reactstrap";
import ViewCompletedTasks from "./view-completed-tasks";
import { Redirect } from "react-router-dom";

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

function Main({ userName, todoList, addTodo, completedTodo, updateTodo }) {
  const [value, setValue] = useState(localStorage.getItem("value") || " ");
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    return () => setValue(""); //on unmount
  }, []);

  const textboxChangeHandler = e => {
    console.log(e.target);
    setValue(e.target.value);
  };
  const addTask = e => {
    //console.log(todoList);

    e.preventDefault();
    let count = localStorage.getItem("count")
      ? parseInt(localStorage.getItem("count")) + 1
      : 0;
    localStorage.setItem("count", count.toString());
    const todo = {
      userName: localStorage.getItem("currentUser"),
      id: count,
      task: value,
      status: PENDING
    };
    if (value.trim() !== "") {
      addTodo(todo, todoList);
      setValue("");
    }
  };
  const completeTask = (item, todoList) => {
    completedTodo(item, todoList);
  };
  const updateTask = (item, updatedtask, todoList) => {
    updateTodo(item, updatedtask, todoList);
  };

  const logout = e => {
    e.preventDefault();
    localStorage.setItem("currentUser", "");
    setRedirect(true);
  };
  const redirectToLogin = () => {
    if (redirect)
      return (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      );
  };

  return (
    <div>
      <Form>
        <FormGroup>
          <Row>
            <Col className="offset-5 col-sm-2">
              <h1 className="heading"> Todo App</h1>
            </Col>
            <Col className="paddingToLogoutBtn col-sm-2">
              <Button color="primary" type="button" onClick={logout}>
                Logout
              </Button>
            </Col>
            <Col className="paddingToText">
              <span className="textStlye">
                {" "}
                Current user:
                {" " + localStorage.getItem("currentUser")}
              </span>
            </Col>
          </Row>
          <Row>
            <hr />
          </Row>
          <Row>
            <Col className="col-12 offset-6 col-sm-3">
              <div className="textStlye">
                Welcome {localStorage.getItem("currentUser")} !!
              </div>
            </Col>
          </Row>
          <Row>
            <hr />
          </Row>
          <Row>
            <Col className="col-10 offset-1 col-sm-1">
              <span className="textStlye">Todo:</span>
            </Col>
            <Col className="col-12 col-sm-8">
              <Input value={value} onChange={textboxChangeHandler} />
            </Col>
            <Col className="col-12 col-sm-1">
              <Button
                type="submit"
                color="primary"
                onClick={e => addTask(e)}
                onKeyDown={e => addTask(e)}
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
            <Col className="col-sm-2 offset-2 col-sm-4">
              <ListTodo
                userName={localStorage.getItem("currentUser")}
                todo={todoList}
                changeToComplete={completeTask}
                textboxChangeHandler={textboxChangeHandler}
                updateTodo={updateTask}
              />
            </Col>
            <Col className="col-sm-2 col-sm-4">
              <ViewCompletedTasks
                userName={localStorage.getItem("currentUser")}
                todo={todoList}
              />
            </Col>
          </Row>
        </FormGroup>
      </Form>
      {redirectToLogin()}
    </div>
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
