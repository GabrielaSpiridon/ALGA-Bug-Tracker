import pool from '../db/connection.js';


//Selecteaza toate bugurile unui User 
export async function getUserBugs(userId){
  const conn = await pool.getConnection();
  try{
    const rows = await conn.query(`SELECT COALESCE(u.user_name, 'Unassigned') AS user_name,pb.id_user_solver, pb.id_project, p.project_name, b.id_bug, b.severity_level, b.solve_priority, b.bug_description, b.solution_status FROM project_bug pb JOIN bug b ON b.id_bug = pb.id_bug LEFT JOIN user u ON pb.id_user_solver = u.id_user JOIN project_user pu ON pu.id_user = pb.id_user_reporter JOIN user_role ur ON ur.id_role = pu.id_role_user JOIN commit c ON b.id_commit_report_bug = c.id_commit JOIN project_commit pc ON c.id_commit = pc.id_commit JOIN project p ON pc.id_project = p.id_project WHERE pu.id_user = ? AND UPPER(ur.role_name) = 'DEVELOPER';
`, userId)
    return rows;
  } finally {
    conn.release();
  }
}

//Selecteaza toate bugurile unui Proiect 
export async function getProjectBugs(projectId){
  const conn = await pool.getConnection();
  try{
    const rows = await conn.query(`SELECT u.user_name,b.id_bug, b.severity_level, b.solve_priority,b.bug_description,b.solution_status FROM project_bug pb JOIN bug b ON b.id_bug = pb.id_bug JOIN user u ON pb.id_user_solver = u.id_user WHERE pb.id_project=? `, projectId)
    return rows;
  } finally {
    conn.release();
  }
}

//returneaza toate bugurile
export async function getAllBugsData() {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query('SELECT u.user_name,b.id_bug, b.severity_level, b.solve_priority,b.bug_description,b.solution_status FROM project_bug pb JOIN bug b ON b.id_bug = pb.id_bug JOIN user u ON pb.id_user_solver = u.id_user');
    return rows;
  } finally {
    conn.release();
  }
}

export async function getBugById(id) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      'SELECT severity_level, solve_priority,bug_description,solution_status FROM Bug WHERE id_bug = ? LIMIT 1',
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  } finally {
    conn.release();
  }
}

export async function createBug(id_project,commit_link,severity_level, solve_priority,bug_description,solution_status,id_commit_report_bug,id_user_reporter) {
  const conn = await pool.getConnection();
  try {

    const updateCommit= await conn.query(`INSERT INTO Commit (commit_link) VALUES (?)`,
      [commit_link]
    );

    // Safely convert BigInt to Number
    const idCommit = typeof updateCommit.insertId === 'bigint' ? Number(updateCommit.insertId) : updateCommit.insertId;

    const updateProjectCommit = await conn.query(`INSERT INTO Project_Commit (id_project, id_commit) VALUES (?,?)`,
      [id_project,idCommit]
    );

    const result = await conn.query(
      'INSERT INTO Bug (severity_level, solve_priority,bug_description,solution_status,id_commit_report_bug) VALUES(?,?,?,?,?)',
      [severity_level, solve_priority,bug_description,solution_status,idCommit]
    );

   
    // Safely convert BigInt to Number
    const idBug = typeof result.insertId === 'bigint' ? Number(result.insertId) : result.insertId;
    
    const updateProjectBug = await conn.query(`INSERT INTO Project_Bug (id_project, id_bug,id_user_reporter) VALUES (?,?,?)`,
      [id_project,idBug,id_user_reporter]
    );

    return idBug;
  } catch (err) {
    console.error('Error creating project:', err);
    return null;
  } finally {
    conn.release();
  }
}

export async function updateBug(id_bug,severity_level, solve_priority, bug_description, solution_status, id_commit_report_bug,id_commit_resolve_bug) {
  const conn = await pool.getConnection();
   try {
    const result = await conn.query(
      'UPDATE BUG SET severity_level=?, solve_priority=?, bug_description=?, solution_status=?,id_commit_report_bug=?,id_commit_resolve_bug=? WHERE id_bug = ?',
      [severity_level, solve_priority, bug_description, solution_status, id_commit_report_bug,id_commit_resolve_bug,id_bug]
    );
    return result.affectedRows > 0;
  } catch (err) {
    console.error('Error updating project:', err);
    return false;
  } finally {
    conn.release();
  }
}

export async function updateStatusBug(id_bug,id_project,solution_status,link_commit_resolve_bug) {
  const conn = await pool.getConnection();
   try {

    const updateCommit = await conn.query(`INSERT INTO COMMIT (commit_link) VALUES (?)`,
      [link_commit_resolve_bug]
    );

    const idCommit = updateCommit.insertId;
    
    const updatePrjCommit = await conn.query(`INSERT INTO PROJECT_COMMIT (id_project, id_commit) VALUES (?,?)`,
      [id_project,idCommit]
    );
    
    const result = await conn.query(
      'UPDATE BUG SET solution_status=?,id_commit_resolve_bug=? WHERE id_bug = ?',
      [ solution_status, idCommit,id_bug]
    );
    return result.affectedRows > 0;
  } catch (err) {
    console.error('Error updating project:', err);
    return false;
  } finally {
    conn.release();
  }
}

export async function updateStatusAssignedBug(id_bug,id_user_solver) {
  const conn = await pool.getConnection();
   try {
    const result = await conn.query(
      'UPDATE PROJECT_BUG SET  ID_USER_SOLVER=? WHERE ID_BUG=?',
      [ id_user_solver, id_bug]
    );
    return result.affectedRows > 0;
  } catch (err) {
    console.error('Error updating project:', err);
    return false;
  } finally {
    conn.release();
  }
}

export async function deleteBug(id) {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query(
      'DELETE FROM BUG WHERE id_bug = ?',
      [id]
    );
    return result.affectedRows > 0;
  } catch (err) {
    console.error('Error deleting project:', err);
    return false;
  } finally {
    conn.release();
  }
}

export async function verifySolverAssignedToBug(id) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      'SELECT COUNT(*) AS count FROM project_bug WHERE id_user_solver IS NULL AND id_bug= ?',
      [id]
    );
    const count = Number(rows[0].count);

    let result = count === 1 ? 1 : 0;
    return result;
    } finally {
    conn.release();
  }
}
