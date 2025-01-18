import { Router } from 'express';
import {
  getProjectsByUserId,
  // getProjects,
  // getSingleProject,
  createNewProject,
  // updateExistingProject,
  // removeProject,
  insertUsersProjects,
} from '../controllers/projectsController.js';

const router = Router();

//router.get('/user/:id', getProjectByUserId);

//
//
router.post('/insertUser', (req, res, next) => {
  console.log('Route hit via router: /insertUser');
  next();
}, insertUsersProjects);


// Adding a logging middleware to check for the specific route
//http://localhost:3000/projects/getProjectsByUser/1
router.get('/getProjectsByUser/:id', (req, res, next) => {
  console.log('Route hit via router: /getProjectsByUser/:id');
  next();
}, getProjectsByUserId);

// Adding a logging middleware to check for the specific route
router.post('/create', (req, res, next) => {
  console.log('Route hit via router: /create');
  next();
}, createNewProject);

// router.get('/', getProjects);
// router.get('/:id', getSingleProject);
//router.post('/', createNewProject);
//// router.put('/:id', updateExistingProject);
// router.delete('/:id', removeProject);

// Ensure there is a default export
export default router;
