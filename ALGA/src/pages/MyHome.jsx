import React, { useState, useEffect } from 'react';


function getMockProjectsData() {
  const projectNames = [
    'Apollo',
    'Beta',
    'Catalyst',
    'Delta',
    'Echo',
    'Fusion',
    'Giga',
    'Helix',
    'Icarus',
    'Jupiter',
  ];
  const roles = ['Tester', 'Developer'];

  const projects = projectNames.map((name, index) => ({
    id: index + 1, // Project IDs from 1 to 10
    name: `Project ${name}`,
    role: roles[Math.floor(Math.random() * roles.length)],
  }));

  return projects;
}


function getMockBugsData(projectIds) {
  const statuses = ['Open', 'Closed', 'In Progress'];
  const importanceLevels = ['Low', 'Medium', 'High'];

  let bugs = [];
  // Generate 30 mock bugs to have a variety of data
  for (let i = 1; i <= 30; i++) {
    const randomProjectId = projectIds[Math.floor(Math.random() * projectIds.length)];
    bugs.push({
      id: i, // Bug ID
      projectId: randomProjectId,
      description: `Bug #${i} description`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      importance: importanceLevels[Math.floor(Math.random() * importanceLevels.length)],
    });
  }
  return bugs;
}

function MyHome() {
  // State for projects array
  const [projects, setProjects] = useState([]);
  
  // State for all bugs (initially all bugs for all projects)
  const [bugs, setBugs] = useState([]);
  
  // State for currently selected project ID to filter bugs
  const [selectedProjectId, setSelectedProjectId] = useState(null);

 
  useEffect(() => {
    const projectData = getMockProjectsData();
    setProjects(projectData);

    const projectIds = projectData.map(p => p.id);
    const bugData = getMockBugsData(projectIds);
    setBugs(bugData);
  }, []);

  // Styles for layout and elements
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
    cursor: 'pointer'
  };

  const selectedRowStyle = {
    backgroundColor: '#e0f7fa'
  };


  const filteredBugs = selectedProjectId
    ? bugs.filter(bug => bug.projectId === selectedProjectId)
    : [];

  return (
    <div style={containerStyle}>
      {/* Left Part: My Projects */}
      <div style={halfStyle}>
        <div style={titleStyle}>My Projects</div>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>Project ID</th>
              <th style={thTdStyle}>Project Name</th>
              <th style={thTdStyle}>Role</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              const isSelected = project.id === selectedProjectId;
              return (
                <tr
                  key={project.id}
                  style={isSelected ? selectedRowStyle : {}}
                  // When a project row is clicked, update selectedProjectId
                  onClick={() => setSelectedProjectId(project.id)}
                >
                  <td style={thTdStyle}>{project.id}</td>
                  <td style={thTdStyle}>{project.name}</td>
                  <td style={thTdStyle}>{project.role}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Right Part: Bugs */}
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
          // If no project is selected, prompt the user to select one
          <div>Please select a project from the left panel to see its bugs.</div>
        )}
      </div>
    </div>
  );
}

export default MyHome;
