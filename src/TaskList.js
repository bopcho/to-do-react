import React, { useState } from 'react';
import './styles.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');

  const handleInputChange = event => {
    setNewTaskText(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!newTaskText) return; // if input is empty, do nothing
    addTask(newTaskText);
    setNewTaskText(''); // clear the input field
  };

  const addTask = taskText => {
    const newTask = {
      id: Math.random().toString(),
      text: taskText,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompletion = taskId => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = taskId => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  return (
    <div>
      <form id="add-task-form" onSubmit={handleSubmit}>
        <input
          id="new-task-input"
          type="text"
          value={newTaskText}
          onChange={handleInputChange}
        />
        <button type="submit">Add Task</button>
      </form>
      <ul id="task-list">
        {tasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
