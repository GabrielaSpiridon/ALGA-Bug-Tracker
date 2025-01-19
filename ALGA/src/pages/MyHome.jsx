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

async function markBugAsResolved(bugId, idProject, commitLink) {
  try {

    const requestBody = {
      id_bug: bugId,
      id_project: idProject, 
      solution_status: 'Resolved',
      link_commit_resolve_bug: commitLink,
    };
    const response = await axios.post(`http://localhost:3000/bugs/updateStatusBugCtrl`,requestBody) ;
    return response.data;
  } catch (error) {
    console.error('Failed to mark bug as resolved:', error);
    throw new Error('Error marking bug as resolved');
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
  const [commitLink, setCommitLink] = useState('');
  const [showResolvedForm, setShowResolvedForm] = useState(false);
  

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


  const handleResolvedBug = () => {
    setShowResolvedForm(true); 
  };

  const handleResolvedSubmit = async (e) => {
    e.preventDefault();
    if (!commitLink.trim()) {
      alert('Please enter a valid commit link.');
      return;
    }

    try {
      await markBugAsResolved(selectedBug.id_bug, selectedProjectId, commitLink);
      alert('Bug marked as resolved!');
      setShowResolvedForm(false); 
      setCommitLink(''); 
      selectedBug.solution_status = "Resolved";
     
    } catch (error) {
      alert('Failed to mark bug as resolved.');
    }
  };



  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    padding: '100px',
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
    <div 
          className = 'containerProjects'>
          <h3>All Projects</h3>
      <div 
        className='largeContainer'
        style={containerStyle}>
        <div 
          className='containerProjects'
          style={{overflowY: 'auto', maxHeight: '600px', maxWidth: '700'}}>
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
            className='button'
            onClick={() => selectedProjectId && fetchBugsByProjectId(selectedProjectId)}
            disabled={!selectedProjectId}
          >
            Report New Bug
          </button>
        </div>

        <div 
          className='containerProjects'
          style={{overflowY: 'auto', maxHeight: '400px', maxWidth: '500'}}>
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
                className='button'
                onClick={handleResolvedBug}
                disabled={!selectedBug || selectedBug.solution_status.toUpperCase() === 'RESOLVED' || selectedBug.id_user_solver !== configuration.currentUserId }
              >
                Resolve Bug
              </button>
              
              {/* Formular pentru rezolvarea bugului */}
              {showResolvedForm && (
                <form onSubmit={handleResolvedSubmit}>
                  <label>
                    Commit Link:
                    <input
                      type="text"
                      value={commitLink}
                      onChange={(e) => setCommitLink(e.target.value)}
                      placeholder="Enter commit link"
                    />
                  </label>
                  <button type="submit">Submit</button>
                  <button type="button" onClick={() => setShowResolvedForm(false)}>Cancel</button>
                </form>
              )}
            </div>
          ) : (
            <div>Please select a project from the left panel to see its bugs.</div>
          )}
        </div>
      </div>
    </div>
  
  );
}

export default MyHome;
