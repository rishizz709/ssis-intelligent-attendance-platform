// Domain Types for Smart Student Information System (SSIS)
// Designed for Aditya University - Department of AI & ML

export type UserRole = 'STUDENT' | 'FACULTY' | 'ADMIN';

export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'OD' | 'LEAVE';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type AcademicHealthStatus = 'EXCELLENT' | 'STABLE' | 'NEEDS_ATTENTION' | 'CRITICAL';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  studentId?: string;
  facultyId?: string;
  department?: string;
  avatarUrl?: string;
}

export interface StudentProfile {
  studentId: string;
  fullName: string;
  name?: string;
  rollNumber: string;
  collegeEmail: string;
  email?: string;
  department: string;
  degree: string;
  program?: string;
  semester: number | string;
  section: string;
  academicYear: string;
  admissionYear: number;
  phone: string;
  dateOfBirth: string;
  bloodGroup: string;
  mentorName: string;
  mentorContact: string;
  cgpa: number;
  totalCredits: number;
  completedCredits: number;
  streakCount?: number;
}

export interface SubjectAttendance {
  id?: string;
  courseCode: string;
  courseName: string;
  subjectName?: string;
  shortName: string;
  facultyName: string;
  facultyEmail?: string;
  room?: string;
  credits: number;
  classesHeld: number;
  totalHeld?: number;
  classesAttended: number;
  attended?: number;
  percentage: number;
  targetPercentage: number;
  classesRequiredForTarget: number;
  safeBunksAllowed: number;
  riskLevel: RiskLevel;
  status?: string;
  trend: 'UP' | 'DOWN' | 'STABLE';
  lastAttendedDate?: string;
  isElective?: boolean;
}

export interface TimetableClass {
  id: string;
  dayOfWeek: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | string;
  startTime: string; // '10:00'
  endTime: string;   // '11:00'
  courseCode: string;
  subjectName: string;
  facultyName: string;
  roomNumber?: string;
  room?: string;
  type: 'THEORY' | 'LAB' | 'TUTORIAL' | 'LECTURE' | string;
  period?: number;
  timeSlot?: string;
}

export type TimetableEntry = TimetableClass;

export interface AttendanceHistoryEntry {
  id: string;
  date: string; // 'YYYY-MM-DD'
  day: string;  // 'MON'
  courseCode: string;
  subjectName: string;
  timeSlot: string;
  status: AttendanceStatus;
  facultyName: string;
}

export interface PerformanceSubject {
  courseCode: string;
  courseName: string;
  subjectName?: string;
  mid1Marks: number;     // max 30
  mid2Marks: number;     // max 30
  assignmentMarks: number; // max 10
  attendanceMarks: number; // max 5
  internalMarks?: number;
  totalInternal: number; // max 40
  maxInternal: number;
  maxInternalMarks?: number;
  grade?: string;
  predictedGrade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'F' | string;
  gradePoints: number;
}

export interface AiPredictionData {
  currentOverallPercentage: number;
  projectedSemesterPercentage: number;
  forecastedPercentage?: number;
  confidenceLower: number;
  confidenceUpper: number;
  confidenceScore: number; // 0 - 100
  trend: 'IMPROVING' | 'DECLINING' | 'STABLE';
  velocityPerWeek: number; // e.g. +0.8%
  remainingTotalClassesEstimate: number;
  confidenceInterval?: {
    lower: number;
    upper: number;
  };
  featuresUsed: {
    name: string;
    weight: string;
    impact: string;
  }[];
  scenarios: {
    label: string;
    attendanceRatio: number;
    projectedPercentage: number;
    difference: number;
    status: 'EXCELLENT' | 'SAFE' | 'BORDERLINE' | 'CRITICAL';
  }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  severity: 'INFO' | 'WARNING' | 'SUCCESS' | 'CRITICAL';
  read: boolean;
  category: 'ATTENDANCE' | 'CLASS' | 'TIMETABLE' | 'EXAM' | 'SYSTEM';
  actionUrl?: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  department: string;
  designation: string;
  email: string;
  roomNumber?: string;
  cabin?: string;
  subject?: string;
  officeHours?: string;
  subjectsTaught: string[];
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  userEmail: string;
  user?: string;
  action: string;
  details: string;
  ipAddress: string;
  executionTimeMs?: number;
}
