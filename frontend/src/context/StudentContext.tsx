import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  StudentProfile,
  SubjectAttendance,
  TimetableClass,
  AttendanceHistoryEntry,
  PerformanceSubject,
  AiPredictionData,
  NotificationItem,
  ActivityLog,
  AcademicHealthStatus
} from '../types';
import { api } from '../services/api';
import { calculatePercentage, classesRequiredForTarget, safeMissesAllowed } from '../utils/attendanceMath';
import { calculateAiPrediction } from '../utils/aiPrediction';
import { 
  INITIAL_FACULTY,
  INITIAL_STUDENT_PROFILE,
  INITIAL_SUBJECTS,
  INITIAL_TIMETABLE,
  INITIAL_ATTENDANCE_HISTORY,
  INITIAL_PERFORMANCE,
  INITIAL_NOTIFICATIONS
} from '../data/mockStudentData';

interface StudentContextType {
  profile: StudentProfile;
  student: StudentProfile;
  subjects: SubjectAttendance[];
  subjectAttendance: SubjectAttendance[];
  timetable: TimetableClass[];
  attendanceHistory: AttendanceHistoryEntry[];
  performance: PerformanceSubject[];
  prediction: AiPredictionData;
  notifications: NotificationItem[];
  activityLogs: ActivityLog[];
  auditLogs: ActivityLog[];
  facultyList: any[];
  isLoading: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedSubject: SubjectAttendance | null;
  setSelectedSubject: (subject: SubjectAttendance | null) => void;
  globalTarget: number;
  setGlobalTarget: (target: number) => void;

  // Computed metrics
  overallAttendancePercentage: number;
  totalClassesAttended: number;
  totalClassesHeld: number;
  overallStats: {
    overallPercentage: number;
    totalAttended: number;
    totalHeld: number;
    totalMissed: number;
    classesCanMiss: number;
  };
  academicAverage: number;
  academicHealth: AcademicHealthStatus;
  currentStreak: number;
  bestStreak: number;
  nextClass: TimetableClass | null;
  todayClasses: TimetableClass[];
  unreadNotifsCount: number;

  // Actions
  recordAttendanceDecision: (courseCode: string, attended: boolean) => Promise<void>;
  simulateAttendance: (courseCodeOrId: string, action: 'attend' | 'miss') => void;
  resetSimulation: () => void;
  updateSubjectTarget: (courseCode: string, target: number) => void;
  importTimetable: (classes: TimetableClass[]) => Promise<{ importedCount: number; message: string }>;
  importTimetableFromCSV: (csvString: string) => boolean;
  markNotificationRead: (id: string) => void;
  resetAllDemoData: () => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const defaultProfile: StudentProfile = {
    ...INITIAL_STUDENT_PROFILE,
    name: INITIAL_STUDENT_PROFILE.fullName,
    email: INITIAL_STUDENT_PROFILE.collegeEmail,
    program: INITIAL_STUDENT_PROFILE.degree + ' in ' + INITIAL_STUDENT_PROFILE.department,
    streakCount: 8
  };

  const defaultSubjects: SubjectAttendance[] = INITIAL_SUBJECTS.map((s, index) => ({
    ...s,
    id: s.courseCode.toLowerCase(),
    subjectName: s.courseName,
    attended: s.classesAttended,
    totalHeld: s.classesHeld,
    room: index % 2 === 0 ? 'CSE-204' : 'LAB-3',
    facultyEmail: s.facultyName.toLowerCase().replace(/[^a-z]/g, '') + '@aditya.ac.in',
    status: s.classesAttended / s.classesHeld >= 0.75 ? 'GOOD' : 'CRITICAL'
  }));

  const defaultTimetable: TimetableClass[] = INITIAL_TIMETABLE.map((t, i) => ({
    ...t,
    period: (i % 6) + 1,
    timeSlot: `${t.startTime} - ${t.endTime}`,
    room: t.roomNumber
  }));

  const defaultPerformance: PerformanceSubject[] = INITIAL_PERFORMANCE.map(p => ({
    ...p,
    subjectName: p.courseName,
    internalMarks: p.totalInternal,
    maxInternalMarks: p.maxInternal,
    grade: p.predictedGrade
  }));

