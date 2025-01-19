import pool from '../db/connection.js';


//creaza un proiect nou
export async function createNewProject(projectName, perojectRepositoryLink){
  const conn = await pool.getConnection();
  try{
    const rows = await conn.query('INSERT INTO PROJECT (project_name, repository_link) VALUES (? , ?);', [projectName, perojectRepositoryLink])
    return rows;
  } finally {
    conn.release();
  }
}

//Update legatura users proiect
export async function insertUsersIntoProject(projecID, userID, userRoleID){
  const conn = await pool.getConnection();
  try{
    const rows = await conn.query('INSERT INTO PROJECT_USER (id_project, id_user, id_role_user) VALUES (?, ?, ?);',
      [projecID, userID, userRoleID])

    return rows;
  } finally {
    conn.release();
  }
}

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

//Selecteaza toate proiectele EXISTENTE 
export async function getAllProjects(){
  const conn = await pool.getConnection();
  try{
    const rows = await conn.query('SELECT p.id_project, p.project_name, p.repository_link FROM PROJECT p ;')
    return rows;
  } finally {
    conn.release();
  }
}



