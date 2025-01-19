import { Router } from 'express';
import {
  createNewProjectCtrl,
  insertUsersIntoProjectCtrl,
  getUserProjectsCtrl,
  getAllProjectsCtrl,
  getAllUsersCtrl
} from '../controllers/projectsController.js';

const router = Router();

//get all the users
router.get('/getAllUsers', (req, res, next) => {
  console.log('Route hit via router: /getAllUsers');
  next();
}, getAllUsersCtrl);

// Create a new project
//http://localhost:3000/projects/create
router.post('/create', (req, res, next) => {
  console.log('Route hit via router: /create');
  next();
}, createNewProjectCtrl);


//insert user into project
router.post('/insertUserIntoProject', (req, res, next) => {
  console.log('Route hit via router: /insertUserIntoProject');
  next();
}, insertUsersIntoProjectCtrl);


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
