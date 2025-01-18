import mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'TEST_MANAGER_DB',
  connectionLimit: 5
});

export default pool;
