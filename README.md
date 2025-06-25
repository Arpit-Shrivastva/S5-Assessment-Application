# 🧾 S5 Assessment Application

An end-to-end full-stack web application built for managing and tracking S5 audits and assessments within an organization. This project demonstrates enterprise-level development with Spring Boot (Java 17), Angular, MongoDB, and modern UI tools like Tailwind CSS, PrimeNG, and Chart.js.

---

## 🚀 Tech Stack

### 🔧 Backend
- Java 17 (LTS)
- Spring Boot
- Spring Security
- JWT Authentication
- MongoDB

### 💻 Frontend
- Angular
- Tailwind CSS
- PrimeNG
- Chart.js

---

## 🔐 Features

### 🔒 Authentication & Security
- Role-based login system (Admin, Auditor, Operator)
- JWT token-based secure API access
- Spring Security integration

### 📊 Dashboard & Visualization
- Audit summary with dynamic **bar and pie charts**
- View and track **S5 compliance status** per location
- Real-time visualization using Chart.js

### 📋 Audit Management
- Add, update, and view S5 audit checklists
- Score inputs and remark fields per checklist item
- Location-wise audit submission and filtering

### 👥 User Management (Admin)
- View all users
- Search by email
- Update role and username
- Delete users (Admin only)

### 📄 Reports
- Download and print audit reports (PDF export planned)

### 📁 Clone the Repository

git clone https://github.com/<your-username>/s5-assessment-app.git


## 🔐 Default Roles
Role	Access
ADMIN	Full access to users, audits, and dashboard
AUDITOR	Can perform and view audits
OPERATOR	Limited access to assigned audit tasks

## 📁 Folder Structure

s5-assessment-app/
│
├── backend/               # Spring Boot Backend
│   ├── controller/
│   ├── model/
│   ├── service/
│   ├── repository/
│   ├── config/            # JWT, security config
│   └── application.properties
│
├── frontend/              # Angular Frontend
│   ├── src/app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── models/
│   │   └── pages/
│   └── tailwind.config.js
