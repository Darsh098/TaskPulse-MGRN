import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

const ShareTaskDialog = ({ open, onClose, onShareEmail }) => {
  const [email, setEmail] = useState('');

  const handleShare = () => {
    onShareEmail(email);
    setEmail('');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Share Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Email Address"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleShare} color="primary">
          Share
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShareTaskDialog;
