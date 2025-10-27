# CipherStudio Deployment Guide

This guide will help you deploy CipherStudio to production using Vercel (frontend) and Render (backend).

## 🚀 Quick Deployment

### 1. Frontend Deployment (Vercel)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial CipherStudio setup"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Select your repository
   - Set Root Directory to `frontend`
   - Add Environment Variable:
     - `REACT_APP_API_URL` = `https://your-backend-url.onrender.com`
   - Click "Deploy"

### 2. Backend Deployment (Render)

1. **Deploy to Render**
   - Go to [render.com](https://render.com)
   - Sign in with GitHub
   - Click "New +" → "Web Service"
   - Select your repository
   - Configure:
     - **Name**: `cipherstudio-backend`
     - **Root Directory**: `backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
   - Add Environment Variables:
     - `NODE_ENV` = `production`
     - `MONGODB_URI` = `your_mongodb_atlas_connection_string`
     - `FRONTEND_URL` = `https://your-frontend-domain.vercel.app`
   - Click "Create Web Service"

### 3. Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/atlas](https://mongodb.com/atlas)
   - Sign up for free account
   - Create a new cluster (free tier)

2. **Configure Database**
   - Create database user
   - Whitelist IP addresses (0.0.0.0/0 for Render)
   - Get connection string
   - Update `MONGODB_URI` in Render environment variables

## 🔧 Environment Variables

### Frontend (Vercel)
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

### Backend (Render)
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cipherstudio
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

## 📋 Pre-deployment Checklist

- [ ] All dependencies installed
- [ ] Environment variables configured
- [ ] MongoDB Atlas cluster created
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Render service created
- [ ] Environment variables set in both platforms
- [ ] Health check endpoint working (`/health`)

## 🧪 Testing Deployment

1. **Test Backend**
   ```bash
   curl https://your-backend-url.onrender.com/health
   ```

2. **Test Frontend**
   - Visit your Vercel URL
   - Create a new project
   - Test file creation and editing
   - Test save/load functionality

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure `FRONTEND_URL` is set correctly in backend
   - Check that frontend URL matches exactly

2. **Database Connection Issues**
   - Verify MongoDB Atlas cluster is running
   - Check IP whitelist includes Render IPs
   - Verify connection string format

3. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Check build logs for specific errors

4. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names match exactly
   - Restart services after adding variables

## 📊 Monitoring

### Vercel Analytics
- Built-in analytics for frontend performance
- Real-time visitor tracking
- Performance metrics

### Render Monitoring
- Built-in logs and metrics
- Uptime monitoring
- Performance insights

### MongoDB Atlas
- Database performance metrics
- Connection monitoring
- Storage usage tracking

## 🔄 Continuous Deployment

Both Vercel and Render support automatic deployments:
- Push to `main` branch triggers deployment
- Preview deployments for pull requests
- Rollback capabilities

## 🎯 Production Optimizations

1. **Frontend**
   - Enable compression
   - Optimize images
   - Use CDN for static assets
   - Implement caching strategies

2. **Backend**
   - Enable compression middleware
   - Implement rate limiting
   - Add request logging
   - Set up monitoring alerts

3. **Database**
   - Create proper indexes
   - Monitor query performance
   - Set up backup schedules
   - Implement connection pooling

## 📞 Support

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints manually
4. Check MongoDB Atlas status
5. Review Vercel/Render documentation

## 🎉 Success!

Once deployed, you'll have:
- ✅ Production-ready React IDE
- ✅ Scalable backend API
- ✅ Persistent data storage
- ✅ Automatic deployments
- ✅ Professional monitoring

Your CipherStudio IDE is now live and ready for users! 🚀
