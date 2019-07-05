import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import TextComponent from "./text-component";
import { COMPLETED } from "../globalConstants";

function ViewCompletedTasks({ userName, todo }) {
  const curUserComplTasks = todo.filter(
    task => task.userName === userName && task.status === COMPLETED
  );

  const curUserComplTaskList = curUserComplTasks.map((task, index) => {
    return <ListGroupItem key={index}> <TextComponent textSize="sm">{task.task}</TextComponent></ListGroupItem>;
  });

  if (curUserComplTasks.length > 0) {
    return (
      <div>
       <TextComponent className="textStlye" textSize="md">Completed Task</TextComponent>
        <ListGroup className="listGrpStyle">
          <span>{curUserComplTaskList}</span>
          
        </ListGroup>
      </div>
    );
  }
  return <div />;
}

export default ViewCompletedTasks;
