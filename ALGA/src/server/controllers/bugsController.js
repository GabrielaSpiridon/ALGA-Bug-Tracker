import {
    getUserBugs,
    getAllBugsData,
    getBugById,
    createBug,
    updateBug,
    deleteBug,
    verifySolverAssignedToBug,
    updateStatusAssignedBug,
    updateStatusBug,
    getProjectBugs
  } from '../models/bugsModel.js';

  // Get all bugs for a specific user
  export async function getProjectBugsById(req, res) {
    const { id } = req.params;
  
    try {
      // Call the model function to get the bugs
      const bugs = await getProjectBugs(id);
  
      if (!bugs || bugs.length === 0) {
        return res.status(404).json({ message: 'No bugs found for the given user' });
      }
  
      res.json(bugs);
    } catch (error) {
      console.error('Error fetching user bugs:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // Get all bugs for a specific user
  export async function getUserBugsById(req, res) {
    const { id } = req.params;
  
    try {
      // Call the model function to get the bugs
      const bugs = await getUserBugs(id);
  
      if (!bugs || bugs.length === 0) {
        return res.status(404).json({ message: 'No bugs found for the given user' });
      }
  
      res.json(bugs);
    } catch (error) {
      console.error('Error fetching user bugs:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  
  // Get all bugs
  export async function getAllBugs(req, res) {
    try {
      const bugs = await getAllBugsData();
      res.json(bugs);
    } catch (error) {
      console.error('Error fetching all bugs:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  
  // Get a single bug by ID
  export async function getSingleBug(req, res) {
    const { id } = req.params;
    try {
      const bug = await getBugById(id);
      if (!bug) {
        return res.status(404).send('Bug not found');
      }
      res.json(bug);
    } catch (error) {
      console.error('Error fetching bug:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  
  // Create a new bug
  export async function createNewBug(req, res) {
    const { 
      id_project, 
      commit_link, 
      severity_level, 
      solve_priority, 
      bug_description, 
      solution_status, 
      id_user_reporter 
    } = req.body;
  
    // Validare completă a parametrilor
    if (!id_project || !commit_link || !severity_level || !solve_priority || !bug_description || !solution_status || !id_user_reporter) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
  
    try {
      // Creare bug folosind modelul
      const insertId = await createBug(
        id_project,
        commit_link,
        severity_level,
        solve_priority,
        bug_description,
        solution_status,
        null, // id_commit_report_bug nu este necesar aici
        id_user_reporter
      );
  
      if (insertId) {
        // Răspuns de succes
        res.status(201).json({
          id: Number(insertId),
          id_project,
          commit_link,
          severity_level,
          solve_priority,
          bug_description,
          solution_status,
          id_user_reporter,
        });
      } else {
        // Eroare dacă bug-ul nu a fost creat
        res.status(500).json({ error: 'Unable to create bug' });
      }
    } catch (error) {
      // Mesaj de eroare detaliat pentru debugging
      console.error('Error creating bug:', error.message);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  }  
  
  // Update an existing bug
  export async function updateExistingBug(req, res) {
    const { id } = req.params;
    const { severity_level, solve_priority, bug_description, solution_status, id_commit_report_bug, id_commit_resolve_bug } = req.body;
  
    if (!severity_level || !solve_priority || !bug_description || !solution_status) {
      return res.status(400).send('Missing parameters');
    }
  
    try {
      const success = await updateBug(
        id,
        severity_level,
        solve_priority,
        bug_description,
        solution_status,
        id_commit_report_bug,
        id_commit_resolve_bug
      );
      if (success) {
        res.json({
          id,
          severity_level,
          solve_priority,
          bug_description,
          solution_status,
          id_commit_report_bug,
          id_commit_resolve_bug,
        });
      } else {
        res.status(404).send('Bug not found or not updated');
      }
    } catch (error) {
      console.error('Error updating bug:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  
  // Delete a bug
  export async function removeBug(req, res) {
    const { id } = req.params;
    try {
      const success = await deleteBug(id);
      if (success) {
        res.sendStatus(204); // No Content
      } else {
        res.status(404).send('Bug not found');
      }
    } catch (error) {
      console.error('Error deleting bug:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  // Verify solver 
  export async function verifySolverAssignedCtrl(req, res) {
    try {
      const { id } = req.params; 
      const bugs = await verifySolverAssignedToBug(id);
      res.json({ count: bugs }); 
    } catch (error) {
      console.error('Error fetching verifySolverAssigned:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  
  // Update an existing bug
  export async function updateStatusAssignedBugCtrl(req, res) {

   
    const { id_bug, id_user_solver } = req.body;
    console.error(`updateStatusAssignedBugCtrl: ${id_bug}, ${id_user_solver}`);
    //const {id_user_solver } = req.body;
  
    if (!id_user_solver) {
      return res.status(400).send('Missing parameters');
    }
  
    try {
      const success = await updateStatusAssignedBug(
        id_bug,
        id_user_solver
      );
      if (success) {
        res.json({
          id_bug,
          id_user_solver
        });
      } else {
        res.status(404).send('Bug not found or not updated');
      }
    } catch (error) {
      console.error('Error updating bug:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  // Update the status bug - solved
  export async function updateStatusBugCtrl(req, res) {
    const {id_bug,id_project,solution_status,link_commit_resolve_bug } = req.body;
  
    if (!id_bug || !id_project || !solution_status || !link_commit_resolve_bug) {
      return res.status(400).send('Missing required parameters');
    }    
  
    try {
      const success = await updateStatusBug(
        id_bug,
        id_project,
        solution_status,
        link_commit_resolve_bug
      );
      if (success) {
        res.json({
           id_bug,
        id_project,
        solution_status,
        link_commit_resolve_bug
        });
      } else {
        res.status(404).send('Bug not found or not updated');
      }
    } catch (error) {
      console.error('Error updating bug:', error);
      res.status(500).send('Internal Server Error');
    }
  }