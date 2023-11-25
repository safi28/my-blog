import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { sendRequest } from '../../services/api';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Typography } from '@mui/material';

const fallbackImage = 'https://www.daysoftheyear.com/wp-content/uploads/happy-cat-month-1.jpg';

const PostDetail = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const [post, setPost] = useState({});

  useEffect(() => {
    sendRequest(`posts/${postId}`, 'GET', null, {
      'Authorization': localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
    })
      .then((res) => setPost(res))
      .catch((e) => console.error(e))
  }, []);

  const deletePost = () => {
    sendRequest(`posts/${postId}`, 'DELETE', null, {
      'Authorization': localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)
    })
      .then((res) => {
        navigate('/posts')
      })
      .catch((e) => console.error(e))
  }

  return (
    <Container maxWidth="sm" sx={{ p: 8, borderRadius: 3, mt: 6 }}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image={post.imageUrl || fallbackImage}
            alt={post.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.about}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={deletePost}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </Container>
  )
}
export default PostDetail;