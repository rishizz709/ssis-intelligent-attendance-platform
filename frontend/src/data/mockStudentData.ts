import {
  StudentProfile,
  SubjectAttendance,
  TimetableClass,
  AttendanceHistoryEntry,
  PerformanceSubject,
  NotificationItem,
  FacultyMember,
  User
} from '../types';
import { calculatePercentage, classesRequiredForTarget, safeMissesAllowed } from '../utils/attendanceMath';

export const DEMO_USERS: User[] = [
  {
    id: 'USR-001',
    email: 'rishi.24b11ai051@aditya.ac.in',
    name: 'B. Rishi Vardhan',
    role: 'STUDENT',
    studentId: '24B11AI051',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'USR-002',
    email: 'student1@adityauniversity.in',
    name: 'Priya Sharma',
    role: 'STUDENT',
    studentId: '24B11AI082',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'USR-003',
    email: 'student2@adityauniversity.in',
    name: 'K. Ashok Kumar',
    role: 'STUDENT',
    studentId: '24B11AI160',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'USR-004',
    email: 'nirmala.faculty@aditya.ac.in',
    name: 'Kumari',
    role: 'FACULTY',
    facultyId: 'FAC-201',
    department: 'Computer Science & Engineering',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'USR-005',
    email: 'dean.admin@aditya.ac.in',
    name: 'Dean Academic Affairs',
    role: 'ADMIN',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  studentId: '24B11AI051',
  fullName: 'B. Rishi Vardhan',
  rollNumber: '24B11AI051',
  collegeEmail: 'rishi@adityauniversity.in',
  department: 'Artificial Intelligence and Machine Learning',
  degree: 'B.Tech (Honors)',
  semester: 5,
  section: 'Section A',
  academicYear: '2026–2027',
  admissionYear: 2024,
  phone: '+91 98480 22334',
  dateOfBirth: '2005-08-14',
  bloodGroup: 'O+',
  mentorName: 'Dr. T. Rama Krishna',
  mentorContact: '+91 94401 88992',
  cgpa: 8.74,
  totalCredits: 160,
  completedCredits: 96
};

// Exact requested subject numbers: Total Attended = 334, Total Held = 434 (76.96%)
export const INITIAL_SUBJECTS: SubjectAttendance[] = [
  {
    courseCode: '241CS017',
    courseName: 'Object Oriented Analysis & Design (OOAD UML)',
    shortName: 'OOAD & UML',
    facultyName: 'Sunkavilli Vijaya Nirmala',
    credits: 4,
    classesHeld: 56,
    classesAttended: 40,
    percentage: 71.43,
    targetPercentage: 75,
    classesRequiredForTarget: classesRequiredForTarget(40, 56, 75), // 8 classes
    safeBunksAllowed: safeMissesAllowed(40, 56, 75),
    riskLevel: 'MEDIUM',
    trend: 'UP',
    lastAttendedDate: '2026-09-28'
  },
  {
    courseCode: '241AI021',
    courseName: 'Machine Learning Foundations & Applications',
    shortName: 'Machine Learning',
    facultyName: 'Dr. Ch. Srinivas Rao',
    credits: 4,
    classesHeld: 72,
    classesAttended: 52,
    percentage: 72.22,
    targetPercentage: 75,
    classesRequiredForTarget: classesRequiredForTarget(52, 72, 75), // 8 classes
    safeBunksAllowed: safeMissesAllowed(52, 72, 75),
    riskLevel: 'MEDIUM',
    trend: 'UP',
    lastAttendedDate: '2026-09-27'
  },
  {
    courseCode: '241AI023',
    courseName: 'Soft Computing & Fuzzy Neural Networks',
    shortName: 'Soft Computing',
    facultyName: 'Prof. K. Satyanarayana',
    credits: 3,
    classesHeld: 57,
    classesAttended: 36,
    percentage: 63.16,
    targetPercentage: 75,
    classesRequiredForTarget: classesRequiredForTarget(36, 57, 75), // 27 classes
    safeBunksAllowed: safeMissesAllowed(36, 57, 75),
    riskLevel: 'HIGH',
    trend: 'DOWN',
    lastAttendedDate: '2026-09-25'
  },
  {
    courseCode: '241CS019',
    courseName: 'API Design & Microservices Architecture',
    shortName: 'API & Micro Services',
    facultyName: 'Kumari',
    credits: 4,
    classesHeld: 81,
    classesAttended: 81,
    percentage: 100.0,
    targetPercentage: 75,
    classesRequiredForTarget: 0,
    safeBunksAllowed: safeMissesAllowed(81, 81, 75), // 27 safe bunks
    riskLevel: 'LOW',
    trend: 'STABLE',
    lastAttendedDate: '2026-09-29'
  },
  {
    courseCode: '241CS015',
    courseName: 'Computer Networks & Distributed Protocols',
    shortName: 'Computer Networks',
    facultyName: 'Smt. P. Hema Latha',
    credits: 3,
    classesHeld: 13,
    classesAttended: 10,
    percentage: 76.92,
    targetPercentage: 75,
    classesRequiredForTarget: 0,
    safeBunksAllowed: safeMissesAllowed(10, 13, 75),
    riskLevel: 'LOW',
    trend: 'UP',
    lastAttendedDate: '2026-09-29'
  },
  {
    courseCode: '241AI025',
    courseName: 'Computer Vision & Visual Perception',
    shortName: 'Computer Vision',
    facultyName: 'Dr. M. Venkata Reddy',
    credits: 3,
    classesHeld: 50,
    classesAttended: 37,
    percentage: 74.0,
    targetPercentage: 75,
    classesRequiredForTarget: classesRequiredForTarget(37, 50, 75), // 2 classes
    safeBunksAllowed: safeMissesAllowed(37, 50, 75),
    riskLevel: 'MEDIUM',
    trend: 'UP',
    lastAttendedDate: '2026-09-28'
  },
  {
    courseCode: '241HS009',
    courseName: 'Employability Skills & Professional Readiness IV',
    shortName: 'Employability Skill-IV',
    facultyName: 'Mr. David J. Morris',
    credits: 2,
    classesHeld: 78,
    classesAttended: 54,
    percentage: 69.23,
    targetPercentage: 75,
    classesRequiredForTarget: classesRequiredForTarget(54, 78, 75), // 18 classes
    safeBunksAllowed: safeMissesAllowed(54, 78, 75),
    riskLevel: 'HIGH',
    trend: 'UP',
    lastAttendedDate: '2026-09-26'
  },
  {
    courseCode: '241HS005',
    courseName: 'Engineering Economics & Project Management',
    shortName: 'Engineering Economics',
    facultyName: 'Dr. G. Lakshmi Prasanna',
    credits: 3,
    classesHeld: 27,
    classesAttended: 24,
    percentage: 88.89,
    targetPercentage: 75,
    classesRequiredForTarget: 0,
    safeBunksAllowed: safeMissesAllowed(24, 27, 75), // 5 safe bunks
    riskLevel: 'LOW',
    trend: 'STABLE',
    lastAttendedDate: '2026-09-27'
  }
];

export const INITIAL_TIMETABLE: TimetableClass[] = [
  // Monday
  { id: 'TT-M1', dayOfWeek: 'MONDAY', startTime: '09:00', endTime: '10:00', courseCode: '241CS015', subjectName: 'Computer Networks', facultyName: 'Smt. P. Hema Latha', roomNumber: 'CSE-202', type: 'THEORY' },
  { id: 'TT-M2', dayOfWeek: 'MONDAY', startTime: '10:00', endTime: '11:00', courseCode: '241CS019', subjectName: 'API & Micro Services', facultyName: 'Kumari', roomNumber: 'CSE-204', type: 'THEORY' },
  { id: 'TT-M3', dayOfWeek: 'MONDAY', startTime: '11:15', endTime: '12:15', courseCode: '241AI021', subjectName: 'Machine Learning', facultyName: 'Dr. Ch. Srinivas Rao', roomNumber: 'AI-101', type: 'THEORY' },
  { id: 'TT-M4', dayOfWeek: 'MONDAY', startTime: '13:00', endTime: '15:00', courseCode: '241CS019', subjectName: 'API & Micro Services Lab', facultyName: 'Kumari', roomNumber: 'Lab-4', type: 'LAB' },
  { id: 'TT-M5', dayOfWeek: 'MONDAY', startTime: '15:00', endTime: '16:00', courseCode: '241AI023', subjectName: 'Soft Computing', facultyName: 'Prof. K. Satyanarayana', roomNumber: 'CSE-204', type: 'THEORY' },

  // Tuesday
  { id: 'TT-T1', dayOfWeek: 'TUESDAY', startTime: '09:00', endTime: '10:00', courseCode: '241CS019', subjectName: 'API & Micro Services', facultyName: 'Kumari', roomNumber: 'AI-102', type: 'THEORY' },
  { id: 'TT-T2', dayOfWeek: 'TUESDAY', startTime: '10:00', endTime: '11:00', courseCode: '241AI025', subjectName: 'Computer Vision', facultyName: 'Dr. M. Venkata Reddy', roomNumber: 'CSE-204', type: 'THEORY' },
  { id: 'TT-T3', dayOfWeek: 'TUESDAY', startTime: '11:15', endTime: '12:15', courseCode: '241CS017', subjectName: 'OOAD & UML', facultyName: 'Sunkavilli Vijaya Nirmala', roomNumber: 'CSE-204', type: 'THEORY' },
  { id: 'TT-T4', dayOfWeek: 'TUESDAY', startTime: '13:00', endTime: '14:00', courseCode: '241HS005', subjectName: 'Engineering Economics', facultyName: 'Dr. G. Lakshmi Prasanna', roomNumber: 'CSE-103', type: 'THEORY' },
  { id: 'TT-T5', dayOfWeek: 'TUESDAY', startTime: '14:00', endTime: '16:00', courseCode: '241AI021', subjectName: 'Machine Learning Lab', facultyName: 'Dr. Ch. Srinivas Rao', roomNumber: 'AI-Lab 2', type: 'LAB' },

  // Wednesday
  { id: 'TT-W1', dayOfWeek: 'WEDNESDAY', startTime: '09:00', endTime: '10:00', courseCode: '241AI021', subjectName: 'Machine Learning', facultyName: 'Dr. Ch. Srinivas Rao', roomNumber: 'AI-101', type: 'THEORY' },
  { id: 'TT-W2', dayOfWeek: 'WEDNESDAY', startTime: '10:00', endTime: '11:00', courseCode: '241AI023', subjectName: 'Soft Computing', facultyName: 'Prof. K. Satyanarayana', roomNumber: 'CSE-204', type: 'THEORY' },
  { id: 'TT-W3', dayOfWeek: 'WEDNESDAY', startTime: '11:15', endTime: '12:15', courseCode: '241CS015', subjectName: 'Computer Networks', facultyName: 'Smt. P. Hema Latha', roomNumber: 'CSE-202', type: 'THEORY' },
  { id: 'TT-W4', dayOfWeek: 'WEDNESDAY', startTime: '13:00', endTime: '15:00', courseCode: '241HS009', subjectName: 'Employability Skill-IV', facultyName: 'Mr. David J. Morris', roomNumber: 'Auditorium-2', type: 'TUTORIAL' },

  // Thursday
  { id: 'TT-TH1', dayOfWeek: 'THURSDAY', startTime: '09:00', endTime: '10:00', courseCode: '241CS017', subjectName: 'OOAD & UML', facultyName: 'Sunkavilli Vijaya Nirmala', roomNumber: 'CSE-204', type: 'THEORY' },
  { id: 'TT-TH2', dayOfWeek: 'THURSDAY', startTime: '10:00', endTime: '11:00', courseCode: '241CS019', subjectName: 'API & Micro Services', facultyName: 'Kumari', roomNumber: 'AI-102', type: 'THEORY' },
  { id: 'TT-TH3', dayOfWeek: 'THURSDAY', startTime: '11:15', endTime: '12:15', courseCode: '241AI025', subjectName: 'Computer Vision', facultyName: 'Dr. M. Venkata Reddy', roomNumber: 'CSE-204', type: 'THEORY' },
  { id: 'TT-TH4', dayOfWeek: 'THURSDAY', startTime: '13:00', endTime: '15:00', courseCode: '241AI025', subjectName: 'Computer Vision Lab', facultyName: 'Dr. M. Venkata Reddy', roomNumber: 'CV-Lab', type: 'LAB' },

  // Friday
  { id: 'TT-F1', dayOfWeek: 'FRIDAY', startTime: '09:00', endTime: '10:00', courseCode: '241AI023', subjectName: 'Soft Computing', facultyName: 'Prof. K. Satyanarayana', roomNumber: 'CSE-204', type: 'THEORY' },
  { id: 'TT-F2', dayOfWeek: 'FRIDAY', startTime: '10:00', endTime: '11:00', courseCode: '241AI021', subjectName: 'Machine Learning', facultyName: 'Dr. Ch. Srinivas Rao', roomNumber: 'AI-101', type: 'THEORY' },
  { id: 'TT-F3', dayOfWeek: 'FRIDAY', startTime: '11:15', endTime: '12:15', courseCode: '241HS005', subjectName: 'Engineering Economics', facultyName: 'Dr. G. Lakshmi Prasanna', roomNumber: 'CSE-103', type: 'THEORY' },
  { id: 'TT-F4', dayOfWeek: 'FRIDAY', startTime: '13:00', endTime: '14:00', courseCode: '241CS015', subjectName: 'Computer Networks', facultyName: 'Smt. P. Hema Latha', roomNumber: 'CSE-202', type: 'THEORY' },

  // Saturday
  { id: 'TT-S1', dayOfWeek: 'SATURDAY', startTime: '09:00', endTime: '11:00', courseCode: '241CS017', subjectName: 'OOAD Case Studies Workshop', facultyName: 'Sunkavilli Vijaya Nirmala', roomNumber: 'Seminar Hall 3', type: 'TUTORIAL' },
  { id: 'TT-S2', dayOfWeek: 'SATURDAY', startTime: '11:15', endTime: '13:00', courseCode: '241AI021', subjectName: 'AI Capstone Project Clinic', facultyName: 'Dr. Ch. Srinivas Rao', roomNumber: 'AI Project Center', type: 'LAB' }
];

export const INITIAL_ATTENDANCE_HISTORY: AttendanceHistoryEntry[] = [
  { id: 'AH-01', date: '2026-09-30', day: 'WED', courseCode: '241AI021', subjectName: 'Machine Learning', timeSlot: '09:00 - 10:00', status: 'PRESENT', facultyName: 'Dr. Ch. Srinivas Rao' },
  { id: 'AH-02', date: '2026-09-30', day: 'WED', courseCode: '241AI023', subjectName: 'Soft Computing', timeSlot: '10:00 - 11:00', status: 'ABSENT', facultyName: 'Prof. K. Satyanarayana' },
  { id: 'AH-03', date: '2026-09-30', day: 'WED', courseCode: '241CS015', subjectName: 'Computer Networks', timeSlot: '11:15 - 12:15', status: 'PRESENT', facultyName: 'Smt. P. Hema Latha' },
  { id: 'AH-04', date: '2026-09-29', day: 'TUE', courseCode: '241CS019', subjectName: 'API & Micro Services', timeSlot: '09:00 - 10:00', status: 'PRESENT', facultyName: 'Kumari' },
  { id: 'AH-05', date: '2026-09-29', day: 'TUE', courseCode: '241AI025', subjectName: 'Computer Vision', timeSlot: '10:00 - 11:00', status: 'PRESENT', facultyName: 'Dr. M. Venkata Reddy' },
  { id: 'AH-06', date: '2026-09-29', day: 'TUE', courseCode: '241CS017', subjectName: 'OOAD & UML', timeSlot: '11:15 - 12:15', status: 'PRESENT', facultyName: 'Sunkavilli Vijaya Nirmala' },
  { id: 'AH-07', date: '2026-09-28', day: 'MON', courseCode: '241CS015', subjectName: 'Computer Networks', timeSlot: '09:00 - 10:00', status: 'PRESENT', facultyName: 'Smt. P. Hema Latha' },
  { id: 'AH-08', date: '2026-09-28', day: 'MON', courseCode: '241CS017', subjectName: 'OOAD & UML', timeSlot: '10:00 - 11:00', status: 'PRESENT', facultyName: 'Sunkavilli Vijaya Nirmala' },
  { id: 'AH-09', date: '2026-09-28', day: 'MON', courseCode: '241AI021', subjectName: 'Machine Learning', timeSlot: '11:15 - 12:15', status: 'PRESENT', facultyName: 'Dr. Ch. Srinivas Rao' },
  { id: 'AH-10', date: '2026-09-28', day: 'MON', courseCode: '241AI023', subjectName: 'Soft Computing', timeSlot: '15:00 - 16:00', status: 'OD', facultyName: 'Prof. K. Satyanarayana' }
];

export const INITIAL_PERFORMANCE: PerformanceSubject[] = [
  { courseCode: '241CS017', courseName: 'OOAD & UML', mid1Marks: 26, mid2Marks: 27, assignmentMarks: 9.5, attendanceMarks: 4, totalInternal: 36, maxInternal: 40, predictedGrade: 'A+', gradePoints: 10 },
  { courseCode: '241AI021', courseName: 'Machine Learning', mid1Marks: 24, mid2Marks: 25, assignmentMarks: 9.0, attendanceMarks: 4, totalInternal: 33.5, maxInternal: 40, predictedGrade: 'A', gradePoints: 9 },
  { courseCode: '241AI023', courseName: 'Soft Computing', mid1Marks: 19, mid2Marks: 21, assignmentMarks: 7.5, attendanceMarks: 3, totalInternal: 27.5, maxInternal: 40, predictedGrade: 'B+', gradePoints: 8 },
  { courseCode: '241CS019', courseName: 'API & Micro Services', mid1Marks: 29, mid2Marks: 28, assignmentMarks: 10.0, attendanceMarks: 5, totalInternal: 39, maxInternal: 40, predictedGrade: 'A+', gradePoints: 10 },
  { courseCode: '241CS015', courseName: 'Computer Networks', mid1Marks: 25, mid2Marks: 26, assignmentMarks: 9.0, attendanceMarks: 4, totalInternal: 34.5, maxInternal: 40, predictedGrade: 'A', gradePoints: 9 },
  { courseCode: '241AI025', courseName: 'Computer Vision', mid1Marks: 23, mid2Marks: 24, assignmentMarks: 8.5, attendanceMarks: 4, totalInternal: 32, maxInternal: 40, predictedGrade: 'A', gradePoints: 9 },
  { courseCode: '241HS009', courseName: 'Employability Skills IV', mid1Marks: 22, mid2Marks: 23, assignmentMarks: 8.0, attendanceMarks: 3.5, totalInternal: 30, maxInternal: 40, predictedGrade: 'B+', gradePoints: 8 },
  { courseCode: '241HS005', courseName: 'Engineering Economics', mid1Marks: 27, mid2Marks: 26, assignmentMarks: 9.5, attendanceMarks: 4.5, totalInternal: 36.5, maxInternal: 40, predictedGrade: 'A+', gradePoints: 10 }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'NOTIF-01',
    title: 'Soft Computing Attendance Alert',
    message: 'Your Soft Computing attendance is currently at 63.16%, below the university 75% target threshold.',
    timestamp: '15 mins ago',
    severity: 'CRITICAL',
    read: false,
    category: 'ATTENDANCE',
    actionUrl: 'planner'
  },
  {
    id: 'NOTIF-02',
    title: 'Next Class Alert: API & Micro Services',
    message: 'Your next class API & Micro Services starts at 10:00 AM in Room CSE-204 with Kumari.',
    timestamp: '40 mins ago',
    severity: 'INFO',
    read: false,
    category: 'CLASS'
  },
  {
    id: 'NOTIF-03',
    title: 'AI Attendance Projection Available',
    message: 'AI Model predicts semester attendance will reach 79.24% with sustained momentum.',
    timestamp: '2 hours ago',
    severity: 'SUCCESS',
    read: true,
    category: 'EXAM'
  },
  {
    id: 'NOTIF-04',
    title: 'Timetable Synchronization Verified',
    message: 'Semester 5 timetable confirmed. 28 contact sessions scheduled for this academic week.',
    timestamp: '1 day ago',
    severity: 'INFO',
    read: true,
    category: 'TIMETABLE'
  }
];

