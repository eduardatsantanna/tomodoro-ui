import React, { useState } from 'react';
import HBox from './HBox';
import playSound from '../utils/soundPlayer';

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
      playSound('add-task', false);
    }
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          const isNowCompleted = !task.completed; // Check if it's being completed now
  
          if (isNowCompleted) {
            playSound('task-completed', true); // Play sound when marking as completed
          }
  
          return { ...task, completed: isNowCompleted };
        }
        return task;
      })
    );
  };  

  interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
  }

  const [isChecked, setIsChecked] = useState(false);

  const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
    return (
      <label className="cozy-checkbox-label">
        <input type="checkbox" className="cozy-checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}
        />
        <span className="checkbox-box"></span>
        {label}
      </label>
    );
  };

  const deleteTask = (id: number) => {
    playSound('delete-task', false);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
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
      }}
      >
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <HBox gap={1}>
            <input type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder="Add a new task" className="cozy-input" />
            <button className="cozy-btn" onClick={addTask}>Add</button>
          </HBox>

          <ul id="taskList">
            {tasks.map((task) => (
              <li id="listItem" key={task.id}>
                <HBox justify="space-between">
                  <Checkbox label={task.title} checked={task.completed} onChange={() => toggleTaskCompletion(task.id)}
                  />
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
