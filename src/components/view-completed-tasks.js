import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { COMPLETED } from "../globalConstants";

function ViewCompletedTasks({ userName, todo }) {
  const curUserComplTasks = todo.filter(
    task => task.userName === userName && task.status === COMPLETED
  );

  const curUserComplTaskList = curUserComplTasks.map((task, index) => {
    return <ListGroupItem key={index}>{task.task}</ListGroupItem>;
  });

  if (curUserComplTasks.length > 0) {
    return (
      <div>
        <h6 className="heading"> Completed Tasks </h6>
        <ListGroup className="listGrpStyle">
          <span>{curUserComplTaskList}</span>
        </ListGroup>
      </div>
    );
  }
  return <div />;
}

export default ViewCompletedTasks;
