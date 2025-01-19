import mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'gabriela2003',
  database: 'TEST_MANAGER_DB',
  connectionLimit: 5
});

export default pool;
