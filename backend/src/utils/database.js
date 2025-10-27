const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      console.log('⚠️  MONGODB_URI not set, skipping database connection');
      return;
    }
    
    // Ensure the URI is properly formatted
    let formattedURI = mongoURI;
    if (!formattedURI.includes('retryWrites=true')) {
      formattedURI += (formattedURI.includes('?') ? '&' : '?') + 'retryWrites=true&w=majority';
    }
    
    const conn = await mongoose.connect(formattedURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`📦 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      console.log('⚠️  Continuing without database connection in development');
    }
  }
};

module.exports = connectDB;
