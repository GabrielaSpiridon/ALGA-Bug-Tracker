# ALGA-Bug-Tracker
Aplicație web pentru gestionarea rezolvării bug-urilor
Echipa de proiect: Spiridon Gabriela Elena si Savu Stefan Alexandru
Formatori: Toma Andrei si Lungu Mihai Adrian

Nume aplicație: ALGA Bug Tracker
Baza de date: mySQL (schema bazei de date se afla în fișierul SchemaTestManager.DB)
Backend: 
Runtime: Node.js - pentru rularea codului JavaScript pe server
Framework: Express.js - pentru autentificare (JWT), validare și routing 
			 - interacțiunea cu baza de date se va face cu Sequelize
Frontend: React.js
	     - vom folosi AXIOS pentru a comunica cu API-ul de tip REST și pentru a obține sau trimite date către și de la un server
	     - în principiu, nu planificăm să avem nevoie de state manager
Styling: Tailwind CSS

Development Environment: Visual Studio Code
 
Mod de prezentare: Opțiunea 1: Laptopul personal la seminar
			Opțiunea 2: Hosting RoMarg ( vom confirma ulterior URL-ul exact)

Version Control: GitHub

Descriere Arhitectura: 
	Aplicatia de frontend comunica cu aplicatia de backend prin REST API.

	UI-urile se afiseaza in functie de rolurile fiecarui student ( utilizator).

	Aplicatia backend expune endpointuri RESTful pentru a fi consumate de aplicatia frontend.
	Exemple: alga/api/buguri, alga/api/proiecte, alga/api/commituri etc.
	
	Backend-ul couminica cu baza de date pentru a citi si salva date si este responsabil pentru validari. 

	Baza de date stochează date în format relational normalizat, conform schemei atașate ( ne propunem sa mai ajustam schema în funcție de necesități).
