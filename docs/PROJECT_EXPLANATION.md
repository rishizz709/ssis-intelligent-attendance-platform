# SMART STUDENT INFORMATION SYSTEM (SSIS)
## Intelligent Student Academic & Attendance Platform
*“Know Your Academic Status. Plan Your Attendance. Predict Your Performance.”*

---

## 1. Executive Summary & Identity

The **Smart Student Information System (SSIS)** is an enterprise-grade academic intelligence platform designed specifically for students, faculty, and academic deans at **Aditya University**. 

Unlike conventional, clunky university ERP systems that only display static tabular data, SSIS treats attendance and academics as a **forward-looking, predictive optimization problem**. It empowers students to understand their current standing in real time, simulate *what-if* decisions before missing a class, predict their final semester outcomes using machine learning models, and take proactive steps to safeguard exam eligibility.

---

## 2. Core Personas & User Identity

### Primary Student Persona:
- **Name:** B. Rishi Vardhan
- **University Roll Number:** `24B11AI051`
- **Department:** Artificial Intelligence & Machine Learning (AI & ML)
- **Degree & Program:** B.Tech (4-Year Autonomous Undergraduate)
- **Current Academic Stage:** 5th Semester, Section A
- **Academic Standing:** 
  - **Overall Attendance:** **334 / 434 Classes (76.96%)**
  - **Academic Average:** **82.00%** (Projected SGPA: 8.64, CGPA: 8.58)
  - **Active Streak:** 8 Consecutive Classes Attended
  - **Status:** **EXAM ELIGIBLE** (+1.96% above 75% University Threshold)

### Faculty Persona:
- **Name:** Kumari
- **Department:** Computer Science & Engineering
- **Course In-charge:** `241CS019` — API & Micro Services
- **Role:** Roll Call Marker & Subject Coordinator

### Administrative Persona:
- **Role:** Dean of Academic Affairs & Super Administrator
- **Capabilities:** Student Database CRUD, Condonation Generation, Spring AOP Telemetry Auditing

---

## 3. Flagship Functional Innovations

### 3.1. Hero "Next Class" Decision Engine
At any given moment, a student should know the exact mathematical consequence of stepping into or bunking their upcoming class.
- **Featured Next Class:** `241CS019` — API & Micro Services (10:00 AM – 11:00 AM, CSE-204)
- **Faculty Incharge:** Kumari
- **Current Standing in OOAD:** 40 / 56 Attended (**71.43%** — *Below 75% Condonation Limit*)
- **Interactive Projections:**
  - **"✓ I'LL ATTEND":** Tally becomes **41 / 57 (71.93%)** — *+0.50% Immediate Gain*, reduces recovery hurdle.
  - **"× I'LL MISS":** Tally drops to **40 / 57 (70.18%)** — *-1.25% Sharp Drop*, escalates deficit.

### 3.2. Target Attendance Planner & What-If Simulator
A real-time reactive slider (70% to 95%) with instant presets (75%, 80%, 85%, 90%):
- **Below Target Formula:** $\lceil \frac{T \cdot \text{held} - 100 \cdot \text{attended}}{100 - T} \rceil$
- **Above Target Formula:** $\lfloor \frac{100 \cdot \text{attended} - T \cdot \text{held}}{T} \rfloor$
- **Visual Trajectory:** Multi-scenario area chart illustrating progression over the next 30 sessions.

### 3.3. Machine Learning Predictive Center
- **Model:** Multivariate Linear Regression with momentum adjustments.
- **End-of-Semester Forecast:** **78.40%** (95% Confidence Interval: $[75.80\%, 81.20\%]$)
- **Projected SGPA:** **8.64** with Grade A+ standing.
- **Scenario Testing:**
  1. *High Discipline (90% attendance):* Finishes at 79.12% (Merit List)
  2. *Steady Maintenance (75% attendance):* Finishes at 76.63% (Safe Pass)
  3. *Complacent / Risk (50% attendance):* Dips to 72.50% (Debarred / Condonation Fine)

### 3.4. Printable Official Academic Report
- University letterhead, verified watermark, QR code verification token, course-wise breakdown, and official signatures of HOD and Dean of Academics.
- Ready for one-click printing or PDF export.

### 3.5. Smart CSV Timetable Importer
- Drag-and-drop CSV importer with header validation, instant syntax check, live table preview, and database synchronization.

---

## 4. Technology Stack

| Layer | Technologies Used |
|---|---|
| **Frontend Framework** | React 18 + TypeScript + Vite 5 |
| **Styling & Design System** | Tailwind CSS 3 (Aditya University Palette: Deep Blue `#0F2A4A`, White `#FFFFFF`, Subtle Orange `#F97316`) |
| **Data Visualization** | Recharts (Area, Line, Bar, and Scatter Charts) |
| **Icons & Micro-animations** | Lucide React |
| **Backend Framework** | Java 17 + Spring Boot 3.3.4 |
| **Data Access & ORM** | Spring Data JPA + Hibernate + H2 Database |
| **SOAP Web Service** | Spring WS + WSDL4J + XSD Schema Contract |
| **System Telemetry** | Spring AOP (`@Around` method profiling and audit logging) |
| **Documentation & Spec** | OpenAPI 3 + Swagger UI |
