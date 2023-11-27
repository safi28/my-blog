import React, { useState } from 'react'
import { TextField, Container, Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../services/auth'
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const signUp = async (e) => {
    e.preventDefault();
    await authenticateUser({ name, email, password }).then(() => {
      setErrorMessage('')
      navigate('/login')
    }).catch((e) => {
      setErrorMessage(e.message)
    })
  }

  return (
    <>
      <Container maxWidth="sm" sx={{ p: 8, bgcolor: '#cfe8fc', borderRadius: 3, mt: 12 }}>
        {isAuthenticated ? <Typography variant="h2" gutterBottom>
          You are already logged in.
        </Typography> : (
          <form onSubmit={signUp}>
            <Typography variant="h2" gutterBottom>
              Register Form
            </Typography>
            <TextField
              label="Name"
              onChange={e => setName(e.target.value)}
              required
              variant="outlined"
              color="secondary"
              type="text"
              sx={{ mb: 3 }}
              fullWidth
              value={name}
            />
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
            <Button variant="outlined" color="secondary" type="submit">Sign up</Button>
          </form>
        )}
      </Container>
    </>
  )
}

export default Register