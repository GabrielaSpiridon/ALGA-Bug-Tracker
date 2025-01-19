import { Router } from 'express';
import {
  createNewProjectCtrl,
  insertUsersIntoProjectsCtrl,
  getUserProjectsCtrl,
  getAllProjectsCtrl
} from '../controllers/projectsController.js';

const router = Router();


// Create a new project
router.post('/create', (req, res, next) => {
  console.log('Route hit via router: /create');
  next();
}, createNewProjectCtrl);


//insert user into project
router.post('/insertUserIntoProject', (req, res, next) => {
  console.log('Route hit via router: /insertUserIntoProject');
  next();
}, insertUsersIntoProjectsCtrl);


//get projects from user id
router.get('/getProjectsByUser/:id', (req, res, next) => {
  console.log('Route hit via router: /getProjectsByUser/:id');
  next();
}, getUserProjectsCtrl);

//get all projects
router.get('/getAllProjects', (req, res, next) => {
  console.log('Route hit via router: /getAllProjects');
  next();
}, getAllProjectsCtrl);

export default router;
