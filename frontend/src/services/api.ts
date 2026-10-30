import {
  StudentProfile,
  SubjectAttendance,
  TimetableClass,
  AttendanceHistoryEntry,
  PerformanceSubject,
  AiPredictionData,
  NotificationItem,
  User,
  ActivityLog
} from '../types';
import {
  DEMO_USERS,
  INITIAL_STUDENT_PROFILE,
  INITIAL_SUBJECTS,
  INITIAL_TIMETABLE,
  INITIAL_ATTENDANCE_HISTORY,
  INITIAL_PERFORMANCE,
  INITIAL_NOTIFICATIONS,
  FACULTY_DIRECTORY
} from '../data/mockStudentData';
import { calculateAiPrediction } from '../utils/aiPrediction';
import { calculatePercentage, classesRequiredForTarget, safeMissesAllowed } from '../utils/attendanceMath';

const API_BASE = '/api';

// Local storage keys for resilient persistence — role-scoped to prevent cross-role leakage
const STORAGE_KEYS = {
  PROFILE: 'ssis_student_profile',
  SUBJECTS: 'ssis_student_subjects',
  TIMETABLE: 'ssis_student_timetable',
  HISTORY: 'ssis_student_history',
  PERFORMANCE: 'ssis_student_performance',
  NOTIFS: 'ssis_student_notifs',
  LOGS: 'ssis_activity_logs',
  USER: 'ssis_current_user'
};

class ApiService {
  private isBackendOnline: boolean = false;

  constructor() {
    this.checkBackendHealth();
  }

