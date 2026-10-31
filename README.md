# SMART STUDENT INFORMATION SYSTEM (SSIS)
## Intelligent Student Academic & Attendance Platform
*“Know Your Academic Status. Plan Your Attendance. Predict Your Performance.”*

---

## 🎓 Aditya University Project Presentation

SSIS is a production-quality full-stack academic intelligence platform built for **Aditya University (Department of AI & ML)**.

- **Lead Student Persona:** B. Rishi Vardhan (`24B11AI051`)
- **Degree:** B.Tech AI & ML (5th Semester, Section A)
- **Project Subject:** API & Micro Services (`241CS019`) — Faculty: Kumari
- **Current Attendance:** **334 / 434 (76.96%)** — Exam Eligible (+8 Safe Bunk Buffer)
- **Academic Score:** **82.00% Average** (Projected SGPA: 8.64, CGPA: 8.58)
- **Hero Next Class:** API & Micro Services (`241CS019`) at 10:00 AM in CSE-204 with Kumari

---

## 🚀 Quick Start Guide

### 1. Running the Frontend (React + Vite + Tailwind)
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

To verify a production build:
```bash
npm run build
npm run preview
```

### 2. Running the Backend (Spring Boot 3 + Java 17)
```bash
cd backend
mvn spring-boot:run
```
- REST Gateway: [http://localhost:8080/api](http://localhost:8080/api)
- Swagger UI Docs: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- SOAP Web Service WSDL: [http://localhost:8080/ws/student-result.wsdl](http://localhost:8080/ws/student-result.wsdl)
- H2 Database Console: [http://localhost:8080/h2-console](http://localhost:8080/h2-console) (JDBC URL: `jdbc:h2:mem:ssisdb`, User: `sa`, Password: *empty*)

### 3. Running with Docker Compose
```bash
docker-compose up --build
```
- Frontend at [http://localhost:3000](http://localhost:3000)
- Backend at [http://localhost:8080](http://localhost:8080)

---

## 📁 Repository Structure
```
ssis-smart-student-system/
├── backend/                  # Java Spring Boot 3 enterprise service
│   ├── src/main/java/com/aditya/ssis/
│   │   ├── aspect/          # Spring AOP @Around profiling telemetry
│   │   ├── config/          # CORS & OpenAPI Swagger configs
│   │   ├── controller/      # REST endpoints (Attendance, Timetable, Predictions)
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── entity/          # JPA Entities (Student, Course, Attendance, Results)
│   │   ├── exception/       # @RestControllerAdvice global error handler
│   │   ├── repository/      # Spring Data JPA repositories
│   │   ├── service/         # Attendance calculus & ML algorithms
│   │   └── soap/            # Spring WS endpoint & WSDL configuration
│   ├── src/main/resources/
│   │   ├── application.yml  # Application properties & H2 DB configuration
│   │   ├── student-result.xsd # Contract-first SOAP XML Schema
│   │   └── data.sql         # Database seed with exact 334/434 numbers
│   └── pom.xml              # Maven dependencies
├── frontend/                 # React 18 + Vite 5 + Tailwind CSS SPA
│   ├── src/
│   │   ├── components/      # Navbar (live IST clock), Sidebar, Search modal
│   │   ├── context/         # StudentContext & AuthContext reactive state
│   │   ├── data/            # Mock dataset & seed records
│   │   ├── services/        # Live API client with offline fallback
│   │   ├── types/           # TypeScript domain definitions
│   │   ├── utils/           # Attendance math formulas & AI linear regression
│   │   ├── views/           # Dashboard, Timetable, AI Predictor, Reports, Admin
│   │   ├── App.tsx          # Master application layout
│   │   └── main.tsx         # Root DOM bootstrap
│   ├── index.html           # HTML template
│   ├── package.json         # Node dependencies
│   └── vite.config.ts       # Vite build config
├── database/                 # SQL relational schema & seed scripts
│   ├── schema.sql           # DDL schema definition
│   └── seed_data.sql        # Standalone INSERT statements
├── sample-data/              # Sample CSV templates for import demo
│   ├── timetable_sample.csv # Timetable import file
│   ├── attendance_sample.csv# Attendance statement CSV
│   └── results_sample.csv   # Internal exam results CSV
├── docs/                     # Technical documentation suite
│   ├── PROJECT_EXPLANATION.md # Full project rationale & Aditya University branding
│   ├── ARCHITECTURE.md      # Mermaid diagrams & design pattern reference
│   ├── API_DOCUMENTATION.md # Complete REST API reference
│   ├── SOAP_DOCUMENTATION.md# SOAP Web Service specifications & samples
│   ├── ATTENDANCE_LOGIC.md  # Discrete mathematical proofs for ceil & floor formulas
│   └── PRESENTATION_GUIDE.md# Live viva voce walkthrough & Q&A
├── docker/                   # Docker build assets
│   ├── Dockerfile.backend   # Multi-stage Maven + Temurin JRE
│   └── Dockerfile.frontend  # Multi-stage Node + Nginx
├── docker-compose.yml        # Multi-container orchestration
└── README.md                 # Project manual
```

---

## 🔢 Mathematical Formulas

1. **Classes Required for Target Percentage ($T$):**
   $$\text{Needed} = \left\lceil \frac{T \cdot \text{held} - 100 \cdot \text{attended}}{100 - T} \right\rceil$$

2. **Safe Bunks Allowed Above Target ($T$):**
   $$\text{Safe Bunks} = \left\lfloor \frac{100 \cdot \text{attended} - T \cdot \text{held}}{T} \right\rfloor$$

---

## 🏆 Project Highlights for Academic Presentation

- **Spotify + Modern Analytics Aesthetic:** Bright, clean Aditya University colors (`#0F2A4A`, `#FFFFFF`, `#F97316`) instead of dull legacy tables.
- **Hero Next Class Component:** Instant visual delta calculation (+0.50% attend vs -1.25% miss).
- **Target Attendance Slider:** Seamless reactive feedback from 70% to 95%.
- **AI Trend Regression:** Empirical forecast with 95% confidence bounds.
- **Contract-First SOAP Service:** Standardized WSDL XML endpoint for enterprise interoperability.
- **Spring AOP Telemetry:** Non-intrusive latency profiling and system audit logging.
- **Dual-Mode Client:** Automatic fallback to client-side store when backend is starting.

---

## Live Deployment

- **Frontend (Netlify):** https://ssis-platform.netlify.app
- **Backend (Render):** https://ssis-intelligent-attendance-platform.onrender.com
- **API Documentation (Swagger):** https://ssis-intelligent-attendance-platform.onrender.com/swagger-ui/index.html
