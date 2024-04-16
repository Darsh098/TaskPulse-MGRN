import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, IconButton, Tab, Tabs } from '@mui/material';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import EditOutlined from '@mui/icons-material/EditOutlined';
import CheckCircleOutlineOutlined from '@mui/icons-material/CheckCircleOutlineOutlined';

const TaskList = ({ tasks }) => {
  const [activeTab, setActiveTab] = useState('created'); // 'created' or 'shared'
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

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box m={5} p={3} bgcolor="white" boxShadow={15} borderRadius={8}>
      <Typography variant="h5" gutterBottom>
        Task List
      </Typography>
      <Box display="flex" justifyContent="center">
        <Tabs value={activeTab} onChange={handleChangeTab}>
          <Tab value="created" label="Created By You" />
          <Tab value="shared" label="Shared By You" />
        </Tabs>
      </Box>
      {tasks.length === 0 ? (
        <Typography variant="body1">No tasks found.</Typography>
      ) : (
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
      )}
    </Box>
  );
};

export default TaskList;


  

  // const filteredTasks = activeTab === 'created'
  //   ? tasks.filter(task => task.createdByYou)
  //   : tasks.filter(task => !task.createdByYou);


//       {filteredTasks.length === 0 ? (
//         <Typography variant="body1">No tasks found.</Typography>
//       ) : (
//         <List>
//           {filteredTasks.map((task, index) => (
//             <React.Fragment key={index}>
//               <ListItem>
//                 <ListItemText
//                   primary={task.title}
//                   secondary={task.description}
//                 />
//                 <IconButton onClick={() => handleCompleteTask(task.id)}>
//                   <CheckCircleOutlineOutlined />
//                 </IconButton>
//                 <IconButton onClick={() => handleEditTask(task.id)}>
//                   <EditOutlined />
//                 </IconButton>
//                 <IconButton onClick={() => handleDeleteTask(task.id)}>
//                   <DeleteOutline />
//                 </IconButton>
//               </ListItem>
//               {index < filteredTasks.length - 1 && <Divider />}
//             </React.Fragment>
//           ))}
//         </List>
//       )}
//     </Box>
//   );
// };
