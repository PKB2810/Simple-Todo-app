import React, { Component, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Input } from "reactstrap";
import { COMPLETED } from "../globalConstants";

class EditTask extends React.Component {
  constructor(props) {
    super(props);
    this.textBoxItem = React.createRef();
    this.state = { value: this.props.task.task }; //get task name from parent
  }
  updateTextbox = e => {
    e.persist();
    console.log(e.target.value);
    this.setState({ value: e.target.value });
  };

  retainOldTaskName = e => {
    console.log(this.props.task.task);
    this.setState({ value: this.props.task.task }, () => {
      //since setState() is async we call toggleTexbox after value is assigned
      this.props.toggleTextbox();
    });
  };

  componentDidMount() {
    //console.log("inside unmount");
    this.textBoxItem.current.focus();
  }
  componentWillUnmount() {
    //console.log("inside unmount");
    this.props.updateTodo(this.props.task, this.state.value, this.props.todo);
  }

  render() {
    const currentTaskName = this.state.value;
    return (
      <input
        id="editTextbox"
        type="text"
        ref={this.textBoxItem}
        value={currentTaskName}
        onChange={e => this.updateTextbox(e)}
        onBlur={e => this.retainOldTaskName(e)}
        onKeyDown={e => {
          if (e.key === "Enter") {
            if (this.state.value.trim() === "") {
              this.setState({ value: this.props.task.task }, () => {
                //since setState() is async we call toggleTexbox after value is assigned
                this.props.toggleTextbox();
              });
            } else {
              this.props.toggleTextbox();
            }
          }
        }}
      />
    );
  }
}
class ListTodo extends Component {
  constructor(props) {
    super(props);
    this.state = { enableTextbox: false };
  }

  render() {
    if (Array.isArray(this.props.todo)) {
      const list = this.props.todo.filter(
        item =>
          item.status !== COMPLETED && item.userName === this.props.userName
      );
      const listOfTodo = list.map((item, index) => {
        return (
          <ListItemTodo
            item={item}
            index={index}
            updateTodo={this.props.updateTodo}
            todo={this.props.todo}
            changeToComplete={this.props.changeToComplete}
          />
        );
      });
      if (listOfTodo.length > 0) {
        return (
          <div>
            <h6 className="heading">Pending tasks</h6>
            <ListGroup className="listGrpStyle">{listOfTodo}</ListGroup>{" "}
          </div>
        );
      } else {
        return (
          <div>
            {" "}
            <h6 className="heading">Pending tasks</h6> No pending
            tasks...enjoy!!
          </div>
        );
      }
    }
    return <div />;
  }
}

class ListItemTodo extends Component {
  constructor(props) {
    super(props);
    this.state = { enableTextbox: false };
  }
  toggleTextbox = () => {
    this.setState({ enableTextbox: !this.state.enableTextbox });
  };

  render() {
    const listItem = (
      <ListGroupItem
        key={this.props.index}
        onClick={e => {
          e.stopPropagation();
          //console.log(textToggle);
          //textToggle = !textToggle;
          this.toggleTextbox();
        }}
      >
        <div>
          {this.state.enableTextbox === true ? (
            <EditTask
              task={this.props.item}
              updateTextbox={this.updateTextbox}
              updateTodo={this.props.updateTodo}
              todo={this.props.todo}
              toggleTextbox={this.toggleTextbox}
            />
          ) : (
            <div className="paddingToDiv">
              <Input
                className="marginToRadio"
                type="radio"
                color="success"
                onClick={() =>
                  this.props.changeToComplete(this.props.item, this.props.todo)
                }
              />
              <span>{this.props.item.task}</span>
            </div>
          )}
        </div>
      </ListGroupItem>
    );

    return <ListGroup>{listItem}</ListGroup>;
  }
}

export default ListTodo;
