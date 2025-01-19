import { Router } from 'express';
import {
  getUserBugsById,
  getAllBugs,
  getSingleBug,
  createNewBug,
  updateExistingBug,
  removeBug,
  verifySolverAssignedCtrl,
  updateStatusAssignedBugCtrl,
  updateStatusBugCtrl,
  getProjectBugsById
} from '../controllers/bugsController.js';

const router = Router();

// Logging middleware for debugging specific routes
router.use((req, res, next) => {
  console.log(`Route hit: ${req.method} ${req.url}`);
  next();
});

// Route to get bugs by user ID
router.get('/user/:id', (req, res, next) => {
  console.log('Route hit via router: /user/:id');
  next();
}, getUserBugsById);

// Route to get bugs by project ID
//http://localhost:3000/bugs/getProjectBugsById/1
router.get('/getProjectBugsById/:id', (req, res, next) => {
  console.log('Route hit via router: /getProjectBugsById/:id');
  next();
}, getProjectBugsById);

// Route to get all bugs
//http://localhost:3000/bugs/getallbugs
router.get('/getallbugs', (req, res, next) => {
    console.log('Route hit via router: getallbugs');
    next();
  }, getAllBugs);

// Route to get all bugs
//router.get('/getallbugs', getAllBugs);

// Route to get a single bug by ID
//http://localhost:3000/bugs/getSingleBug/1
router.get('/getSingleBug/:id', getSingleBug);

// Route to create a new bug
//http://localhost:3000/bugs/createNewBug
router.post('/create', createNewBug);

// Route to update an existing bug by ID
//http://localhost:3000/bugs/updateExistingBug/9
router.put('/updateExistingBug/:id', updateExistingBug);

// Route to delete a bug by ID
// /http://localhost:3000/bugs/removeBug/10
router.delete('/removeBug/:id', removeBug);

// Route to verify by ID if a user is assigned to a bug 
//http://localhost:3000/bugs/verifySolverAssignedCtrl/2
router.get('/verifySolverAssignedCtrl/:id', verifySolverAssignedCtrl);

// Route to update the solver id for a bug
//http://localhost:3000/bugs/updateStatusAssignedBugCtrl/
router.put('/updateStatusAssignedBugCtrl', updateStatusAssignedBugCtrl);

// Route to update the status bug - solved
router.put('/updateStatusBugCtrl/:id', updateStatusBugCtrl);


// Ensure there is a default export
export default router;
