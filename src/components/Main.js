import React, { useState, useEffect } from "react";
import ListTodo from "./list-todo-component";
import { connect } from "react-redux";
import { addTodo, completedTodo, updateTodo } from "../redux/actionCreators";
import { PENDING } from "../globalConstants";
import { Button, Form, FormGroup, Input, Row, Col } from "reactstrap";

const mapStateToProps = state => {
  return {
    todoList: state.todoList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo: todo => dispatch(addTodo(todo)),
    completedTodo: todo => dispatch(completedTodo(todo)),
    updateTodo: (todo, updatedTask) => dispatch(updateTodo(todo, updatedTask))
  };
};

function Main({ userName, todoList, addTodo, completedTodo, updateTodo }) {
  /* constructor(props) {
    super(props);

    this.addTodo = this.addTodo.bind(this);
    this.state = { value: "" };
  } */

  const [value, setValue] = useState(localStorage.getItem("value") || " ");

  useEffect(() => {
    localStorage.setItem("value", value); //whenever value is changed store in localStorage
  }, [value]);

  const textboxChangeHandler = e => {
    console.log(e.target);
    setValue(e.target.value);
  };
  const addTask = e => {
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
      addTodo(todo);
      setValue("");
    }
  };
  const completeTask = item => {
    completedTodo(item);
  };
  const updateTask = (item, updatedtask) => {
    updateTodo(item, updatedtask);
  };

  return (
    <div>
      <h1 id="heading"> Todo App</h1>
      <Form>
        <FormGroup>
          <Row>
            <Col className=" offset-2 col-12 col-sm-1">
              <span className="textStlye">Todo:</span>
            </Col>
            <Col className=" col-12 col-sm-6">
              <Input value={value} onChange={textboxChangeHandler} />
            </Col>
            <Col className="col-12 col-sm-3">
              <Button
                type="submit"
                color="primary"
                onClick={e => addTask(e)}
                value="Add"
              >
                Add
              </Button>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col className="offset-3 col-sm-6">
              <ListTodo
                userName={localStorage.getItem("currentUser")}
                todo={todoList}
                changeToComplete={completeTask}
                textboxChangeHandler={textboxChangeHandler}
                updateTodo={updateTask}
              />
            </Col>
          </Row>
        </FormGroup>
      </Form>
    </div>
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
