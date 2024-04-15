import React from 'react';
import { Button } from '@mui/material';

const Login = () => {
  const handleLogin = () => {
    //TODO: Implement logic for Gmail authentication
    console.log('Logging in with Gmail');
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login with Gmail
      </Button>
    </div>
  );
};

export default Login;
