import React, { useState } from 'react'
import { TextField, Container, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { sendRequest } from '../services/api';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const signIn = async (e) => {
    e.preventDefault();
    sendRequest('auth/login', 'POST', { email, password })
      .then(({ token }) => {
        setErrorMessage('')
        localStorage.setItem('MY_TOKEN', token)
      })
      .catch((e) => setErrorMessage(e.message))
  }

  return (
    <>
      <Container maxWidth="sm">
        <form onSubmit={signIn}>
          <h2>Login Form</h2>
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
      </Container>
    </>
  )
}

export default Register