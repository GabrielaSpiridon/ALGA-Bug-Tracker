import {
    createNewProject,
    insertUsersIntoProjects,
    getUserProjects,
    getAllProjects
  } from '../models/projectsModel.js';
  


//__________________ CREAZA UN PROIECT NOU______________________________________________

  export async function createNewProjectCtrl(req, res) {
    const { project_name, repository_link } = req.body;
    if (!project_name || !repository_link) {
      return res.status(400).send('Missing parameters');
    }
  
    try {
      const insertId = await createNewProject(project_name, repository_link);
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



//____________________ INSEREAZA IN TABELE UDER_PROJECTS __________________________________________________________________

    //http://localhost:3000/projects/insertUser
    //{
    //   "projectId": 1,
    //   "users": [
    //     { "userId": 1, "idRole": 1 },
    //     { "userId": 2, "idRole": 2 }
    //   ]
    // }

    export async function insertUsersIntoProjectsCtrl(req, res) {
      const { projectId, users } = req.body;
  
      if (!projectId || !Array.isArray(users) || users.length === 0) {
        return res.status(400).send('Missing parameters or invalid user list');
      }
    
      try {
        const insertResults = [];
        for (const user of users) {
          const { userId, idRole } = user;
          if (!userId || !idRole) {
            return res.status(400).send('Each user must have userId and idRole');
          }
          
          const insertId = await insertUsersIntoProjects(projectId, userId, idRole);
          insertResults.push({
            id: insertId.toString(),
            projectId: projectId.toString(),
            userId: userId.toString(),
            idRole: idRole.toString(),
          });
        }
    
        res.json({ success: true, users: insertResults });
      } catch (error) {
        console.error('Error creating users in project:', error);
        res.status(500).send('Internal Server Error');
      }
    }
  


//_________________________GET PROIECTELE USERULUI LOGAT___________________________________________
    //router.get('/user/:id', getProjectByUserId);
    //http://localhost:3000/projects/getProjectsByUser/1


export async function getUserProjectsCtrl(req, res) {
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

//_________________________GET TOATE PROIECTELE___________________________________________
    
    export async function getAllProjectsCtrl(req, res) {
    
      try {
    
        // Call the model function to get the projects
        const allProjects = await getAllProjects();
    
        if (!allProjects || allProjects.length === 0) {
          return res.status(404).json({ message: 'No projects found' });
        }
    
        res.json(allProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }