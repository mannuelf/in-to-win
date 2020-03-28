import React, { useState, useEffect } from 'react';
import { Task as TaskAPI } from '../api/api';

export default function APITest() {

  const user = JSON.parse(sessionStorage.getItem("User"));

  const [allTasks, setAllTasks] = useState([]);
  useEffect(() => {
    TaskAPI.getAll(user.id)
      .then(setAllTasks);
  }, []);

  const [startedTasks, setStartedTasks] = useState([]);
  useEffect(() => {
    TaskAPI.getStartedByUser(user.id)
      .then(setStartedTasks);
  }, []);

  const [completedTasks, setCompletedTasks] = useState([]);
  useEffect(() => {
    TaskAPI.getCompletedByUser(user.id)
      .then(setCompletedTasks);
  }, []);

  function handleCompleteTask(event, userId, taskId) {
    event.preventDefault();

    TaskAPI.complete(taskId, userId, event.target.image.files[0])
      .then((resp) => console.dir("response: ", resp))
      .catch((err) => console.dir("error: ", err));
  }
  
  function handleStartTask(event, userId, taskId) {
    TaskAPI.start(taskId, userId)
      .then((resp) => console.dir("response: ", resp))
      .catch((err) => console.dir("error: ", err));
  }

  return (
    <div>
      <h1>API Tests</h1>

      <h2>Started tasks</h2>
      <ul>
        {startedTasks.map(task => (
          <li key={task.id}>
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <form onSubmit={(e) => handleCompleteTask(e, task.id, user.id)}>
              <input type="file" name="image" />
              <button type="submit">Complete task</button>
            </form>
          </li>
        ))}
      </ul>
      <h2>Completed tasks</h2>
      <ul>
        {completedTasks.map(task => (
          <li key={task.id}>
            <h3>{task.name}</h3>
            <p>{task.description}</p>
          </li>
        ))}
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

