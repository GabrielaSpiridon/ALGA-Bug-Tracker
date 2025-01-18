import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import configuration from '../configuration.js';

async function fetchProjectsByUserId(userId) {
  try {
    const response = await axios.get(`http://localhost:3000/projects/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    throw new Error('Error fetching projects');
  }
}

function getMockBugsData(projectIds) {
  const statuses = ['Open', 'Closed', 'In Progress'];
  const importanceLevels = ['Low', 'Medium', 'High'];

  let bugs = [];
  for (let i = 1; i <= 30; i++) {
    const randomProjectId = projectIds[Math.floor(Math.random() * projectIds.length)];
    bugs.push({
      id: i,
      projectId: randomProjectId,
      description: `Bug #${i} description`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      importance: importanceLevels[Math.floor(Math.random() * importanceLevels.length)],
    });
  }
  return bugs;
}

function MyHome() {
  const userId = configuration.currentUserId;
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    if (!userId) {
      console.error('No userId provided. Redirecting to login.');
      navigate('/login');
    }
  }, [userId, navigate]);

  useEffect(() => {
    if (userId) {
      fetchProjectsByUserId(userId)
        .then((data) => {
          setProjects(data);
          const projectIds = data.map((project) => project.id_project);
          const bugData = getMockBugsData(projectIds);
          setBugs(bugData);
        })
        .catch((error) => console.error('Failed to fetch projects:', error));
    }
  }, []); // Empty dependency array ensures this runs only once

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    padding: '20px',
    gap: '20px',
  };

  const halfStyle = {
    flex: 1,
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '10px',
    boxSizing: 'border-box',
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thTdStyle = {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'left',
    cursor: 'pointer',
  };

  const selectedRowStyle = {
    backgroundColor: '#e0f7fa',
  };

  const filteredBugs = selectedProjectId
    ? bugs.filter((bug) => bug.projectId === selectedProjectId)
    : [];

  return (
    <div style={containerStyle}>
      <div style={halfStyle}>
        <div style={titleStyle}>My Projects</div>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>Project ID</th>
              <th style={thTdStyle}>Project Name</th>
              <th style={thTdStyle}>Repository Link</th>
              <th style={thTdStyle}>Role</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              const isSelected = project.id_project === selectedProjectId;
              return (
                <tr
                  key={project.id_project}
                  style={isSelected ? selectedRowStyle : {}}
                  onClick={() => setSelectedProjectId(project.id_project)}
                >
                  <td style={thTdStyle}>{project.id_project}</td>
                  <td style={thTdStyle}>{project.project_name}</td>
                  <td style={thTdStyle}><a href={project.repository_link} target="_blank" rel="noopener noreferrer">{project.repository_link}</a></td>
                  <td style={thTdStyle}>{project.role_name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={halfStyle}>
        <div style={titleStyle}>Bugs</div>
        {selectedProjectId ? (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thTdStyle}>ID</th>
                <th style={thTdStyle}>Description</th>
                <th style={thTdStyle}>Status</th>
                <th style={thTdStyle}>Importance</th>
              </tr>
            </thead>
            <tbody>
              {filteredBugs.map((bug) => (
                <tr key={bug.id}>
                  <td style={thTdStyle}>{bug.id}</td>
                  <td style={thTdStyle}>{bug.description}</td>
                  <td style={thTdStyle}>{bug.status}</td>
                  <td style={thTdStyle}>{bug.importance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>Please select a project from the left panel to see its bugs.</div>
        )}
      </div>
    </div>
  );
}

export default MyHome;
