import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import EditOutlined from '@mui/icons-material/EditOutlined';
import CheckCircleOutlineOutlined from '@mui/icons-material/CheckCircleOutlineOutlined';

const TaskList = ({ tasks }) => {
  const handleCompleteTask = (taskId) => {
    // TODO: Implement logic to mark task as complete
    console.log('Marking task as complete:', taskId);
  };

  const handleEditTask = (taskId) => {
    // TODO: Implement logic to edit task
    console.log('Editing task:', taskId);
  };

  const handleDeleteTask = (taskId) => {
    // TODO: Implement logic to delete task
    console.log('Deleting task:', taskId);
  };

  return (
    <Box m={5} p={3} bgcolor="white" boxShadow={15} borderRadius={8}>
      <Typography variant="h5" gutterBottom>
        Task List
      </Typography>
      <List>
        {tasks.map((task, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={task.title}
                secondary={task.description}
              />
              <IconButton onClick={() => handleCompleteTask(task.id)}>
                <CheckCircleOutlineOutlined />
              </IconButton>
              <IconButton onClick={() => handleEditTask(task.id)}>
                <EditOutlined />
              </IconButton>
              <IconButton onClick={() => handleDeleteTask(task.id)}>
                <DeleteOutline />
              </IconButton>
            </ListItem>
            {index < tasks.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default TaskList;