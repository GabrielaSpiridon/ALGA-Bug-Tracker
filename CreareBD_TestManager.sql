-- Drop the database if it exists
DROP DATABASE IF EXISTS TEST_MANAGER_DB;

-- Create the database
CREATE DATABASE TEST_MANAGER_DB;
USE TEST_MANAGER_DB;

-- Drop tables if they exist
DROP TABLE IF EXISTS PROJECT;
DROP TABLE IF EXISTS COMMIT;
DROP TABLE IF EXISTS BUG;
DROP TABLE IF EXISTS USER;
DROP TABLE IF EXISTS USER_ROLE;
DROP TABLE IF EXISTS PROJECT_COMMIT;
DROP TABLE IF EXISTS PROJECT_USER;
DROP TABLE IF EXISTS PROJECT_BUG;

-- Create PROJECT TABLE
CREATE TABLE IF NOT EXISTS PROJECT (
    id_project INT(5) AUTO_INCREMENT PRIMARY KEY,
    project_name VARCHAR(30),
    repository_link VARCHAR(150)
);

-- Create COMMIT Table
CREATE TABLE IF NOT EXISTS COMMIT (
    id_commit INT(5) AUTO_INCREMENT PRIMARY KEY,
    commit_link VARCHAR(150)
);

-- Create BUG Table
CREATE TABLE IF NOT EXISTS BUG (
    id_bug INT(5) AUTO_INCREMENT PRIMARY KEY,
    severity_level VARCHAR(30),
    solve_priority VARCHAR(30),
    bug_description VARCHAR(300),
    solution_status VARCHAR(30),
    id_commit_report_bug INT(5),
    id_commit_resolve_bug INT(5),
    FOREIGN KEY (id_commit_report_bug) REFERENCES COMMIT(id_commit) ON DELETE SET NULL,
    FOREIGN KEY (id_commit_resolve_bug) REFERENCES COMMIT(id_commit) ON DELETE SET NULL
);

-- Create USER Table
CREATE TABLE IF NOT EXISTS USER (
    id_user INT(5) AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255),
    user_email VARCHAR(255) UNIQUE,
    user_password VARCHAR(255)
);

-- Create USER_ROLE Table
CREATE TABLE IF NOT EXISTS USER_ROLE (
    id_role INT(5) AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(30)
);

-- Create PROJECT_COMMIT Table
CREATE TABLE IF NOT EXISTS PROJECT_COMMIT (
    id_project_commit INT(5) AUTO_INCREMENT PRIMARY KEY,
    id_project INT(5),
    id_commit INT(5),
    FOREIGN KEY (id_project) REFERENCES PROJECT(id_project) ON DELETE CASCADE,
    FOREIGN KEY (id_commit) REFERENCES COMMIT(id_commit) ON DELETE CASCADE
);

-- Create PROJECT_USER Table
CREATE TABLE IF NOT EXISTS PROJECT_USER (
    id_project_user INT(5) AUTO_INCREMENT PRIMARY KEY,
    id_project INT(5),
    id_user INT(5),
    id_role_user INT(5),
    FOREIGN KEY (id_project) REFERENCES PROJECT(id_project) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES USER(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_role_user) REFERENCES USER_ROLE(id_role) ON DELETE CASCADE
);

-- Create PROJECT_BUG Table
CREATE TABLE IF NOT EXISTS PROJECT_BUG (
    id_project_bug INT(5) AUTO_INCREMENT PRIMARY KEY,
    id_project INT(5),
    id_bug INT(5),
    id_user_reporter INT(5),
    id_user_solver INT(5),
    FOREIGN KEY (id_project) REFERENCES PROJECT(id_project) ON DELETE CASCADE,
    FOREIGN KEY (id_bug) REFERENCES BUG(id_bug) ON DELETE CASCADE,
    FOREIGN KEY (id_user_reporter) REFERENCES USER(id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_user_solver) REFERENCES USER(id_user) ON DELETE CASCADE
);
















