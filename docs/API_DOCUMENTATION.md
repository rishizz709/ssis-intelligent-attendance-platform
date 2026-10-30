# SSIS REST API DOCUMENTATION

Base URL: `http://localhost:8080/api`  
Swagger UI: `http://localhost:8080/swagger-ui.html`  
OpenAPI JSON: `http://localhost:8080/api-docs`

---

## 1. Attendance Management API (`/api/attendance`)

### 1.1. Get Student Attendance Summary
- **Endpoint:** `GET /summary/{rollNumber}?target={percentage}`
- **Example Request:** `GET /api/attendance/summary/24B11AI051?target=75.0`
- **Response (200 OK):**
```json
{
  "rollNumber": "24B11AI051",
  "studentName": "B. Rishi Vardhan",
  "totalAttended": 334,
  "totalHeld": 434,
  "overallPercentage": 76.96,
  "totalMissed": 100,
  "classesCanMiss": 8,
  "classesNeeded": 0,
  "academicHealth": "STABLE",
  "currentStreak": 8,
  "subjectAttendance": [
    {
      "courseCode": "241CS017",
      "courseName": "OOAD & UML",
      "shortName": "OOAD",
      "facultyName": "Sunkavilli Vijaya Nirmala",
      "credits": 4,
      "classesHeld": 56,
      "classesAttended": 40,
      "percentage": 71.43,
      "targetPercentage": 75.0,
      "classesRequiredForTarget": 9,
      "safeBunksAllowed": 0,
      "status": "CRITICAL",
      "trend": "DOWN",
      "room": "CSE-204"
    }
  ]
}
```

### 1.2. Simulate Subject Attendance (What-If)
- **Endpoint:** `POST /simulate/{rollNumber}`
- **Request Body:**
```json
{
  "courseCode": "241CS017",
  "classesToAttend": 5,
  "classesToMiss": 0,
  "targetPercentage": 75.0
}
```
- **Response (200 OK):**
```json
{
  "courseCode": "241CS017",
  "courseName": "OOAD & UML",
  "currentAttended": 40,
  "currentHeld": 56,
  "currentPercentage": 71.43,
  "projectedAttended": 45,
  "projectedHeld": 61,
  "projectedPercentage": 73.77,
  "deltaPercentage": 2.34,
  "classesNeededForTarget": 4,
  "safeBunksAllowed": 0,
  "impactSummary": "Gain of +2.34% (Reaches 73.77%). Safe bunks: 0"
}
```

### 1.3. Hero Next Class Immediate Projection
- **Endpoint:** `GET /next-class-projection/{rollNumber}?courseCode=241CS017&attend=true`
- **Response (200 OK):**
```json
{
  "courseCode": "241CS017",
  "courseName": "OOAD & UML",
  "currentAttended": 40,
  "currentHeld": 56,
  "currentPercentage": 71.43,
  "projectedAttended": 41,
  "projectedHeld": 57,
  "projectedPercentage": 71.93,
  "deltaPercentage": 0.50,
  "classesNeededForTarget": 9,
  "safeBunksAllowed": 0,
  "impactSummary": "Gain of +0.50% (Reaches 71.93%). Safe bunks: 0"
}
```

---

## 2. Timetable API (`/api/timetable`)

### 2.1. Get Full Section Timetable
- **Endpoint:** `GET /section/{section}`
- **Example:** `GET /api/timetable/section/A`

### 2.2. Get Hero Next Class
- **Endpoint:** `GET /next-class/{section}`
- **Response (200 OK):**
```json
{
  "id": 2,
  "dayOfWeek": "MONDAY",
  "period": 2,
  "timeSlot": "10:00 AM - 11:00 AM",
  "courseCode": "241CS017",
  "subjectName": "OOAD & UML",
  "facultyName": "Sunkavilli Vijaya Nirmala",
  "room": "CSE-204",
  "type": "THEORY"
}
```

### 2.3. Upload Timetable CSV
- **Endpoint:** `POST /import-csv`
- **Consumes:** `multipart/form-data` (file: `timetable.csv`, section: `A`)

---

## 3. AI Prediction API (`/api/prediction`)

- **Endpoint:** `GET /{rollNumber}`
- **Response (200 OK):**
```json
{
  "currentAttendance": 76.96,
  "forecastedFinalAttendance": 78.4,
  "confidenceLower": 75.8,
  "confidenceUpper": 81.2,
  "modelAccuracyScore": 94.2,
  "projectedAcademicHealth": "STABLE",
  "projectedSgpa": 8.64,
  "scenarios": [
    {
      "label": "High Discipline (Attend 90% remaining)",
      "attendanceRate": 0.9,
      "projectedFinalPercentage": 79.12,
      "outcome": "ELIGIBLE - Top Tier Academic Standing (Projected SGPA: 8.82)"
    }
  ]
}
```

---

## 4. Official Report API (`/api/reports`)

- **Endpoint:** `GET /student/{rollNumber}`
- Returns full verified academic statement for printable PDF preview.

---

## 5. Administration Console API (`/api/admin`)

- `GET /students` — List all registered students
- `POST /students` — Create new student
- `PUT /students/{id}` — Update student record
- `DELETE /students/{id}` — Delete student record
- `GET /audit-logs` — Retrieve live Spring AOP telemetry logs
