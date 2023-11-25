import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import { sendRequest } from '../../services/api';

const fallbackImage = 'https://www.daysoftheyear.com/wp-content/uploads/happy-cat-month-1.jpg';

const PostList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    sendRequest('posts/all')
      .then((res) => setPosts(res))
      .catch((e) => console.error(e))
  }, []);

  return (
    <Container>
      <Typography textAlign='center' variant="h2" gutterBottom>
        Posts
      </Typography>
      {posts.length ? (
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: '220px' }}
        >
          {posts.map((post, index) => (
            <Grid item xs={4} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={post.imageUrl || fallbackImage}
                    alt={post.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {post.title}
                    </Typography>
                    <Typography inputProps={{ maxLength: 12 }} variant="body2" color="text.secondary">
                      {post.about.length > 15 ? `${post.about.slice(0, 15)}...` : post.about}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" onClick={() => navigate(`/post-detail/${post._id}`)}>
                    Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography textAlign='center' variant="h3" gutterBottom>
          No posts to show...
        </Typography>
      )
      }
    </Container>
  )
}

export default PostList;

