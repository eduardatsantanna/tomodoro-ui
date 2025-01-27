import React, { useState } from 'react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState('');

  const addTask = () => {
    if (taskTitle.trim()) {
      setTasks([...tasks, { id: Date.now(), title: taskTitle, completed: false }]);
      setTaskTitle('');
    }
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h3>Task List</h3>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Add a new task"
        className="cozy-input"
      />
      <button className="cozy-btn" onClick={addTask}>Add</button>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
              marginBottom: '0.5rem',
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
              style={{ marginRight: '0.5rem' }}
            />
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
