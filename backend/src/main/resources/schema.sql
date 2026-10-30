-- ==============================================================
-- ADITYA UNIVERSITY - SSIS RELATIONAL SCHEMA (MySQL / PostgreSQL / H2)
-- Designed for Enterprise Student Information & Attendance Platform
-- ==============================================================

CREATE TABLE students (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    roll_number VARCHAR(30) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    college_email VARCHAR(100) NOT NULL UNIQUE,
    department VARCHAR(100) NOT NULL,
    degree VARCHAR(100) NOT NULL,
    semester INT NOT NULL,
    section VARCHAR(10) NOT NULL,
    academic_year VARCHAR(20),
    admission_year INT,
    phone VARCHAR(20),
    date_of_birth DATE,
    blood_group VARCHAR(10),
    mentor_name VARCHAR(100),
    mentor_contact VARCHAR(100),
    cgpa DOUBLE,
    total_credits INT,
    completed_credits INT,
    current_streak INT DEFAULT 0
);

CREATE TABLE faculties (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    faculty_code VARCHAR(30) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    department VARCHAR(50) NOT NULL,
    designation VARCHAR(50) NOT NULL,
    room_number VARCHAR(50),
    office_hours VARCHAR(100),
    primary_subject VARCHAR(100)
);

CREATE TABLE courses (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    course_code VARCHAR(20) NOT NULL UNIQUE,
    course_name VARCHAR(100) NOT NULL,
    short_name VARCHAR(30),
    credits INT NOT NULL,
    semester INT NOT NULL,
    department VARCHAR(50),
    is_elective BOOLEAN DEFAULT FALSE
);

CREATE TABLE attendance_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    student_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    classes_held INT NOT NULL,
    classes_attended INT NOT NULL,
    target_percentage DOUBLE NOT NULL DEFAULT 75.0,
    last_attended_date DATE,
    CONSTRAINT fk_att_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    CONSTRAINT fk_att_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    CONSTRAINT uq_att_student_course UNIQUE (student_id, course_id)
);

CREATE TABLE timetable_entries (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    day_of_week VARCHAR(15) NOT NULL,
    period INT NOT NULL,
    start_time VARCHAR(10) NOT NULL,
    end_time VARCHAR(10) NOT NULL,
    course_id BIGINT NOT NULL,
    faculty_id BIGINT,
    room_number VARCHAR(30),
    type VARCHAR(20) DEFAULT 'THEORY',
    section VARCHAR(10) DEFAULT 'A',
    CONSTRAINT fk_tt_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    CONSTRAINT fk_tt_faculty FOREIGN KEY (faculty_id) REFERENCES faculties(id) ON DELETE SET NULL
);

CREATE TABLE academic_results (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    student_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    mid1_marks INT,
    mid2_marks INT,
    assignment_marks INT,
    attendance_marks INT,
    total_internal INT,
    max_internal INT DEFAULT 40,
    grade VARCHAR(5),
    grade_points DOUBLE,
    CONSTRAINT fk_res_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    CONSTRAINT fk_res_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE notifications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    student_id BIGINT,
    title VARCHAR(150) NOT NULL,
    message VARCHAR(500) NOT NULL,
    severity VARCHAR(20) NOT NULL,
    category VARCHAR(30) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notif_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE activity_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_email VARCHAR(100) NOT NULL,
    action VARCHAR(150) NOT NULL,
    details VARCHAR(1000),
    ip_address VARCHAR(45),
    execution_time_ms BIGINT
);

CREATE INDEX idx_att_roll ON attendance_records(student_id);
CREATE INDEX idx_tt_day_sec ON timetable_entries(day_of_week, section);
