import React, { useEffect, useState } from 'react'
import { Typography, Container, Paper, Grid } from "@mui/material";
import { sendRequest } from '../../services/api';

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        sendRequest('users/all')
            .then((res) => {
                setUsers(res);
            })
            .catch((e) => console.error(e))
    }, []);

    return (
        <Container maxWidth="sm">
            <Typography variant="h2" gutterBottom>
                Users List
            </Typography>
            <Grid
                container
                spacing={1}
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '220px' }}
            >
                {users.map((user, index) => (
                    <Grid item xs={6} key={index}>
                        <Paper sx={{ p: 2 }} spacing={2}>
                            <Typography variant="subtitle1" gutterBottom>
                                Name: {user.name}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                E-mail: {user.email}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default UsersList