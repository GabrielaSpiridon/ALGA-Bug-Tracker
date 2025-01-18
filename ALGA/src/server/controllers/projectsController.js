import {
    getUserProjects,
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
  } from '../models/projectsModel.js';
  
  
export async function getProjectsByUserId(req, res) {
  const { id } = req.params;

  try {

    // Call the model function to get the projects
    const projects = await getUserProjects(id);

    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: 'No projects found for the given user' });
    }

    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
//TODO GetUserBugs

  
  //________________________________________
  
  export async function getProjects(req, res) {
    try {
      const projects = await getAllProjects();
      res.json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  
  export async function getSingleProject(req, res) {
    const { id } = req.params;
    try {
      const project = await getProjectById(id);
      if (!project) {
        return res.status(404).send('Project not found');
      }
      res.json(project);
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  
  export async function createNewProject(req, res) {
    const { project_name, repository_link } = req.body;
    if (!project_name || !repository_link) {
      return res.status(400).send('Missing parameters');
    }
  
    try {
      const insertId = await createProject(project_name, repository_link);
      if (insertId) {
        res.json({ id: Number(insertId), project_name, repository_link });
      } else {
        res.status(500).send('Unable to create project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  
  export async function updateExistingProject(req, res) {
    const { id } = req.params;
    const { project_name, repository_link } = req.body;
  
    if (!project_name || !repository_link) {
      return res.status(400).send('Missing parameters');
    }
  
    try {
      const success = await updateProject(id, project_name, repository_link);
      if (success) {
        res.json({ id, project_name, repository_link });
      } else {
        res.status(404).send('Project not found or not updated');
      }
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  
  export async function removeProject(req, res) {
    const { id } = req.params;
    try {
      const success = await deleteProject(id);
      if (success) {
        res.sendStatus(204); // No Content
      } else {
        res.status(404).send('Project not found');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      res.status(500).send('Internal Server Error');
    }




  }
  