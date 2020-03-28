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

  
  function handleCompleteTask() {
    TaskAPI.complete(1, user.id)
      .then((resp) => console.dir(resp))
      .catch((err) => console.dir(err));
  }

  return (
    <div>
      <h1>API Tests</h1>

      <button onClick={handleCompleteTask}>Complete task</button>

      <h2>Started tasks</h2>
      <ul>
        {startedTasks.map(task => (
          <li key={task.id}>
            <h3>{task.name}</h3>
            <p>{task.description}</p>
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
          </li>
        ))}
      </ul>
    </div>
  )
}

