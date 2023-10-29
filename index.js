const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const port = process.env.PORT;

mongoose.connect(process.env.mongoUrl);

// Middleware
app.use(bodyParser.json());

// Import controllers
const blogController = require('./controllers/blog');
const commentController = require('./controllers/comment');

// Define routes
app.post('/api/', blogController.createBlog);
app.get('/api/blogs/:blogId', blogController.getBlog);
app.get('/api/blogs', blogController.getAllBlogs);

app.post('/api/blogs/:blogId', commentController.addComment);
app.get('/api/blogs/:blogId/comments', commentController.getComments);

app.put('/api/blogs/:blogId/likes', blogController.incrementLikes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
