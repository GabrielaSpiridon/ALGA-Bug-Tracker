//npm install express
//npm install cors


import express from 'express';
import cors  from 'cors';

import authRouter from './routes/auth.js';
import projectsRouter from './routes/projectsRouter.js';
import bugsRouter from './routes/bugsRouter.js';


const app = express();

app.use(cors());
app.use(express.json());

// Middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Test route
app.get('/test', (req, res) => {
  console.log('Test route hit');
  res.send('Test route works');
});

app.use('/auth', authRouter);
app.use('/projects', projectsRouter);
app.use('/bugs', bugsRouter);


// Additional routes can be mounted here as needed, e.g.:
// app.use('/bugs', bugsRoutes);
// app.use('/reports', reportsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
