import pool from '../db/connection.js';


//Selecteaza toate bugurile unui User 
export async function getUserBugs(userId){
  const conn = await pool.getConnection();
  try{
    const rows = await conn.query(`SELECT p.project_name, severity_level, solve_priority,bug_description,solution_status FROM bug b JOIN commit c ON b.id_commit_report_bug = c.ID_COMMIT JOIN project_commit pc ON c.ID_COMMIT = pc.id_commit JOIN project p ON pc.id_project = p.id_project JOIN project_user pu ON p.id_project = pu.id_project JOIN user u ON pu.id_user = u.id_user JOIN user_role ur ON ur.ID_ROLE = pu.ID_ROLE_USER WHERE u.ID_USER = ? AND UPPER(ur.ROLE_NAME) = 'DEVELOPER';`, userId)
    return rows;
  } finally {
    conn.release();
  }
}

//returneaza toate bugurile
export async function getAllBugsData() {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query('SELECT severity_level, solve_priority,bug_description,solution_status FROM Bug');
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

export async function createBug(severity_level, solve_priority,bug_description,solution_status) {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query(
      'INSERT INTO Bug (severity_level, solve_priority,bug_description,solution_status) VALUES(?,?,?,?)',
      [severity_level, solve_priority,bug_description,solution_status]
    );
    return result.insertId;
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
