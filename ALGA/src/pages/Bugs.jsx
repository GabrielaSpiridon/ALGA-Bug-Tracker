import React, { useState, useEffect } from 'react';
import axios from 'axios';

import configuration from '../configuration.js';

async function fetchUserBugs(userId) {
  try {
    const response = await axios.get(`http://localhost:3000/bugs/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user bugs:', error);
    throw new Error('Error fetching bugs');
  }
}

async function updateSolver(bugId, userId) {
  try {
    const response = await axios.put(`http://localhost:3000/bugs/updateStatusAssignedBugCtrl`, {
      id_bug: bugId,
      id_user_solver: userId,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to assign as solver:', error);
    throw new Error('Error assigning solver');
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
    const response = await axios.post(`http://localhost:3000/bugs/updateStatusBugCtrl`, requestBody);
    return response.data;
  } catch (error) {
    console.error('Failed to mark bug as resolved:', error);
    throw new Error('Error marking bug as resolved');
  }
}

function Bugs() {
  const userId = configuration.currentUserId;
  const [bugs, setBugs] = useState([]);
  const [selectedBug, setSelectedBug] = useState(null);
  const [showResolvedForm, setShowResolvedForm] = useState(false);
  const [commitLink, setCommitLink] = useState('');

  useEffect(() => {
    if (userId) {
      fetchUserBugs(userId)
        .then((data) => {
          // Filter out duplicates by creating a Map with unique `id_bug` keys
          const uniqueBugs = Array.from(new Map(data.map((bug) => [bug.id_bug, bug])).values());
          setBugs(uniqueBugs);
        })
        .catch((error) => console.error('Failed to fetch bugs:', error));
    }
  }, [userId]);

  const handleAssignSolver = async () => {
    if (selectedBug && userId) {
      try {
        if (selectedBug.solution_status.toUpperCase() === 'RESOLVED') {
          alert('This bug is already resolved and cannot be assigned.');
          return;
        }

        await updateSolver(selectedBug.id_bug, userId);
        alert('You have been assigned as the solver!');
        const updatedBugs = await fetchUserBugs(userId);
        const uniqueBugs = Array.from(new Map(updatedBugs.map((bug) => [bug.id_bug, bug])).values());
        setBugs(uniqueBugs);
      } catch (error) {
        alert('Failed to assign as solver.');
      }
    }
  };

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
      // Update the bug's status in the backend
      await markBugAsResolved(selectedBug.id_bug, selectedBug.id_project, commitLink);
  
      alert('Bug marked as resolved!');
  
      // Update the local state for selectedBug and bugs
      setSelectedBug((prev) => ({
        ...prev,
        solution_status: 'Resolved', // Update status to "Resolved"
      }));
  
      setBugs((prevBugs) =>
        prevBugs.map((bug) =>
          bug.id_bug === selectedBug.id_bug ? { ...bug, solution_status: 'Resolved' } : bug
        )
      );
  
      // Reset form state
      setShowResolvedForm(false);
      setCommitLink('');
    } catch (error) {
      alert('Failed to mark bug as resolved.');
    }
  };
  

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
    backgroundColor: '#CCFFFF',
  };

  return (
    <div style={containerStyle}>
      <div style={halfStyle}>
        <div style={titleStyle}>Bugs from my projects</div>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>Project Name</th>
              <th style={thTdStyle}>Bug Description</th>
            </tr>
          </thead>
          <tbody>
            {bugs.map((bug) => (
              <tr
                key={bug.id_bug}
                style={selectedBug?.id_bug === bug.id_bug ? selectedRowStyle : {}}
                onClick={() => setSelectedBug(bug)}
              >
                <td style={thTdStyle}>{bug.project_name}</td>
                <td style={thTdStyle}>{bug.bug_description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={halfStyle}>
        <div style={titleStyle}>Bug Details</div>
        {selectedBug ? (
          <div>
            <p><strong>Project Name:</strong> {selectedBug.project_name}</p>
            <p><strong>Description:</strong> {selectedBug.bug_description}</p>
            <p><strong>Status:</strong> {selectedBug.solution_status}</p>
            <p><strong>Severity:</strong> {selectedBug.severity_level}</p>
            <p><strong>Priority:</strong> {selectedBug.solve_priority}</p>
            <p><strong>Assigned to:</strong> {selectedBug.user_name}</p>
            {(selectedBug.solution_status.toUpperCase() !== 'RESOLVED' && selectedBug.user_name.toUpperCase() === 'UNASSIGNED') && (
              <button onClick={handleAssignSolver}>
                Assign as Solver
              </button>
            )}
            {(selectedBug.solution_status.toUpperCase() !== 'RESOLVED' && selectedBug.user_name.toUpperCase() !== 'UNASSIGNED' && selectedBug.id_user_solver === configuration.currentUserId) && (
              <button onClick={handleResolvedBug}>
                Resolve Bug
              </button>
            )}
            {selectedBug.solution_status.toUpperCase() === 'RESOLVED' && (
              <p>This bug is already resolved.</p>
            )}

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
          <div>Select a bug from the list to see its details.</div>
        )}
      </div>
    </div>
  );
}

export default Bugs;
