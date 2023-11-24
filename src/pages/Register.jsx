import React, { useState } from 'react'
import { TextField, Container, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../services/auth'

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const signUp = async (e) => {
    e.preventDefault();
    await authenticateUser(email, password).then((res) => {
      navigate('/login')
    }).catch((e) => {
      setErrorMessage(e)
    })
  }

  return (
    <>
      <Container maxWidth="sm">
        <form onSubmit={signUp}>
          <h2>Register Form</h2>
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
            fullWidth
            sx={{ mb: 3 }}
          />
          <Button variant="outlined" color="secondary" type="submit">Sign up</Button>
        </form>
      </Container>
    </>
  )
}

export default Register