const Comment = require('../model/comment');
const Blog = require('../model/blog');
const Author = require('../model/author');

exports.addComment = async (req, res) => {
  try {
    const { text, userName } = req.body;
    const blogId = req.params.blogId;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Create a new comment with the given user name
    const comment = new Comment({ text, blog: blog._id, user: userName });
    await comment.save();
    await comment.populate('blog');
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const comments = await Comment.find({ blog: blogId });

    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
