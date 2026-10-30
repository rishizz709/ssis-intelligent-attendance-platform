-- ==============================================================
-- ADITYA UNIVERSITY - SSIS SEED DATA (STANDALONE SCRIPT)
-- Student: B. Rishi Vardhan (24B11AI051)
-- Exact Academic Statistics: 334 / 434 (76.96%) Attendance, 82% Avg
-- ==============================================================

INSERT INTO students (id, roll_number, full_name, college_email, department, degree, semester, section, academic_year, admission_year, phone, blood_group, mentor_name, mentor_contact, cgpa, total_credits, completed_credits, current_streak)
VALUES (1, '24B11AI051', 'B. Rishi Vardhan', 'rishi.24b11ai051@aditya.ac.in', 'Artificial Intelligence & Machine Learning', 'B.Tech', 5, 'A', '2026-2027', 2024, '+91 98480 12345', 'O+', 'Dr. K. S. Rao', 'rao.ks@aditya.ac.in', 8.58, 112, 88, 8);

INSERT INTO faculties (id, faculty_code, name, email, department, designation, room_number, office_hours, primary_subject)
VALUES 
(1, 'FAC-017', 'Sunkavilli Vijaya Nirmala', 'nirmala.sv@aditya.ac.in', 'Computer Science & Engineering', 'Associate Professor', 'Cabin CSE-304, Ramanujan Block', 'Mon/Wed 3:30 PM - 4:30 PM', 'OOAD & UML'),
(2, 'FAC-021', 'Dr. Ch. Srinivas Rao', 'srinivas.rao@aditya.ac.in', 'AI & Machine Learning', 'Professor & HOD', 'Cabin AI-301, Ramanujan Block', 'Tue/Thu 2:00 PM - 4:00 PM', 'Machine Learning'),
(3, 'FAC-023', 'Dr. M. Swetha', 'swetha.m@aditya.ac.in', 'AI & Machine Learning', 'Associate Professor', 'Cabin AI-204, Aryabhatta Block', 'Mon/Fri 11:00 AM - 12:00 PM', 'Deep Learning'),
(4, 'FAC-019', 'Kumari', 'kumari@aditya.ac.in', 'Computer Science & Engineering', 'Assistant Professor', 'Cabin CSE-208, Ramanujan Block', 'Wed/Fri 10:00 AM - 11:30 AM', 'API & Micro Services');

INSERT INTO courses (id, course_code, course_name, short_name, credits, semester, department, is_elective)
VALUES 
(1, '241CS017', 'OOAD & UML', 'OOAD', 4, 5, 'CSE', FALSE),
(2, '241AI021', 'Machine Learning', 'ML', 4, 5, 'AI&ML', FALSE),
(3, '241AI023', 'Deep Learning', 'DL', 3, 5, 'AI&ML', FALSE),
(4, '241CS019', 'API & Micro Services', 'API', 3, 5, 'CSE', FALSE),
(5, '241CS015', 'Computer Networks', 'CN', 3, 5, 'CSE', FALSE),
(6, '241CS016', 'Compiler Design', 'CD', 3, 5, 'CSE', FALSE),
(7, '241CS020', 'Web Technologies', 'WT', 3, 5, 'CSE', FALSE),
(8, '241AI025', 'AI Ethics & Governance', 'AIE', 2, 5, 'AI&ML', TRUE);

INSERT INTO attendance_records (id, student_id, course_id, classes_held, classes_attended, target_percentage, last_attended_date)
VALUES 
(1, 1, 1, 56, 40, 75.0, '2026-09-28'),
(2, 1, 2, 56, 43, 75.0, '2026-09-30'),
(3, 1, 3, 55, 42, 75.0, '2026-09-29'),
(4, 1, 4, 57, 46, 75.0, '2026-09-29'),
(5, 1, 5, 54, 41, 75.0, '2026-09-30'),
(6, 1, 6, 52, 40, 75.0, '2026-09-27'),
(7, 1, 7, 54, 42, 75.0, '2026-09-26'),
(8, 1, 8, 50, 40, 75.0, '2026-09-25');

INSERT INTO timetable_entries (id, day_of_week, period, start_time, end_time, course_id, faculty_id, room_number, type, section)
VALUES 
(1, 'MONDAY', 1, '09:00', '10:00', 5, 1, 'CSE-202', 'THEORY', 'A'),
(2, 'MONDAY', 2, '10:00', '11:00', 4, 4, 'CSE-204', 'THEORY', 'A'),
(3, 'MONDAY', 3, '11:15', '12:15', 2, 2, 'AI-101', 'THEORY', 'A'),
(4, 'MONDAY', 4, '13:00', '15:00', 4, 4, 'Lab-4', 'LAB', 'A');

INSERT INTO academic_results (id, student_id, course_id, mid1_marks, mid2_marks, assignment_marks, attendance_marks, total_internal, max_internal, grade, grade_points)
VALUES 
(1, 1, 1, 25, 27, 9, 3, 36, 40, 'A', 8.5),
(2, 1, 2, 28, 29, 10, 4, 38, 40, 'A+', 9.2),
(3, 1, 3, 26, 27, 9, 4, 35, 40, 'A', 8.4),
(4, 1, 4, 29, 30, 10, 5, 39, 40, 'O', 9.8);
