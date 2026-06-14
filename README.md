# ALGA Bug Tracker
> A Role-Based Full-Stack Issue Tracking System for Software Development Lifecycle Management.

## 📌 Project Overview
**ALGA Bug Tracker** is a comprehensive web application designed to manage, assign, and track software defects. Engineered with a strict client-server separation, the platform delivers customized User Interfaces (UI) dynamically rendered based on authorization roles. 

The system relies on a strictly normalized relational database and an ORM-driven backend to ensure data integrity across projects, commits, and bug reports.

---

## 🏗️ Architecture & Technical Stack

The architecture enforces clear boundaries between the presentation layer, the API gateway, and the persistence layer.

| Component / Layer | Technology | Engineering Purpose |
| :--- | :--- | :--- |
| **Frontend UI** | React.js, Vite, Bootstrap CSS | Fast, component-driven Single Page Application. Deliberately designed without a global state manager (e.g., Redux) to reduce boilerplate and architectural complexity for the current scope. |
| **API Gateway & Logic** | Node.js, Express.js, Axios | Handles RESTful API routing, strict input validation, and request authorization. |
| **Data Access Layer** | Sequelize ORM | Abstracts SQL queries and manages relational associations (One-to-Many, Many-to-Many) between entities. |
| **Database** | MySQL | Normalized relational schema ensuring ACID compliance for critical bug-tracking transactions. |

---

## 🚀 Core Mechanics & Data Flow

### 1. Role-Based Access Control (RBAC) & Security
* **Authentication:** Secured via JSON Web Tokens (JWT). 
* **Dynamic UI & Authorization:** The React frontend evaluates the user's role payload to conditionally render views. The Express backend strictly guards endpoints, rejecting unauthorized mutations.

### 2. RESTful API Contract
* The backend exposes standard REST endpoints consumed asynchronously via `Axios`.
* **Sample Resource Routing:** * `GET /alga/api/projects` - Retrieves active workspaces.
    * `POST /alga/api/bugs` - Ingests new defect reports with server-side validation.
    * `GET /alga/api/commits` - Maps code iterations to specific bug resolutions.

### 3. Data Integrity & Normalization
* The MySQL schema (`SchemaTestManager.DB`) is fully normalized to eliminate data redundancy.
* Sequelize enforces foreign key constraints at the application layer, ensuring that bugs cannot be assigned to non-existent projects or users.

---

## ⚙️ Setup & Execution

**Prerequisites:** Node.js, MySQL Server.

### 1. Database Configuration
* Import the provided `SchemaTestManager.DB` schema into your local MySQL instance.
* Configure database credentials within the backend environment variables.

### 2. Backend (Node.js/Express)
```bash
cd backend
npm install
npm run start
```

###3. Frontend (React/Vite)
```bash
cd frontend
npm install
npm run dev
```
