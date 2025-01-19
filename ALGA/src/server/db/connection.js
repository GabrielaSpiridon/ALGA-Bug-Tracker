import mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'TEST_MANAGER_DB',
  connectionLimit: 5
});

export default pool;
