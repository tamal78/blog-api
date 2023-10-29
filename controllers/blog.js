const Blog = require('../model/blog');
const Author = require('../model/author');

// controllers/blogController.js

// Create a new blog post
exports.createBlog = async (req, res) => {
  try {
    const { title, content, authorName, authorEmail } = req.body;

    let author;

    if (authorEmail) {
      author = await Author.findOne({ email: authorEmail });
    }

    if (!author) {
      author = new Author({ fullName: authorName, email: authorEmail });
      await author.save();
    }

    const blog = new Blog({ title, content, author: author._id });
    await blog.save();

    await blog.populate('author');

    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId).populate('author');

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    blog.views += 1;
    await blog.save();

    res.status(200).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author');

    res.status(200).json(blogs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.incrementLikes = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Increment the likes count
    blog.likes += 1;
    await blog.save();

    res.status(200).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
