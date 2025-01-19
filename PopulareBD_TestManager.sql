-- Empty tables before populating
DELETE FROM PROJECT_BUG;
DELETE FROM PROJECT_USER;
DELETE FROM PROJECT_COMMIT;
DELETE FROM BUG;
DELETE FROM COMMIT;
DELETE FROM PROJECT;
DELETE FROM USER;
DELETE FROM USER_ROLE;

ALTER TABLE USER_ROLE AUTO_INCREMENT = 1;
ALTER TABLE USER AUTO_INCREMENT = 1;
ALTER TABLE PROJECT AUTO_INCREMENT = 1;
ALTER TABLE COMMIT AUTO_INCREMENT = 1;
ALTER TABLE BUG AUTO_INCREMENT = 1;
ALTER TABLE PROJECT_COMMIT AUTO_INCREMENT = 1;
ALTER TABLE PROJECT_USER AUTO_INCREMENT = 1;
ALTER TABLE PROJECT_BUG AUTO_INCREMENT = 1;

-- Populate USER_ROLE table
INSERT INTO USER_ROLE (role_name) VALUES
('Developer'),
('Tester');

-- Populate USER table
INSERT INTO USER (user_name, user_email, user_password) VALUES
('t', 't@t.t', 't'),
('Bob Johnson', 'bob@example.com', 'securepass'),
('Charlie Brown', 'charlie@example.com', 'pass456'),
('Diana Prince', 'diana@example.com', 'wonderwoman'),
('Eve Adams', 'eve@example.com', 'evepass'),
('Frank Castle', 'frank@example.com', 'punisher'),
('Grace Hopper', 'grace@example.com', 'codingqueen'),
('Hank Pym', 'hank@example.com', 'antman'),
('Ivy Green', 'ivy@example.com', 'plantlover'),
('Jack White', 'jack@example.com', 'guitarhero');

-- Populate PROJECT table
INSERT INTO PROJECT (id_project, project_name, repository_link) VALUES
(1, 'Project Alpha', 'https://github.com/org/project-alpha'),
(2, 'Project Beta', 'https://github.com/org/project-beta'),
(3, 'Project Gamma', 'https://github.com/org/project-gamma'),
(4, 'Project Delta', 'https://github.com/org/project-delta'),
(5, 'Project Epsilon', 'https://github.com/org/project-epsilon'),
(6, 'Project Zeta', 'https://github.com/org/project-zeta'),
(7, 'Project Eta', 'https://github.com/org/project-eta'),
(8, 'Project Theta', 'https://github.com/org/project-theta'),
(9, 'Project Iota', 'https://github.com/org/project-iota'),
(10, 'Project Kappa', 'https://github.com/org/project-kappa');

-- Populate COMMIT table
INSERT INTO COMMIT (id_commit, commit_link) VALUES
(1, 'https://github.com/org/project-alpha/commit/1'),
(2, 'https://github.com/org/project-beta/commit/2'),
(3, 'https://github.com/org/project-gamma/commit/3'),
(4, 'https://github.com/org/project-delta/commit/4'),
(5, 'https://github.com/org/project-epsilon/commit/5'),
(6, 'https://github.com/org/project-zeta/commit/6'),
(7, 'https://github.com/org/project-eta/commit/7'),
(8, 'https://github.com/org/project-theta/commit/8'),
(9, 'https://github.com/org/project-iota/commit/9'),
(10, 'https://github.com/org/project-kappa/commit/10');

-- Populate BUG table
INSERT INTO BUG (id_bug, severity_level, solve_priority, bug_description, solution_status, id_commit_report_bug, id_commit_resolve_bug) VALUES
(1, 'Critical', 'High', 'Null pointer exception in login', 'Resolved', 1, 2),
(2, 'Major', 'Medium', 'UI alignment issue on dashboard', 'Unresolved', 3, NULL),
(3, 'Minor', 'Low', 'Typo in error message', 'Resolved', 4, 5),
(4, 'Critical', 'High', 'Database deadlock under load', 'Unresolved', 6, NULL),
(5, 'Major', 'Medium', 'Memory leak in caching layer', 'Resolved', 7, 8),
(6, 'Minor', 'Low', 'Deprecated API usage', 'Resolved', 9, 10),
(7, 'Critical', 'High', 'Data loss on save', 'Unresolved', 1, NULL),
(8, 'Major', 'Medium', 'Incorrect validation logic', 'Resolved', 2, 3),
(9, 'Minor', 'Low', 'Console warnings on start', 'Resolved', 4, 5),
(10, 'Critical', 'High', 'Performance degradation on search', 'Unresolved', 6, NULL);

-- Populate PROJECT_COMMIT table
INSERT INTO PROJECT_COMMIT (id_project_commit, id_project, id_commit) VALUES
(1, 1, 1), (2, 1, 2),
(3, 2, 3), (4, 2, 4),
(5, 3, 5), (6, 3, 6),
(7, 4, 7), (8, 4, 8),
(9, 5, 9), (10, 5, 10);

-- Populate PROJECT_USER table
INSERT INTO PROJECT_USER (id_project_user, id_project, id_user, id_role_user) VALUES
(1, 1, 1, 1), (2, 1, 2, 2),
(3, 2, 3, 1), (4, 2, 4, 2),
(5, 3, 5, 1), (6, 3, 6, 2),
(7, 4, 7, 1), (8, 4, 8, 2),
(9, 5, 9, 1), (10, 5, 10, 2);

-- Populate PROJECT_BUG table
INSERT INTO PROJECT_BUG (id_project_bug, id_project, id_bug, id_user_reporter, id_user_solver) VALUES
(1, 1, 1, 1, 2),
(2, 1, 2, 3, NULL),
(3, 2, 3, 4, 5),
(4, 2, 4, 6, NULL),
(5, 3, 5, 7, 8),
(6, 3, 6, 9, 10),
(7, 4, 7, 1, NULL),
(8, 4, 8, 2, 3),
(9, 5, 9, 4, 5),
(10, 5, 10, 6, NULL);




