import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },
  longDescription: {
    type: String,
    trim: true,
    maxlength: [2000, 'Long description cannot exceed 2000 characters'],
  },
  tags: [{
    type: String,
    trim: true,
  }],
  technologies: [{
    type: String,
    trim: true,
  }],
  githubUrl: {
    type: String,
    default: null,
    match: [/^https?:\/\/.+/, 'Please provide a valid URL'],
  },
  liveUrl: {
    type: String,
    default: null,
    match: [/^https?:\/\/.+/, 'Please provide a valid URL'],
  },
  imageUrl: {
    type: String,
    default: null,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Indexes
projectSchema.index({ status: 1, featured: -1, order: 1 });
projectSchema.index({ createdAt: -1 });

const Project = mongoose.model('Project', projectSchema);

export default Project;

