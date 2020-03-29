import React, { useState, useEffect } from 'react';
import {
  Task as TaskAPI,
  User as UserAPI 
} from '../api/api';

export default function APITest() {

  const user = JSON.parse(sessionStorage.getItem("User"));

  const [allTasks, setAllTasks] = useState([]);
  useEffect(() => {
    TaskAPI.getAll(user.id)
      .then(setAllTasks);
  }, [user.id]);

  const [startedTasks, setStartedTasks] = useState([]);
  useEffect(() => {
    TaskAPI.getStartedByUser(user.id)
      .then(setStartedTasks);
  }, [user.id]);

  const [completedTasks, setCompletedTasks] = useState([]);
  useEffect(() => {
    TaskAPI.getCompletedByUser(user.id)
      .then(setCompletedTasks);
  }, [user.id]);

  function handleCompleteTask(event, customerTaskId, taskPoints) {
    event.preventDefault();

    TaskAPI.complete(customerTaskId, event.target.image.files[0])
      .then((resp) => console.dir("response: ", resp))
      .catch((err) => console.dir("error: ", err));
    
    UserAPI.setPoints(user.id, user.points + taskPoints);
  }
  
  function handleStartTask(event, taskId, userId) {
    TaskAPI.start(taskId, userId)
      .then((resp) => console.dir("response: ", resp))
      .catch((err) => console.dir("error: ", err));
  }

  return (
    <div>
      <h1>API Tests</h1>

      <h2>Started tasks</h2>
      <ul>
        {
          startedTasks.map(custTask => {
            const task = custTask.task;
            return (
              <li key={task.id}>
                <h3>{task.name}</h3>
                <p>{task.description}</p>
                <form onSubmit={(e) => handleCompleteTask(e, custTask.id, task.points)}>
                  <input type="file" name="image" />
                  <button type="submit">Complete task</button>
                </form>
              </li>
            );
          })
        }
      </ul>
      <h2>Completed tasks</h2>
      <ul>
        {
          completedTasks.map(custTask => {
            const task = custTask.task;
            return (
              <li key={task.id}>
                <h3>{task.name}</h3>
                <p>{task.description}</p>
              </li>
            );
          })
        }
      </ul>
      <h2>All tasks</h2>
      <ul>
        {allTasks.map(task => (
          <li key={task.id}>
            <h3>{task.name}</h3>
            <p>{task.description}</p>

            <button onClick={(e) => handleStartTask(e, task.id, user.id)}>Start task</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

