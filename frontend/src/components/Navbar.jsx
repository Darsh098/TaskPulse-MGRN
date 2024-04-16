import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Navbar = () => {

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TaskPulse
        </Typography>
        <SignedOut>
        <SignInButton >
        <Button color="inherit">
          Login
        </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
