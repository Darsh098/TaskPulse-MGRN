import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

const ShareTaskDialog = ({ open, onClose, onShare }) => {
  const [email, setEmail] = useState('');

  const handleShareTask = () => {
    onShare(email);
    setEmail('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Share Task</DialogTitle>
      <DialogContent>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleShareTask} color="primary">
          Share
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShareTaskDialog;
