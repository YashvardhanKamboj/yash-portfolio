import express from 'express';
import Contact from '../models/Contact.js';
import Visitor from '../models/Visitor.js';
import Project from '../models/Project.js';
import BlogPost from '../models/BlogPost.js';

const router = express.Router();

// Admin dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const [
      totalContacts,
      pendingContacts,
      totalVisitors,
      uniqueVisitors,
      totalProjects,
      publishedProjects,
      totalPosts,
      publishedPosts,
    ] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'pending' }),
      Visitor.countDocuments(),
      Visitor.distinct('ipAddress').then(ips => ips.length),
      Project.countDocuments(),
      Project.countDocuments({ status: 'published' }),
      BlogPost.countDocuments(),
      BlogPost.countDocuments({ status: 'published' }),
    ]);

    // Recent activity
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email subject status createdAt');

    const recentVisitors = await Visitor.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('ipAddress device browser page createdAt');

    res.json({
      success: true,
      data: {
        overview: {
          contacts: {
            total: totalContacts,
            pending: pendingContacts,
          },
          visitors: {
            total: totalVisitors,
            unique: uniqueVisitors,
          },
          projects: {
            total: totalProjects,
            published: publishedProjects,
          },
          blog: {
            total: totalPosts,
            published: publishedPosts,
          },
        },
        recent: {
          contacts: recentContacts,
          visitors: recentVisitors,
        },
      },
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data',
    });
  }
});

export default router;

