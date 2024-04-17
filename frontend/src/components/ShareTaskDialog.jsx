import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Chip,
} from "@mui/material";

const ShareTaskDialog = ({
  open,
  onClose,
  onShareEmail,
  emails,
  setEmails,
}) => {
  const [email, setEmail] = useState("");

  const handleShare = () => {
    onShareEmail(email);
    setEmail("");
  };

  const handleRemoveEmail = (emailToRemove) => {
    const updatedEmails = emails.filter((e) => e !== emailToRemove);
    setEmails(updatedEmails);
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
        {emails.map((e, index) => (
          <div>
            <Chip
              key={index}
              label={e}
              onDelete={() => handleRemoveEmail(e)}
              style={{ marginRight: "0.5rem", marginBottom: "0.5rem" }}
            />
          </div>
        ))}
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
