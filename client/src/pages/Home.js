import React, { useState, useEffect } from "react";
import {
  Task as TaskAPI,
  User as UserAPI 
} from '../api/api';
import TaskCard from "../components/TaskCard";
import styled from "styled-components";

function Home() {

  const user = JSON.parse(sessionStorage.getItem("User"));

  const [state, setState] = useState({
    tasks: []
  });
  console.log("state:", state);

  useEffect(() => {
    TaskAPI.getAll()
      .then(tasks => {
        TaskAPI.getByUser(user.id)
          .then(customerTasks => tasks.map(task => {
            task.customerTask = customerTasks.filter(ct => ct.taskid === ""+task.id)[0];
            return task;
          }))
          .then(taskList => {
            setState({
              ...state,
              tasks: taskList,
            });
          })
      });
  }, [user.id]);

  function handleAccepted(taskId) {
    console.log("accepted");
    TaskAPI.start(taskId, user.id)
      .then((resp) => {
        const customerTask = resp.data;
        setState({
          ...state,
          tasks: state.tasks.map(task => {
            if (task.id === taskId) {
              task.customerTask = customerTask;
            }
            return task;
          })
        })
      });
  }

  function handleCompleted(customerTaskId) {
    console.log("completed");
    TaskAPI.complete(customerTaskId)
      .then((resp) => {
        const customerTask = resp.data;
        setState({
          ...state,
          tasks: state.tasks.map(task => {
            if (task.customerTask && task.customerTask.id === customerTaskId) {
              task.customerTask = customerTask;
            }
            return task;
          })
        })
      });
  }

  return (
    <div className="App">
      <h1>Home Page</h1>

      <StyledUl>
        {state.tasks.map(task => (
          <li style={style_li} key={task.id}>
            <TaskCard
              id={task.id} title={task.name} description={task.description} difficulty={task.difficulty}
              customerTaskId={task.customerTask && task.customerTask.id}
              status={task.customerTask && task.customerTask.status}
              handleAccepted={handleAccepted} handleFinished={handleCompleted} />
          </li>
        ))}
      </StyledUl>
    </div>
  );
}

const StyledUl = styled.ul`
  padding: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const style_li = {
  listStyle: "none",
}

export default Home;
