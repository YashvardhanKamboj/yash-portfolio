import express from 'express';
import Visitor from '../models/Visitor.js';

const router = express.Router();

// Helper to detect device type
const detectDevice = (userAgent) => {
  if (!userAgent) return 'unknown';
  const ua = userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'tablet';
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return 'mobile';
  return 'desktop';
};

// Helper to extract browser
const detectBrowser = (userAgent) => {
  if (!userAgent) return 'unknown';
  const ua = userAgent.toLowerCase();
  if (ua.includes('chrome')) return 'Chrome';
  if (ua.includes('firefox')) return 'Firefox';
  if (ua.includes('safari') && !ua.includes('chrome')) return 'Safari';
  if (ua.includes('edge')) return 'Edge';
  if (ua.includes('opera')) return 'Opera';
  return 'Other';
};

// Helper to extract OS
const detectOS = (userAgent) => {
  if (!userAgent) return 'unknown';
  const ua = userAgent.toLowerCase();
  if (ua.includes('windows')) return 'Windows';
  if (ua.includes('mac')) return 'macOS';
  if (ua.includes('linux')) return 'Linux';
  if (ua.includes('android')) return 'Android';
  if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) return 'iOS';
  return 'Other';
};

// Track visitor
router.post('/track', async (req, res) => {
  try {
    const ipAddress = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for']?.split(',')[0] || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';
    const { referrer, page = '/', sessionId, duration } = req.body;

    // Check if this is a returning visitor
    const existingVisitor = await Visitor.findOne({ ipAddress }).sort({ createdAt: -1 });
    const isReturning = !!existingVisitor;

    const visitor = await Visitor.create({
      ipAddress,
      userAgent,
      referrer: referrer || req.headers.referer || null,
      device: detectDevice(userAgent),
      browser: detectBrowser(userAgent),
      os: detectOS(userAgent),
      page,
      sessionId: sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      duration: duration || 0,
      isReturning,
    });

    res.json({
      success: true,
      sessionId: visitor.sessionId,
    });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to track visitor',
    });
  }
});

// Get analytics summary (admin only - add auth in production)
router.get('/summary', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const dateFilter = {};
    
    if (startDate || endDate) {
      dateFilter.createdAt = {};
      if (startDate) dateFilter.createdAt.$gte = new Date(startDate);
      if (endDate) dateFilter.createdAt.$lte = new Date(endDate);
    }

    const [
      totalVisitors,
      uniqueVisitors,
      returningVisitors,
      newVisitors,
      deviceStats,
      browserStats,
      osStats,
      pageStats,
      recentVisitors,
    ] = await Promise.all([
      Visitor.countDocuments(dateFilter),
      Visitor.distinct('ipAddress', dateFilter).then(ips => ips.length),
      Visitor.countDocuments({ ...dateFilter, isReturning: true }),
      Visitor.countDocuments({ ...dateFilter, isReturning: false }),
      Visitor.aggregate([
        { $match: dateFilter },
        { $group: { _id: '$device', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Visitor.aggregate([
        { $match: dateFilter },
        { $group: { _id: '$browser', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Visitor.aggregate([
        { $match: dateFilter },
        { $group: { _id: '$os', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Visitor.aggregate([
        { $match: dateFilter },
        { $group: { _id: '$page', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
      Visitor.find(dateFilter)
        .sort({ createdAt: -1 })
        .limit(10)
        .select('ipAddress device browser os page createdAt'),
    ]);

    res.json({
      success: true,
      data: {
        overview: {
          totalVisitors,
          uniqueVisitors,
          returningVisitors,
          newVisitors,
        },
        devices: deviceStats,
        browsers: browserStats,
        operatingSystems: osStats,
        topPages: pageStats,
        recentVisitors,
      },
    });
  } catch (error) {
    console.error('Analytics summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics',
    });
  }
});

// Get visitor stats by date range
router.get('/stats', async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const stats = await Visitor.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
          unique: { $addToSet: '$ipAddress' },
        },
      },
      {
        $project: {
          date: '$_id',
          visits: '$count',
          uniqueVisitors: { $size: '$unique' },
        },
      },
      { $sort: { date: 1 } },
    ]);

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stats',
    });
  }
});

export default router;

