import React, { useState } from 'react'
import { TextField, Container, Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { sendRequest } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const signIn = (e) => {
    e.preventDefault();
    sendRequest('auth/login', 'POST', { email, password })
      .then(({ token }) => {
        setErrorMessage('')
        localStorage.setItem(process.env.REACT_APP_TOKEN_NAME, token)
        login()
        navigate('/posts')
      })
      .catch((e) => setErrorMessage(e.message))
  }

  return (
    <>
      <Container maxWidth="sm" sx={{ p: 8, bgcolor: '#cfe8fc', borderRadius: 3, mt: 12 }}>
        {isAuthenticated ? <Typography variant="h2" gutterBottom>
          You are already logged in.
        </Typography> : (
          <form onSubmit={signIn}>
            <Typography variant="h2" gutterBottom>
              Login Form
            </Typography>
            <TextField
              label="Email"
              onChange={e => setEmail(e.target.value)}
              required
              variant="outlined"
              color="secondary"
              type="email"
              sx={{ mb: 3 }}
              fullWidth
              value={email}
              error={errorMessage}
              helperText={errorMessage}
            />
            <TextField
              label="Password"
              onChange={e => setPassword(e.target.value)}
              required
              variant="outlined"
              color="secondary"
              type="password"
              value={password}
              error={errorMessage}
              helperText={errorMessage}
              fullWidth
              sx={{ mb: 3 }}
            />
            <Button variant="outlined" color="secondary" type="submit">Sign in</Button>
          </form>
        )}
      </Container>
    </>
  )
}

export default Register