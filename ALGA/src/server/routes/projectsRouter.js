import { Router } from 'express';
import {
  getProjectsByUserId,
  // getProjects,
  // getSingleProject,
  // createNewProject,
  // updateExistingProject,
  // removeProject,
} from '../controllers/projectsController.js';

const router = Router();

//router.get('/user/:id', getProjectByUserId);

// Adding a logging middleware to check for the specific route
router.get('/user/:id', (req, res, next) => {
  console.log('Route hit via router: /user/:id');
  next();
}, getProjectsByUserId);


// router.get('/', getProjects);
// router.get('/:id', getSingleProject);
// router.post('/', createNewProject);
// router.put('/:id', updateExistingProject);
// router.delete('/:id', removeProject);

// Ensure there is a default export
export default router;
