import express from 'express';
import cors from 'cors';

import authRouter from './routes/auth.js';
import { getProjectsByUserId } from './controllers/projectsController.js';

const app = express();

app.use(cors());
app.use(express.json());

// Middleware to log all requests
app.use((req, res, next) => {
  console.log(`Your request : ${req.method} ${req.url}`);
  next();
});

// Test route
//http://localhost:3000/test
app.get('/test', (req, res) => {
  console.log('Test route hit');
  res.send('Test route works');
});

// Route to get projects by user ID
//http://localhost:3000/projects/user/2
app.get('/projects/user/:id', (req, res) => {
  console.log('Route hit: /projects/user/:id');
  getProjectsByUserId(req, res);
});

// Mount auth routes
app.use('/auth', authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
