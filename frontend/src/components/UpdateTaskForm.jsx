import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import ShareTaskDialog from './ShareTaskDialog'; // Import the ShareTaskDialog component

const UpdateTaskForm = ({ task, onUpdate }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog visibility

  const handleUpdateTask = () => {
    onUpdate(task.id, title, description);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleShareTask = (email) => {
    console.log('Sharing task with email:', email);
    handleCloseDialog();
  };

  return (
    <Box m={5} p={3} bgcolor="white" boxShadow={15} borderRadius={8}>
      <Typography variant="h5" gutterBottom>
        Update Task
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Button variant="outlined" color="primary" fullWidth onClick={handleOpenDialog}>
            Share Task
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateTask}
            fullWidth
          >
            Update Task
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="outlined" color="primary" fullWidth>
            Cancel
          </Button>
        </Grid>
      </Grid>
      <ShareTaskDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onShare={handleShareTask}
      />
    </Box>
  );
};

export default UpdateTaskForm;
