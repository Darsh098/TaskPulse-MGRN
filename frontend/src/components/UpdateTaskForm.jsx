import React, { useState } from "react";
import { TextField, Button, Box, Typography, Grid } from "@mui/material";
import ShareTaskDialog from "./ShareTaskDialog";

const UpdateTaskForm = ({ editTask, setEditTask, onUpdate }) => {
  const [title, setTitle] = useState(editTask.title);
  const [description, setDescription] = useState(editTask.description);
  const [openDialog, setOpenDialog] = useState(false);
  const [emails, setEmails] = useState([]);

  const handleUpdateTask = () => {
    onUpdate(editTask.id, title, description, emails);
    handleCancel();
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleShareEmail = (email) => {
    setEmails([...emails, email]);
    handleCloseDialog();
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setEmails([]);
    setEditTask(null);
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
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleOpenDialog}
          >
            Share Task
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateTask}
            fullWidth
            disabled={title === ""}
          >
            Update Task
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
      <ShareTaskDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onShareEmail={handleShareEmail}
      />
    </Box>
  );
};

export default UpdateTaskForm;
