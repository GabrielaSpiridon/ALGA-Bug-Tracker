import React, { useState, useEffect } from 'react';
import axios from 'axios';

import configuration from '../configuration';

function Projects() {
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectMembers, setProjectMembers] = useState('');
  const [projects, setProjects] = useState([]);
  const currentUserId = configuration.currentUserId; // Replace with your actual method to get the current user ID

  // Toggle add project form visibility
  const toggleAddProject = () => {
    setIsAddingProject(!isAddingProject);
  };

  // Fetch projects for the current user
  useEffect(() => {
    async function fetchUserProjects() {
      try {
        const response = await axios.get(`http://localhost:3000/projects/getProjectsByUser/${currentUserId}`);
        setProjects(response.data);
      } catch (error) {
        console.error('Failed to fetch user projects:', error);
      }
    }

    fetchUserProjects();
  }, [currentUserId]);

  // Create new project
  const handleCreateProject = async () => {
    if (!projectName) {
      alert('Project name is required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/create', {
        projectName,
        members: projectMembers.split(',').map((id) => id.trim()), // Split and trim member IDs
      });

      if (response.status === 200) {
        alert('Project created successfully!');
        setProjectName('');
        setProjectMembers('');
        setIsAddingProject(false);
        setProjects((prevProjects) => [...prevProjects, response.data]); // Add the new project to the table
      }
    } catch (error) {
      console.error('Failed to create project:', error);
      alert('Error creating project');
    }
  };

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
          }}
        >
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
              Project Members:
              <input
                type="text"
                placeholder="Enter member IDs (comma-separated)"
                value={projectMembers}
                onChange={(e) => setProjectMembers(e.target.value)}
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
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Table 1 */}
        <div style={{ flex: '1', marginRight: '10px' }}>
          <h3>Table 1: Projects</h3>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              border: '1px solid #ccc',
            }}
          >
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>
                  Project ID
                </th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>
                  Project Name
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <tr key={project.id_project}>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      {project.id_project}
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      {project.project_name}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}
                  >
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table 2 */}
        <div style={{ flex: '1', marginLeft: '10px' }}>
          <h3>Table 2: Members</h3>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              border: '1px solid #ccc',
            }}
          >
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>
                  Member ID
                </th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>
                  Member Name
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>101</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  John Doe
                </td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>102</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  Jane Smith
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Projects;
