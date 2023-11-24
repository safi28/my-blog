const express = require('express');
const Post = require('../models/post');
const authenticateUser = require('../middleware/auth');

const router = express.Router()

router.post('/create', authenticateUser, async (req, res) => {
  const data = new Post({
    title: req.body.title,
    about: req.body.about
  })

  try {
    const post = await data.save();
    res.status(200).json(post)
  }
  catch (error) {
    console.error('Error creating post:', error);
    res.status(400).json({ message: error.message })
  }
})

router.get('/all', async (_, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error('Error getting posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.delete('/:postId', authenticateUser, async (req, res) => {
  const { postId } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

module.exports = router;
