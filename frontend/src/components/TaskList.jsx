import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Tab,
  Tabs,
} from "@mui/material";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import EditOutlined from "@mui/icons-material/EditOutlined";
import CheckCircleOutlineOutlined from "@mui/icons-material/CheckCircleOutlineOutlined";
import { useMutation } from "@apollo/client";
import { MARK_TASK_AS_COMPLETE, DELETE_TASK } from "../graphql/mutation";
import client from "../client";

const TaskList = ({
  tasks,
  setTasks,
  activeTab,
  setActiveTab,
  setEditTask,
}) => {
  const [markTaskAsComplete] = useMutation(MARK_TASK_AS_COMPLETE, { client });
  const [deleteTask] = useMutation(DELETE_TASK, { client });

  const handleCompleteTask = async (taskId) => {
    try {
      await markTaskAsComplete({
        variables: {
          taskId: taskId,
        },
      });
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error marking task as complete:", error);
    }
  };

  const handleEditTask = (task) => {
    setEditTask(task);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask({
        variables: {
          taskId: taskId,
        },
      });
      // Update the tasks array to remove the deleted task
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
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
          <Tab value="shared" label="Shared With You" />
        </Tabs>
      </Box>
      {tasks.length === 0 ? (
        <Typography variant="body1">No tasks found.</Typography>
      ) : (
        <List>
          {tasks.map((task, index) => (
            <React.Fragment key={index}>
              <ListItem
                style={{
                  backgroundColor: task.completed ? "#f0f0f0" : "transparent", // Change background color for completed tasks
                  textDecoration: task.completed ? "none" : "none", // Remove text decoration for completed tasks
                }}
              >
                <ListItemText
                  primary={task.title}
                  secondary={task.description}
                  style={{ color: task.completed ? "#888" : "#000" }} // Change text color for completed tasks
                />
                <IconButton
                  onClick={() => handleCompleteTask(task.id)}
                  disabled={task.completed} // Disable the button if the task is already completed
                >
                  {task.completed ? (
                    <CheckCircleOutlineOutlined style={{ color: "#4caf50" }} />
                  ) : (
                    <CheckCircleOutlineOutlined />
                  )}
                </IconButton>
                <IconButton
                  onClick={() => handleEditTask(task)}
                  disabled={task.completed} // Disable the button if the task is already completed
                >
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