export const FACULTY_DIRECTORY: FacultyMember[] = [
  {
    id: 'FAC-101',
    name: 'Sunkavilli Vijaya Nirmala',
    department: 'Computer Science & Engineering',
    designation: 'Associate Professor',
    email: 'vijayanirmala@adityauniversity.in',
    roomNumber: 'Cabin CSE-304, Ramanujan Block',
    subjectsTaught: ['OOAD & UML', 'Software Engineering']
  },
  {
    id: 'FAC-102',
    name: 'Dr. Ch. Srinivas Rao',
    department: 'Artificial Intelligence & ML',
    designation: 'Professor & Head of AI Research',
    email: 'srinivas.rao@adityauniversity.in',
    roomNumber: 'Cabin AI-201, Aryabhatta Block',
    subjectsTaught: ['Machine Learning', 'Deep Learning Architectures']
  },
  {
    id: 'FAC-103',
    name: 'Kumari',
    department: 'Computer Science & Engineering',
    designation: 'Assistant Professor',
    email: 'kumari@adityauniversity.in',
    roomNumber: 'Cabin CSE-215, Ramanujan Block',
    subjectsTaught: ['API & Micro Services', 'API & Micro Services Lab']
  },
  {
    id: 'FAC-104',
    name: 'Prof. K. Satyanarayana',
    department: 'Artificial Intelligence & ML',
    designation: 'Assistant Professor',
    email: 'satyanarayana.k@adityauniversity.in',
    roomNumber: 'Cabin AI-108, Aryabhatta Block',
    subjectsTaught: ['Soft Computing', 'Neural Computation']
  },
  {
    id: 'FAC-105',
    name: 'Dr. M. Venkata Reddy',
    department: 'Artificial Intelligence & ML',
    designation: 'Associate Professor',
    email: 'venkatareddy.m@adityauniversity.in',
    roomNumber: 'Cabin AI-210, Aryabhatta Block',
    subjectsTaught: ['Computer Vision', 'Image Processing']
  },
  {
    id: 'FAC-106',
    name: 'Smt. P. Hema Latha',
    department: 'Information Technology',
    designation: 'Assistant Professor',
    email: 'hemalatha.p@adityauniversity.in',
    roomNumber: 'Cabin IT-105, Visvesvaraya Block',
    subjectsTaught: ['Computer Networks', 'Network Security']
  },
  {
    id: 'FAC-107',
    name: 'Dr. G. Lakshmi Prasanna',
    department: 'Management & Humanities',
    designation: 'Associate Professor',
    email: 'lakshmiprasanna.g@adityauniversity.in',
    roomNumber: 'Cabin MBA-102, Kautilya Block',
    subjectsTaught: ['Engineering Economics & Management']
  },
  {
    id: 'FAC-108',
    name: 'Mr. David J. Morris',
    department: 'Career & Employability Cell',
    designation: 'Senior Corporate Trainer',
    email: 'david.morris@adityauniversity.in',
    roomNumber: 'Placement Center, 1st Floor',
    subjectsTaught: ['Employability Skills IV', 'Aptitude & Verbal Mastery']
  }
];

export const INITIAL_FACULTY = FACULTY_DIRECTORY;
