import React, { useState, useEffect } from 'react';
import HBox from './HBox';
import playSound from '../utils/soundPlayer';
import { useRef } from 'react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const LOCAL_STORAGE_KEY = 'tasks';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState('');

  const hasLoaded = useRef(false);

  useEffect(() => {
    if (!hasLoaded.current) {
      hasLoaded.current = true;
      const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedTasks) {
        try {
          const parsedTasks = JSON.parse(savedTasks);
          if (Array.isArray(parsedTasks)) {
            setTasks(parsedTasks);
          }
        } catch (error) {
          console.error("Error parsing tasks from local storage", error);
        }
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskTitle.trim()) {
      const newTask = { id: Date.now(), title: taskTitle, completed: false };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTaskTitle('');
      playSound('add-task', false);
    }
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          const isNowCompleted = !task.completed;
          if (isNowCompleted) {
            playSound('task-completed', true);
          }
          return { ...task, completed: isNowCompleted };
        }
        return task;
      })
    );
  };

  const deleteTask = (id: number) => {
    playSound('delete-task', false);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
  }

  const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
    return (
      <label className="cozy-checkbox-label">
        <input type="checkbox" className="cozy-checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span className="checkbox-box"></span>
        {label}
      </label>
    );
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.3rem' }}>
      <h3>Task List</h3>
      <div id="tasksContainer" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "auto",
      }}>
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <HBox gap={1}>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Add a new task"
              className="cozy-input"
            />
            <button className="cozy-btn" onClick={addTask}>Add</button>
          </HBox>

          <ul id="taskList">
            {tasks.map((task) => (
              <li id="listItem" key={task.id}>
                <HBox justify="space-between">
                  <Checkbox label={task.title} checked={task.completed} onChange={() => toggleTaskCompletion(task.id)} />
                  <button className="cozy-btn delete-btn" onClick={() => deleteTask(task.id)} title="Remove Task">
                    <img src="/assets/trash-icon-2.png" alt="Trash" style={{ width: '20px', height: '27px' }} />
                  </button>
                </HBox>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
