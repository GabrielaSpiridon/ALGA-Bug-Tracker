-- Create the database
CREATE DATABASE IF NOT EXISTS TEST_MANAGER_DB;
USE TEST_MANAGER_DB;

-- 1. Create BUGURI Table
CREATE TABLE IF NOT EXISTS BUGURI (
    id_bug INT(5) AUTO_INCREMENT PRIMARY KEY,
    nivel_severitate VARCHAR(30),
    prioritate_rezolvare VARCHAR(30),
    descriere_bug VARCHAR(300),
    status_rezolvare VARCHAR(30),
    id_commit_raportare_bug INT(5),
    id_commit_rezolvare_bug INT(5),
    FOREIGN KEY (id_commit_raportare_bug) REFERENCES COMMITURI(id_commit) ON DELETE SET NULL,
    FOREIGN KEY (id_commit_rezolvare_bug) REFERENCES COMMITURI(id_commit) ON DELETE SET NULL
);

-- 2. Create PROIECT_BUGURI Table
CREATE TABLE IF NOT EXISTS PROIECT_BUGURI (
    id_proiect_bug INT(5) AUTO_INCREMENT PRIMARY KEY,
    id_proiect INT(5),
    id_bug INT(5),
    id_student_raportor INT(5),
    id_student_rezolvator INT(5),
    FOREIGN KEY (id_proiect) REFERENCES PROIECT(id_proiect) ON DELETE CASCADE,
    FOREIGN KEY (id_bug) REFERENCES BUGURI(id_bug) ON DELETE CASCADE,
    FOREIGN KEY (id_student_raportor) REFERENCES STUDENT(id_student) ON DELETE CASCADE,
    FOREIGN KEY (id_student_rezolvator) REFERENCES STUDENT(id_student) ON DELETE CASCADE
);

-- 3. Create STUDENT Table
CREATE TABLE IF NOT EXISTS STUDENT (
    id_student INT(5) AUTO_INCREMENT PRIMARY KEY,
    nume_student VARCHAR(255),
    email_student VARCHAR(255) UNIQUE
);

-- 4. Create ROL_STUDENT Table
CREATE TABLE IF NOT EXISTS ROL_STUDENT (
    id_rol INT(5) AUTO_INCREMENT PRIMARY KEY,
    denumire_rol VARCHAR(30)
);

-- 5. Create PROIECT Table
CREATE TABLE IF NOT EXISTS PROIECT (
    id_proiect INT(5) AUTO_INCREMENT PRIMARY KEY,
    nume_proiect VARCHAR(30),
    link_repository VARCHAR(150)
);

-- 6. Create COMMITURI Table
CREATE TABLE IF NOT EXISTS COMMITURI (
    id_commit INT(5) AUTO_INCREMENT PRIMARY KEY,
    link_commit VARCHAR(150)
);

-- 7. Create PROIECT-COMMIT Table
CREATE TABLE IF NOT EXISTS PROIECT_COMMIT (
    id_proiect_commit INT(5) AUTO_INCREMENT PRIMARY KEY,
    id_proiect INT(5),
    id_commit INT(5),
    FOREIGN KEY (id_proiect) REFERENCES PROIECT(id_proiect) ON DELETE CASCADE,
    FOREIGN KEY (id_commit) REFERENCES COMMITURI(id_commit) ON DELETE CASCADE
);

-- 8. Create PROIECT-STUDENT Table
CREATE TABLE IF NOT EXISTS PROIECT_STUDENT (
    id_proiect_student INT(5) AUTO_INCREMENT PRIMARY KEY,
    id_proiect INT(5),
    id_student INT(5),
    id_rol_student INT(5),
    FOREIGN KEY (id_proiect) REFERENCES PROIECT(id_proiect) ON DELETE CASCADE,
    FOREIGN KEY (id_student) REFERENCES STUDENT(id_student) ON DELETE CASCADE,
    FOREIGN KEY (id_rol_student) REFERENCES ROL_STUDENT(id_rol) ON DELETE CASCADE
);


