import express from 'express';
import { body, validationResult } from 'express-validator';
import BlogPost from '../models/BlogPost.js';

const router = express.Router();

// Get all published blog posts
router.get('/', async (req, res) => {
  try {
    const { status = 'published', limit = 20, page = 1, tag, category } = req.query;
    const query = { status };
    
    if (tag) {
      query.tags = { $in: [tag] };
    }
    if (category) {
      query.category = category;
    }

    const posts = await BlogPost.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .select('-content -__v');

    const total = await BlogPost.countDocuments(query);

    res.json({
      success: true,
      data: posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get blog posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog posts',
    });
  }
});

// Get single blog post by slug
router.get('/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ 
      slug: req.params.slug,
      status: 'published',
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    // Increment views
    post.views += 1;
    await post.save();

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error('Get blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog post',
    });
  }
});

// Create blog post (admin only)
router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('excerpt').trim().notEmpty().withMessage('Excerpt is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
    body('tags').optional().isArray(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const postData = {
        ...req.body,
        publishedAt: req.body.status === 'published' ? new Date() : null,
      };

      const post = await BlogPost.create(postData);

      res.status(201).json({
        success: true,
        data: post,
      });
    } catch (error) {
      console.error('Create blog post error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create blog post',
      });
    }
  }
);

// Update blog post (admin only)
router.patch('/:id', async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // Update publishedAt if status changed to published
    if (updateData.status === 'published' && !updateData.publishedAt) {
      const existing = await BlogPost.findById(req.params.id);
      if (existing && existing.status !== 'published') {
        updateData.publishedAt = new Date();
      }
    }

    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error('Update blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update blog post',
    });
  }
});

// Delete blog post (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    res.json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error) {
    console.error('Delete blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete blog post',
    });
  }
});

// Get blog tags
router.get('/tags/list', async (req, res) => {
  try {
    const tags = await BlogPost.distinct('tags', { status: 'published' });
    res.json({
      success: true,
      data: tags.filter(Boolean).sort(),
    });
  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tags',
    });
  }
});

export default router;

