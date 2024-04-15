import React from 'react';
import CreateTaskForm from './components/CreateTaskFrom';
import TaskList from './components/TaskList';
import UpdateTaskForm from './components/UpdateTaskForm'

function App() {

  
  const tasks = [
    { id: 1, title: 'Task 1', description: 'Description for Task 1' },
    { id: 2, title: 'Task 2', description: 'Description for Task 2' },
    { id: 3, title: 'Task 3', description: 'Description for Task 3' },
  ];

  const handleCreateTask = (title, description) => {
    console.log('Creating task:', { title, description });
  };

  const handleUpdateTask = (taskId, title, description) => {
    console.log('Updating task:', taskId, title, description);
  };

  
  return (
    <div>
      <CreateTaskForm onCreate={handleCreateTask} />
      {/* <UpdateTaskForm task={tasks[0]} onUpdate={handleUpdateTask} /> */}
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
