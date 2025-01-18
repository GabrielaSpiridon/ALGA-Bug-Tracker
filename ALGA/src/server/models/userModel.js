import pool from '../db/connection.js';

export async function getUserByEmailAndPassword(email, password) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      "SELECT id_user, user_name, user_email FROM USER WHERE user_email = ? AND user_password = ? LIMIT 1",
      [email, password]
    );
    return rows.length > 0 ? rows[0] : null;
  } finally {
    if (conn) conn.release();
  }
}

export async function createUser(email, name, password) {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query(
      "INSERT INTO USER(user_name, user_email, user_password) VALUES(?,?,?)",
      [name, email, password]
    );
    return result.insertId || null;
  } catch (err) {
    // Handle errors (duplicate key, etc.)
    return null;
  } finally {
    if (conn) conn.release();
  }
}



async function testCreateUser() {
    const testEmail = `testuser_${Date.now()}@example.com`;
    const testName = 'Test User';
    const testPassword = 'testpassword';

    const userId = await createUser(testEmail, testName, testPassword);
  
    if (userId) {
      console.log(`User created successfully with ID: ${userId}`);
  
      // Verify the user was inserted correctly by attempting to retrieve it
      const user = await getUserByEmailAndPassword(testEmail, testPassword);
      if (user && user.id_user === userId) {
        console.log('User retrieval test passed:', user);
      } else {
        console.error('User retrieval test failed. User not found or mismatch in data.');
      }
    } else {
      console.error('Failed to create user. createUser returned null.');
    }
  }