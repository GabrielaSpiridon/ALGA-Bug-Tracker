import pool from '../db/connection.js';


//Selecteaza toate proiectele unui User 
export async function getUserProjects(userId){
  const conn = await pool.getConnection();
  try{
    const rows = await conn.query('SELECT p.id_project, p.project_name, p.repository_link, ur.role_name FROM PROJECT p JOIN PROJECT_USER pu ON p.id_project = pu.id_project JOIN USER u ON pu.id_user = u.id_user JOIN USER_ROLE ur ON pu.id_role_user =  ur.id_role WHERE u.id_user = ?;', userId)
    return rows;
  } finally {
    conn.release();
  }
}

//TODO
export async function getUserBugs(userId){
  const conn = await pool.getConnection();
  try{
    const rows = await conn.query('___________', userId)
    return rows;
  } finally {
    conn.release();
  }
}




//___________________________________________________________________________
export async function getAllProjects() {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query('SELECT id_project, project_name, repository_link FROM PROJECT');
    return rows;
  } finally {
    conn.release();
  }
}


export async function getProjectById(id) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      'SELECT id_project, project_name, repository_link FROM PROJECT WHERE id_project = ? LIMIT 1',
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  } finally {
    conn.release();
  }
}

export async function createProject(project_name, repository_link) {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query(
      'INSERT INTO PROJECT(project_name, repository_link) VALUES(?,?)',
      [project_name, repository_link]
    );
    return result.insertId;
  } catch (err) {
    console.error('Error creating project:', err);
    return null;
  } finally {
    conn.release();
  }
}

export async function updateProject(id, project_name, repository_link) {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query(
      'UPDATE PROJECT SET project_name = ?, repository_link = ? WHERE id_project = ?',
      [project_name, repository_link, id]
    );
    return result.affectedRows > 0;
  } catch (err) {
    console.error('Error updating project:', err);
    return false;
  } finally {
    conn.release();
  }
}

export async function deleteProject(id) {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query(
      'DELETE FROM PROJECT WHERE id_project = ?',
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