  const [profile, setProfile] = useState<StudentProfile>(defaultProfile);
  const [subjects, setSubjects] = useState<SubjectAttendance[]>(defaultSubjects);
  const [timetable, setTimetable] = useState<TimetableClass[]>(defaultTimetable);
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceHistoryEntry[]>(INITIAL_ATTENDANCE_HISTORY);
  const [performance, setPerformance] = useState<PerformanceSubject[]>(defaultPerformance);
  const [prediction, setPrediction] = useState<AiPredictionData>(calculateAiPrediction(defaultSubjects));
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedSubject, setSelectedSubject] = useState<SubjectAttendance | null>(null);
  const [globalTarget, setGlobalTarget] = useState<number>(75);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [prof, subs, tt, hist, perf, notifs, logs] = await Promise.all([
        api.getStudentProfile('current'),
        api.getSubjectAttendance('current'),
        api.getTimetable('current'),
        api.getAttendanceHistory('current'),
        api.getPerformance('current'),
        api.getNotifications(),
        api.getActivityLogs()
      ]);

      // Enrich profile with name and email aliases
      const enrichedProfile = {
        ...prof,
        name: prof.fullName,
        email: prof.collegeEmail,
        program: prof.degree + ' in ' + prof.department,
        streakCount: 8
      };

      // Enrich subjects with helper fields (id, subjectName, attended, totalHeld)
      const enrichedSubs = subs.map((s, index) => ({
        ...s,
        id: s.courseCode.toLowerCase(),
        subjectName: s.courseName,
        attended: s.classesAttended,
        totalHeld: s.classesHeld,
        room: index % 2 === 0 ? 'CSE-204' : 'LAB-3',
        facultyEmail: s.facultyName.toLowerCase().replace(/[^a-z]/g, '') + '@aditya.ac.in',
        status: s.classesAttended / s.classesHeld >= 0.75 ? 'GOOD' : 'CRITICAL'
      }));

      // Enrich performance with helper fields
      const enrichedPerf = perf.map(p => ({
        ...p,
        subjectName: p.courseName,
        internalMarks: p.totalInternal,
        maxInternalMarks: p.maxInternal,
        grade: p.predictedGrade
      }));

      // Enrich timetable with helper fields
      const enrichedTt = tt.map((t, i) => ({
        ...t,
        period: (i % 6) + 1,
        timeSlot: `${t.startTime} - ${t.endTime}`,
        room: t.roomNumber
      }));

      setProfile(enrichedProfile);
      setSubjects(enrichedSubs);
      setTimetable(enrichedTt);
      setAttendanceHistory(hist);
      setPerformance(enrichedPerf);
      setNotifications(notifs);
      setActivityLogs(logs);

      // Compute initial AI prediction from subjects
      const pred = calculateAiPrediction(enrichedSubs);
      setPrediction(pred);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // OVERALL TOTALS
  const totalClassesAttended = useMemo(() => {
    return subjects.reduce((sum, s) => sum + s.classesAttended, 0);
  }, [subjects]);

  const totalClassesHeld = useMemo(() => {
    return subjects.reduce((sum, s) => sum + s.classesHeld, 0);
  }, [subjects]);

  const overallAttendancePercentage = useMemo(() => {
    return calculatePercentage(totalClassesAttended, totalClassesHeld);
  }, [totalClassesAttended, totalClassesHeld]);

  const overallStats = useMemo(() => {
    const totalMissed = totalClassesHeld - totalClassesAttended;
    const classesCanMiss = safeMissesAllowed(totalClassesAttended, totalClassesHeld, 75);
    return {
      overallPercentage: overallAttendancePercentage,
      totalAttended: totalClassesAttended,
      totalHeld: totalClassesHeld,
      totalMissed,
      classesCanMiss
    };
  }, [totalClassesAttended, totalClassesHeld, overallAttendancePercentage]);

  const academicAverage = useMemo(() => {
    if (performance.length === 0) return 82;
    const totalInternal = performance.reduce((sum, p) => sum + p.totalInternal, 0);
    const totalMax = performance.reduce((sum, p) => sum + p.maxInternal, 0);
    return Math.round((totalInternal / totalMax) * 100);
  }, [performance]);

  // ACADEMIC HEALTH ENGINE
  const academicHealth: AcademicHealthStatus = useMemo(() => {
    if (overallAttendancePercentage >= 85 && academicAverage >= 80) return 'EXCELLENT';
    if (overallAttendancePercentage >= 75) return 'STABLE';
    if (overallAttendancePercentage >= 65) return 'NEEDS_ATTENTION';
    return 'CRITICAL';
  }, [overallAttendancePercentage, academicAverage]);

  // ATTENDANCE STREAK
  const currentStreak = 8;
  const bestStreak = 14;

  // DETERMINING TODAY'S CLASSES & NEXT CLASS
  const { todayClasses, nextClass } = useMemo(() => {
    const todayDay: TimetableClass['dayOfWeek'] = 'MONDAY';
    const dayClasses = timetable.filter(t => t.dayOfWeek.toUpperCase() === todayDay);
    const heroNext = dayClasses.find(c => c.courseCode === '241CS019') || dayClasses[1] || dayClasses[0] || null;

    return {
      todayClasses: dayClasses,
      nextClass: heroNext
    };
  }, [timetable]);

  const unreadNotifsCount = useMemo(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  // ACTIONS
  const recordAttendanceDecision = async (courseCode: string, attended: boolean) => {
    const updated = await api.recordClassAttendanceDecision(courseCode, attended);
    const enriched = updated.map((s, idx) => ({
      ...s,
      id: s.courseCode.toLowerCase(),
      subjectName: s.courseName,
      attended: s.classesAttended,
      totalHeld: s.classesHeld,
      room: idx % 2 === 0 ? 'CSE-204' : 'LAB-3',
      facultyEmail: s.facultyName.toLowerCase().replace(/[^a-z]/g, '') + '@aditya.ac.in',
      status: s.classesAttended / s.classesHeld >= 0.75 ? 'GOOD' : 'CRITICAL'
    }));
    setSubjects(enriched);
    setPrediction(calculateAiPrediction(enriched));
  };

  const simulateAttendance = (courseCodeOrId: string, action: 'attend' | 'miss') => {
    const code = courseCodeOrId.toLowerCase().includes('api') || courseCodeOrId === '241cs019' ? '241CS019' : courseCodeOrId;
    recordAttendanceDecision(code, action === 'attend');
  };

  const resetSimulation = () => {
    loadData();
  };

  const updateSubjectTarget = (courseCode: string, target: number) => {
    const updated = subjects.map(s => {
      if (s.courseCode === courseCode) {
        return {
          ...s,
          targetPercentage: target,
          classesRequiredForTarget: classesRequiredForTarget(s.classesAttended, s.classesHeld, target),
          safeBunksAllowed: safeMissesAllowed(s.classesAttended, s.classesHeld, target)
        };
      }
      return s;
    });
    setSubjects(updated);
  };

  const importTimetable = async (classes: TimetableClass[]) => {
    const res = await api.importTimetableCsv(classes);
    setTimetable(classes);
    return res;
  };

  const importTimetableFromCSV = (csvContent: string): boolean => {
    try {
      const lines = csvContent.trim().split('\n');
      if (lines.length < 2) return false;
      const parsed: TimetableClass[] = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const cols = line.split(',').map(c => c.trim().replace(/^"|"$/g, ''));
        if (cols.length >= 7) {
          parsed.push({
            id: `CSV-${i}`,
            dayOfWeek: cols[0].toUpperCase(),
            startTime: cols[2].split('-')[0]?.trim() || '09:00',
            endTime: cols[2].split('-')[1]?.trim() || '10:00',
            courseCode: cols[3],
            subjectName: cols[4],
            facultyName: cols[5],
            roomNumber: cols[6],
            room: cols[6],
            type: cols[7] || 'THEORY',
            period: parseInt(cols[1], 10) || i,
            timeSlot: cols[2]
          });
        }
      }
      if (parsed.length > 0) {
        setTimetable(parsed);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const markNotificationRead = (id: string) => {
    api.markNotificationRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const resetAllDemoData = () => {
    api.resetDemoData();
    loadData();
  };

  return (
    <StudentContext.Provider
      value={{
        profile,
        student: profile,
        subjects,
        subjectAttendance: subjects,
        timetable,
        attendanceHistory,
        performance,
        prediction,
        notifications,
        activityLogs,
        auditLogs: activityLogs,
        facultyList: INITIAL_FACULTY,
        isLoading,
        activeTab,
        setActiveTab,
        selectedSubject,
        setSelectedSubject,
        globalTarget,
        setGlobalTarget,
        overallAttendancePercentage,
        totalClassesAttended,
        totalClassesHeld,
        overallStats,
        academicAverage,
        academicHealth,
        currentStreak,
        bestStreak,
        nextClass,
        todayClasses,
        unreadNotifsCount,
        recordAttendanceDecision,
        simulateAttendance,
        resetSimulation,
        updateSubjectTarget,
        importTimetable,
        importTimetableFromCSV,
        markNotificationRead,
        resetAllDemoData
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};
