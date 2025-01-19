import React, { useState, useEffect } from 'react';
import axios from 'axios';

import configuration from '../configuration';

let tester = 1;
let developer = 2;
function Projects() {
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectGitHubUrl, setProjectGitHubUrl] = useState('');
  const [userProjects, setUserProjects] = useState([]); // User's projects
  const [allProjects, setAllProjects] = useState([]); // All projects
  const [allUsers, setAllUsers] = useState([]); // All users
  const [selectedUsers, setSelectedUsers] = useState([]); // Selected users for new project
  const [selectedProject, setSelectedProject] = useState(null); // Selected project details
  const [showEnrollButtons, setShowEnrollButtons] = useState(false); // Visibility of enroll buttons

  const currentUserId = configuration.currentUserId; // Replace with your actual method to get the current user ID

  // Toggle visibility of the project creation form
  const toggleAddProject = () => {
    setIsAddingProject(!isAddingProject);
  };

  // Fetch all projects
  function fetchAllProjects() {
    axios
      .get('http://localhost:3000/projects/getAllProjects')
      .then((response) => {
        setAllProjects(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch all projects:', error);
      });
  }

  // Fetch projects where the current user is enrolled
  function fetchUserProjects() {
    axios
      .get(`http://localhost:3000/projects/getProjectsByUser/${currentUserId}`)
      .then((response) => {
        setUserProjects(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch user projects:', error);
      });
  }

  // Fetch all users
  function fetchAllUsers() {
    axios
      .get('http://localhost:3000/projects/getAllUsers')
      .then((response) => {
        setAllUsers(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch all users:', error);
      });
  }

  useEffect(() => {
    fetchAllProjects();
    fetchUserProjects();
    fetchAllUsers();
  }, []);

  // Handle project click
  const handleProjectClick = (project, isFromAllProjects) => {
    setSelectedProject(project);
    setShowEnrollButtons(isFromAllProjects);
  };

  //Add a new entry in the project-user table
  function handleAddProjectUser(roleId) {
    if (!selectedProject) {
      alert('No project selected!');
      return;
    }

    const requestBody = {
      userId: currentUserId,
      projectId: selectedProject.id_project, 
      roleId: roleId, // Pass the role ID (Tester or Dev)
    };

    axios
      .post('http://localhost:3000/projects/insertUserIntoProject', requestBody)
      .then((response) => {
        if (response.status === 200) {
          alert(`Successfully enrolled as ${roleId === tester ? 'Tester' : 'Developer'}!`);
          fetchUserProjects(); // Refresh the user's projects
        }
      })
      .catch((error) => {
        console.error('Failed to enroll user in project:', error);
        alert('Error enrolling user in project');
      });
  }

  // Create a new project
  function handleCreateProject() {
    if (!projectName || !projectGitHubUrl) {
      alert('Both Project Name and GitHub URL are required');
      return;
    }

    if (selectedUsers.length === 0) {
      alert('Please select at least one user for the project.');
      return;
    }

    const requestBody = {
      project_name: projectName,
      repository_link: projectGitHubUrl,
      users: selectedUsers, // Selected users
    };

    axios
      .post('http://localhost:3000/projects/create', requestBody)
      .then((response) => {
        if (response.status === 200) {
          alert('Project created successfully!');

          const projectIdNumber = Number(response.data.insertId);
          console.log('Project ID as Number:', projectIdNumber);

          // Add selected users to the project-user table
          selectedUsers.forEach((userId) => {
            axios
              .post('http://localhost:3000/projects/insertUserIntoProject', {
                userId: userId,
                projectId: projectIdNumber, // Assuming the backend returns the new project ID
                roleId: developer, // Default role for all users can be customized
              })
              .then(() => {
                console.log(`User ${userId} added to project.`);
              })
              .catch((error) => {
                console.error(`Failed to add user ${userId} to project:`, error);
              });
          });

          setProjectName('');
          setProjectGitHubUrl('');
          setSelectedUsers([]); // Clear selected users
          setIsAddingProject(false);
          fetchAllProjects();
        }
      })
      .catch((error) => {
        console.error('Failed to create project:', error);
        alert('Error creating project');
      });
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Projects</h2>
      <button onClick={toggleAddProject}>
        {isAddingProject ? 'Cancel' : 'Add New Project'}
      </button>

      {isAddingProject && (
        <div
          style={{
            marginTop: '20px',
            border: '1px solid #ccc',
            padding: '20px',
            marginBottom: '20px',
            display: 'flex',
            gap: '20px',
          }}
        >
          <div style={{ flex: 1, overflowY: 'auto', maxHeight: '400px', border: '1px solid #ccc', padding: '10px' }}>
            <h3>Select Users</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {allUsers.length > 0 ? (
                allUsers.map((user) => (
                  <li key={user.id_user} style={{ marginBottom: '10px' }}>
                    <label>
                      <input
                        type="checkbox"
                        value={user.id_user}
                        onChange={(e) => {
                          const userId = parseInt(e.target.value, 10);
                          setSelectedUsers((prev) =>
                            e.target.checked
                              ? [...prev, userId] // Add user ID
                              : prev.filter((id) => id !== userId) // Remove user ID
                          );
                        }}
                      />{' '}
                      {user.user_name}
                    </label>
                  </li>
                ))
              ) : (
                <p>No users found.</p>
              )}
            </ul>
          </div>

          <div style={{ flex: 2 }}>
            <h3>Add New Project</h3>
            <div style={{ marginBottom: '10px' }}>
              <label>
                Project Name:
                <input
                  type="text"
                  placeholder="Enter project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  style={{ marginLeft: '10px' }}
                />
              </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>
                GitHub URL:
                <input
                  type="text"
                  placeholder="Enter GitHub URL"
                  value={projectGitHubUrl}
                  onChange={(e) => setProjectGitHubUrl(e.target.value)}
                  style={{ marginLeft: '10px' }}
                />
              </label>
            </div>

            <button style={{ marginTop: '10px' }} onClick={handleCreateProject}>
              Submit
            </button>
            <button
              style={{ marginTop: '10px', marginLeft: '10px' }}
              onClick={toggleAddProject}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
        {/* All Projects */}
        <div style={{ flex: 1, border: '1px solid #ccc', padding: '20px', overflowY: 'auto', maxHeight: '400px' }}>
          <h3>All Projects</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Project Name</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Git URL</th>
              </tr>
            </thead>
            <tbody>
              {allProjects.length > 0 ? (
                allProjects.map((project) => (
                  <tr
                    key={project.id_project}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleProjectClick(project, true)}
                  >
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{project.project_name}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{project.repository_link}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* User Projects */}
        <div style={{ flex: 1, border: '1px solid #ccc', padding: '20px', overflowY: 'auto', maxHeight: '400px' }}>
          <h3>My Projects</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Project Name</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Git URL</th>
              </tr>
            </thead>
            <tbody>
              {userProjects.length > 0 ? (
                userProjects.map((project) => (
                  <tr
                    key={project.id_project}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleProjectClick(project, false)}
                  >
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{project.project_name}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{project.repository_link}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Project Details */}
        <div style={{ flex: 1, border: '1px solid #ccc', padding: '20px' }}>
          <h3>Project Details</h3>
          {selectedProject ? (
            <div>
              <p><strong>Project Name:</strong> {selectedProject.project_name}</p>
              <p><strong>GitHub URL:</strong> <a href={selectedProject.repository_link} target="_blank" rel="noopener noreferrer">{selectedProject.repository_link}</a></p>
              {showEnrollButtons && (
                <div>
                  <button 
                       onClick={() => handleAddProjectUser(tester)}
                      style={{ marginRight: '10px' }}>
                      Enroll as Tester
                  </button>
                  
                  <button 
                       onClick={() => handleAddProjectUser(developer)}
                      style={{ marginRight: '10px' }}>
                      Enroll as Dev
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p>Select a project to see its details.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Projects;
