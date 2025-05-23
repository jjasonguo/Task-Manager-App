import React, { createContext, useContext, useState } from 'react';
import { Task } from '../types/task';

interface TaskContextType {
  tasks: Task[];
  points: number;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [points, setPoints] = useState(0);

  const addTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(), // Use timestamp as unique ID
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    const taskToToggle = tasks.find(task => task.id === id);
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    
    // Update points: +1 for completion
    if (taskToToggle) {
      setPoints(points + (!taskToToggle.completed ? 1 : -1));
    }
    
    setTasks(newTasks);
  };

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      points,
      addTask, 
      updateTask, 
      deleteTask, 
      toggleTaskCompletion 
    }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the task context
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};