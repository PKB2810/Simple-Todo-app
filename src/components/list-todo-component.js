import React, { Component, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Button } from "reactstrap";
import { COMPLETED } from "../globalConstants";

class EditTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.task.task }; //get task name from parent
  }
  updateTextbox = e => {
    e.persist();
    console.log(e.target.value);
    this.setState({ value: e.target.value });
  };

  componentWillUnmount() {
    //console.log("inside unmount");
    this.props.updateTodo(this.props.task, this.state.value);
  }

  render() {
    const currentTaskName = this.state.value;
    return (
      <input
        id="editTextbox"
        type="text"
        value={currentTaskName}
        onChange={e => this.updateTextbox(e)}
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
            changeToComplete={this.props.changeToComplete}
          />
        );
      });

      return <ListGroup>{listOfTodo}</ListGroup>;
    }
    return <div> </div>;
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
      <ListGroupItem key={this.props.index}>
        <div>
          <span>{this.props.item.id + " "}</span>

          {this.state.enableTextbox === true ? (
            <EditTask
              task={this.props.item}
              updateTextbox={this.updateTextbox}
              updateTodo={this.props.updateTodo}
              toggleTextbox={this.toggleTextbox}
            />
          ) : (
            <span
              onClick={e => {
                //console.log(textToggle);
                //textToggle = !textToggle;
                this.toggleTextbox();
                e.stopPropagation();
              }}
            >
              {this.props.item.task}
            </span>
          )}
          <span> {" " + "status: " + this.props.item.status + " "} </span>
        </div>
        <Button
          color="success"
          onClick={() => this.props.changeToComplete(this.props.item)}
        >
          Mark as Complete
        </Button>
      </ListGroupItem>
    );

    return <ListGroup>{listItem}</ListGroup>;
  }
}

export default ListTodo;
