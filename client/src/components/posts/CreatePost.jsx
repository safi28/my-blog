import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Container, TextField, Typography } from '@mui/material'
import { sendRequest } from '../../services/api';

const CreatePost = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const createPost = (e) => {
        e.preventDefault();
        sendRequest('posts/create', 'POST', { title, about, imageUrl }, {
            'Authorization': localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
        })
            .then((res) => {
                navigate('/posts')
            })
            .catch((e) => console.error(e))
    }

    return (
        <Container maxWidth="sm" sx={{ p: 8, bgcolor: '#cfe8fc', borderRadius: 3, mt: 12 }}>
            <Typography variant="h2" gutterBottom>
                Create Post
            </Typography>
            <form onSubmit={createPost}>
                <TextField
                    label="Title"
                    onChange={e => setTitle(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{ mb: 3 }}
                    fullWidth
                    value={title}
                // error={errorMessage}
                />
                <TextField
                    label="About"
                    onChange={e => setAbout(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={about}
                    // error={errorMessage}
                    fullWidth
                    sx={{ mb: 3 }}
                />
                <TextField
                    label="Image URL"
                    onChange={e => setImageUrl(e.target.value)}
                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={imageUrl}
                    // error={errorMessage}
                    fullWidth
                    sx={{ mb: 3 }}
                />
                <Button variant="outlined" color="secondary" type="submit">Create</Button>
            </form>
        </Container>
    )
}

export default CreatePost