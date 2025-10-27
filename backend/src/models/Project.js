const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    enum: ['component', 'style', 'config', 'other'],
    default: 'other',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
});

const projectSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  files: [fileSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String,
    default: 'anonymous',
  },
}, {
  timestamps: true,
});

// Index for better query performance
projectSchema.index({ id: 1 });
projectSchema.index({ userId: 1 });
projectSchema.index({ lastModified: -1 });

// Update lastModified when files change
projectSchema.pre('save', function(next) {
  if (this.isModified('files')) {
    this.lastModified = new Date();
  }
  next();
});

module.exports = mongoose.model('Project', projectSchema);