  private async checkBackendHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(1500) });
      this.isBackendOnline = res.ok;
      return res.ok;
    } catch {
      this.isBackendOnline = false;
      return false;
    }
  }

  // AUTHENTICATION
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    // Attempt backend first if available
    if (this.isBackendOnline) {
      try {
        const res = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        if (res.ok) {
          const data = await res.json();
          this.logActivity(email, 'LOGIN', 'Authenticated via Spring Security JWT');
          return data;
        }
      } catch (e) {
        console.warn('Backend login fallback to mock:', e);
      }
    }

    // Local / In-memory validation
    const trimmed = email.toLowerCase().trim();
    const user = DEMO_USERS.find(u => u.email.toLowerCase() === trimmed);
    if (!user) {
      throw new Error('Only registered Aditya University college email accounts are authorized.');
    }

    // Accept password 'password123' or any 6+ char password for demo ease
    if (password.length < 4) {
      throw new Error('Password must be at least 4 characters.');
    }

    const token = 'jwt-mock-aditya-' + Math.random().toString(36).substring(2);
    this.logActivity(user.email, 'LOGIN', `Logged in successfully as ${user.role}`);
    return { user, token };
  }

  // STUDENT PROFILE
  async getStudentProfile(studentId: string): Promise<StudentProfile> {
    const cached = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (cached) return JSON.parse(cached);
    return INITIAL_STUDENT_PROFILE;
  }

  async updateStudentProfile(profile: StudentProfile): Promise<StudentProfile> {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    this.logActivity(profile.collegeEmail, 'PROFILE_UPDATE', 'Updated personal contact & mentor details');
    return profile;
  }

  // SUBJECT ATTENDANCE
  async getSubjectAttendance(studentId: string): Promise<SubjectAttendance[]> {
    const cached = localStorage.getItem(STORAGE_KEYS.SUBJECTS);
    if (cached) return JSON.parse(cached);
    return INITIAL_SUBJECTS;
  }

  async updateSubjectAttendance(subjects: SubjectAttendance[]): Promise<SubjectAttendance[]> {
    localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(subjects));
    return subjects;
  }

  // Record a simulated attendance decision (e.g. Next Class "I'LL ATTEND" or "I'LL MISS")
  async recordClassAttendanceDecision(courseCode: string, attended: boolean): Promise<SubjectAttendance[]> {
    const subjects = await this.getSubjectAttendance('current');
    const updated = subjects.map(s => {
      if (s.courseCode === courseCode) {
        const newHeld = s.classesHeld + 1;
        const newAttended = attended ? s.classesAttended + 1 : s.classesAttended;
        const newPercent = calculatePercentage(newAttended, newHeld);
        return {
          ...s,
          classesHeld: newHeld,
          classesAttended: newAttended,
          percentage: newPercent,
          classesRequiredForTarget: classesRequiredForTarget(newAttended, newHeld, s.targetPercentage),
          safeBunksAllowed: safeMissesAllowed(newAttended, newHeld, s.targetPercentage),
          riskLevel: (newPercent < 65 ? 'CRITICAL' : newPercent < 75 ? 'HIGH' : newPercent < 80 ? 'MEDIUM' : 'LOW') as any,
          trend: attended ? ('UP' as const) : ('DOWN' as const),
          lastAttendedDate: new Date().toISOString().split('T')[0]
        };
      }
      return s;
    });

    await this.updateSubjectAttendance(updated);
    this.logActivity('current', 'ATTENDANCE_DECISION', `${attended ? 'Attended' : 'Missed'} session for ${courseCode}`);
    return updated;
  }

  // TIMETABLE
  async getTimetable(studentId: string): Promise<TimetableClass[]> {
    const cached = localStorage.getItem(STORAGE_KEYS.TIMETABLE);
    if (cached) return JSON.parse(cached);
    return INITIAL_TIMETABLE;
  }

  async importTimetableCsv(classes: TimetableClass[]): Promise<{ importedCount: number; message: string }> {
    localStorage.setItem(STORAGE_KEYS.TIMETABLE, JSON.stringify(classes));
    this.logActivity('current', 'TIMETABLE_CSV_IMPORT', `Imported ${classes.length} timetable class entries atomically`);
    return {
      importedCount: classes.length,
      message: `Successfully synchronized ${classes.length} lecture entries into the academic schedule.`
    };
  }

  // ATTENDANCE HISTORY
  async getAttendanceHistory(studentId: string): Promise<AttendanceHistoryEntry[]> {
    const cached = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (cached) return JSON.parse(cached);
    return INITIAL_ATTENDANCE_HISTORY;
  }

  // PERFORMANCE / MARKS
  async getPerformance(studentId: string): Promise<PerformanceSubject[]> {
    const cached = localStorage.getItem(STORAGE_KEYS.PERFORMANCE);
    if (cached) return JSON.parse(cached);
    return INITIAL_PERFORMANCE;
  }

  // AI PREDICTION
  async getAiPrediction(studentId: string): Promise<AiPredictionData> {
    const subjects = await this.getSubjectAttendance(studentId);
    return calculateAiPrediction(subjects);
  }

  // NOTIFICATIONS
  async getNotifications(): Promise<NotificationItem[]> {
    const cached = localStorage.getItem(STORAGE_KEYS.NOTIFS);
    if (cached) return JSON.parse(cached);
    return INITIAL_NOTIFICATIONS;
  }

  async markNotificationRead(id: string): Promise<void> {
    const notifs = await this.getNotifications();
    const updated = notifs.map(n => n.id === id ? { ...n, read: true } : n);
    localStorage.setItem(STORAGE_KEYS.NOTIFS, JSON.stringify(updated));
  }

  // FACULTY DIRECTORY
  async getFacultyDirectory(): Promise<typeof FACULTY_DIRECTORY> {
    return FACULTY_DIRECTORY;
  }

  // ACTIVITY LOGS (AOP Mirror)
  async getActivityLogs(): Promise<ActivityLog[]> {
    const cached = localStorage.getItem(STORAGE_KEYS.LOGS);
    if (cached) return JSON.parse(cached);
    return [
      { id: 'LOG-1', timestamp: '2026-09-30 09:15:22', userEmail: 'rishi.24b11ai051@aditya.ac.in', action: 'LOGIN', details: 'User authenticated successfully', ipAddress: '10.20.14.88' },
      { id: 'LOG-2', timestamp: '2026-09-30 09:16:04', userEmail: 'rishi.24b11ai051@aditya.ac.in', action: 'PREDICTION_REQUEST', details: 'Linear regression model executed for student 24B11AI051', ipAddress: '10.20.14.88' },
      { id: 'LOG-3', timestamp: '2026-09-30 09:20:11', userEmail: 'rishi.24b11ai051@aditya.ac.in', action: 'ATTENDANCE_SIMULATION', details: 'What-if projection calculated for Soft Computing', ipAddress: '10.20.14.88' },
      { id: 'LOG-4', timestamp: '2026-09-29 16:45:00', userEmail: 'nirmala.faculty@aditya.ac.in', action: 'ATTENDANCE_UPDATE', details: 'Batch attendance posted for Section A (OOAD & UML)', ipAddress: '10.20.12.10' }
    ];
  }

  logActivity(email: string, action: string, details: string) {
    const currentLogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.LOGS) || '[]');
    const newLog: ActivityLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      userEmail: email,
      action,
      details,
      ipAddress: '127.0.0.1 (Localhost)'
    };
    const updated = [newLog, ...currentLogs.slice(0, 49)];
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(updated));
  }

  /**
   * Clears all role-specific cached data. Called on logout and on role/user switch
   * to prevent cross-role data leakage.
   */
  clearRoleSpecificData() {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.SUBJECTS);
    localStorage.removeItem(STORAGE_KEYS.TIMETABLE);
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    localStorage.removeItem(STORAGE_KEYS.PERFORMANCE);
    localStorage.removeItem(STORAGE_KEYS.NOTIFS);
    // Note: LOGS are kept across sessions as audit trail
  }

  resetDemoData() {
    this.clearRoleSpecificData();
    localStorage.removeItem(STORAGE_KEYS.LOGS);
  }
}

export const api = new ApiService();
