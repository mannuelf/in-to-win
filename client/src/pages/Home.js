import React, { useState, useEffect } from "react";
import {
  Task as TaskAPI,
  User as UserAPI 
} from '../api/api';
import TaskCard from "../components/TaskCard";

function Home() {

  const user = JSON.parse(sessionStorage.getItem("User"));

  const [state, setState] = useState({
    tasks: []
  });
  useEffect(() => {
    TaskAPI.getAll(user.id)
      .then(allTasks => {
        setState({
          ...state,
          tasks: allTasks,
        })
      });
  }, [user.id]);

  return (
    <div className="App">
      <h1>Home Page</h1>

      <ul>
        {state.tasks.map(task => (
          <li key={task.id}>
            <TaskCard title={task.name} description={task.description} difficulty={task.difficulty} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
