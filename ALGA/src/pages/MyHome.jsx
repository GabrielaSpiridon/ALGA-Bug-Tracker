//MyHome.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import configuration from '../configuration.js';

async function fetchProjectsByUserId(userId) {
  try {
    const response = await axios.get(`http://localhost:3000/projects/getProjectsByUser/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    throw new Error('Error fetching projects');
  }
}

async function fetchBugsByProjectId(projectId) {
  try {
    const response = await axios.get(`http://localhost:3000/bugs/getProjectBugsById/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch bugs:', error);
    throw new Error('Error fetching bugs');
  }
}

function MyHome() {
  const userId = configuration.currentUserId;
  console.log('Current userId:', userId);

  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedBug, setSelectedBug] = useState(null);

  useEffect(() => {
    if (!userId || userId === 0) {
      console.error('No userId provided. Redirecting to login.');
      if (window.location.pathname !== '/login') {
        navigate('/login', { replace: true });
      }
    }
  }, [userId, navigate]);

  useEffect(() => {
    if (userId) {
      fetchProjectsByUserId(userId)
        .then((data) => {
          setProjects(data);
        })
        .catch((error) => console.error('Failed to fetch projects:', error));
    }
  }, [userId]);

  useEffect(() => {
    if (selectedProjectId) {
      fetchBugsByProjectId(selectedProjectId)
        .then((data) => {
          setBugs(data);
          setSelectedBug(null); // Deselect bug when project changes
        })
        .catch((error) => console.error('Failed to fetch bugs:', error));
    }
  }, [selectedProjectId]);

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

  const filteredBugs = bugs;

  const selectedProjectName = projects.find((project) => project.id_project === selectedProjectId)?.project_name || '';

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
        <button
          style={{ marginTop: '10px' }}
          onClick={() => selectedProjectId && fetchBugsByProjectId(selectedProjectId)}
          disabled={!selectedProjectId}
        >
          Report New Bug
        </button>
      </div>

      <div style={halfStyle}>
        <div style={titleStyle}>Reported bugs for project {selectedProjectName}</div>
        {selectedProjectId ? (
          <div>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thTdStyle}>ID</th>
                  <th style={thTdStyle}>Description</th>
                  <th style={thTdStyle}>Status</th>
                  <th style={thTdStyle}>Priority</th>
                  <th style={thTdStyle}>Severity</th>
                  <th style={thTdStyle}>Solver</th>
                </tr>
              </thead>
              <tbody>
                {filteredBugs.map((bug) => (
                  <tr
                    key={bug.id_bug}
                    style={selectedBug?.id_bug === bug.id_bug ? selectedRowStyle : {}}
                    onClick={() => setSelectedBug(bug)}
                  >
                    <td style={thTdStyle}>{bug.id_bug}</td>
                    <td style={thTdStyle}>{bug.bug_description}</td>
                    <td style={thTdStyle}>{bug.solution_status}</td>
                    <td style={thTdStyle}>{bug.solve_priority}</td>
                    <td style={thTdStyle}>{bug.severity_level}</td>
                    <td style={thTdStyle}>{bug.user_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              style={{ marginTop: '10px' }}
              onClick={() => selectedBug && console.log(`Resolve bug ${selectedBug.id_bug}`)}
              disabled={!selectedBug}
            >
              Resolve Bug
            </button>
          </div>
        ) : (
          <div>Please select a project from the left panel to see its bugs.</div>
        )}
      </div>
    </div>
  );
}

export default MyHome;
