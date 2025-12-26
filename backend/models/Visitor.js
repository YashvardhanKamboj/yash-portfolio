import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  ipAddress: {
    type: String,
    required: true,
    index: true,
  },
  userAgent: {
    type: String,
    default: null,
  },
  referrer: {
    type: String,
    default: null,
  },
  country: {
    type: String,
    default: null,
  },
  city: {
    type: String,
    default: null,
  },
  device: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet', 'unknown'],
    default: 'unknown',
  },
  browser: {
    type: String,
    default: null,
  },
  os: {
    type: String,
    default: null,
  },
  page: {
    type: String,
    default: '/',
  },
  sessionId: {
    type: String,
    default: null,
  },
  duration: {
    type: Number, // in seconds
    default: 0,
  },
  isReturning: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Indexes for analytics queries
visitorSchema.index({ createdAt: -1 });
visitorSchema.index({ ipAddress: 1, createdAt: -1 });
visitorSchema.index({ sessionId: 1 });

const Visitor = mongoose.model('Visitor', visitorSchema);

export default Visitor;

