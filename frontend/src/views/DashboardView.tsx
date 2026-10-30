import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { SubjectAttendance } from '../types';
import { calculateAttendanceStatus, calculateSubjectProjection, calculateWhatIfSimulation } from '../utils/attendanceMath';
import { SubjectDetailModal } from './SubjectDetailModal';
import { 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  User, 
  MapPin, 
  Award, 
  Flame, 
  ArrowUpRight, 
  ArrowDownRight, 
  ChevronRight, 
  Sliders, 
  Sparkles, 
  BookOpen, 
  ShieldAlert, 
  BarChart2,
  RefreshCw,
  Info
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

export const DashboardView: React.FC<{ onNavigate?: (tab: string) => void }> = ({ onNavigate }) => {
  const { 
    student, 
    overallStats, 
    subjectAttendance, 
    nextClass, 
    simulateAttendance, 
    resetSimulation 
  } = useStudent();

  const [targetPercentage, setTargetPercentage] = useState<number>(75);
  const [selectedSubject, setSelectedSubject] = useState<SubjectAttendance | null>(null);
  const [subjectFilter, setSubjectFilter] = useState<'all' | 'risk' | 'safe'>('all');
  const [nextClassSimulatedAction, setNextClassSimulatedAction] = useState<'attend' | 'miss' | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Status calculation for overall
  const overallTargetStatus = calculateAttendanceStatus(
    overallStats.totalAttended, 
    overallStats.totalHeld, 
    targetPercentage
  );

  // Next class subject data
  const nextSubjectData = subjectAttendance.find(s => s.courseCode === (nextClass?.courseCode || '241CS019')) || subjectAttendance[0];

  // Dynamic calculations for Next Class
  const nextAttendProjection = calculateSubjectProjection(
    nextSubjectData ? (nextSubjectData.attended ?? nextSubjectData.classesAttended ?? 40) : 40,
    nextSubjectData ? (nextSubjectData.totalHeld ?? nextSubjectData.classesHeld ?? 56) : 56,
    1,
    0
  );

  const nextMissProjection = calculateSubjectProjection(
    nextSubjectData ? (nextSubjectData.attended ?? nextSubjectData.classesAttended ?? 40) : 40,
    nextSubjectData ? (nextSubjectData.totalHeld ?? nextSubjectData.classesHeld ?? 56) : 56,
    0,
    1
  );

  // Generate chart data for What-If projection over next 30 classes
  const chartSteps = [0, 5, 10, 15, 20, 25, 30];
  const projectionChartData = chartSteps.map(classes => {
    // 100% attendance rate
    const p100 = calculateWhatIfSimulation(
      overallStats.totalAttended, 
      overallStats.totalHeld, 
      classes, 
      100
    );
    // 80% attendance rate
    const p80 = calculateWhatIfSimulation(
      overallStats.totalAttended, 
      overallStats.totalHeld, 
      classes, 
      80
    );
    // 50% attendance rate
    const p50 = calculateWhatIfSimulation(
      overallStats.totalAttended, 
      overallStats.totalHeld, 
      classes, 
      50
    );

    return {
      classes: `+${classes} Classes`,
      '100% Rate': Number(p100.projectedPercentage.toFixed(1)),
      '80% Rate': Number(p80.projectedPercentage.toFixed(1)),
      '50% Rate': Number(p50.projectedPercentage.toFixed(1)),
      Threshold: 75
    };
  });

  // Handle Next Class quick action simulation
  const handleNextClassAction = (action: 'attend' | 'miss') => {
    setNextClassSimulatedAction(action);
    simulateAttendance(nextSubjectData?.id || nextSubjectData?.courseCode || '241CS019', action);
    setActionFeedback(
      action === 'attend' 
        ? `Simulated: Attended ${nextSubjectData.courseCode}! Subject moved to ${nextAttendProjection.projectedPercentage.toFixed(2)}% (+${nextAttendProjection.delta.toFixed(2)}%)`
        : `Simulated: Missed ${nextSubjectData.courseCode}! Subject dipped to ${nextMissProjection.projectedPercentage.toFixed(2)}% (${nextMissProjection.delta.toFixed(2)}%)`
    );
    setTimeout(() => setActionFeedback(null), 4500);
  };

  // Filtered subjects
  const filteredSubjects = subjectAttendance.filter(subject => {
    if (subjectFilter === 'risk') return subject.percentage < 75;
    if (subjectFilter === 'safe') return subject.percentage >= 75;
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Student Welcome & Status Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-blue-950/20 border border-blue-700/30 relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-500 text-white shadow-sm uppercase tracking-wider">
                Aditya University
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-700/60 text-blue-200 border border-blue-500/30">
                Department of AI & ML
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> NAAC A++ Status
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Welcome back, {student.name}
            </h1>
            <p className="text-xs sm:text-sm text-blue-200/90 font-medium">
              Roll No: <span className="font-mono font-bold text-white">{student.rollNumber}</span> • {student.program} • {student.semester} • Section {student.section}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Streak Badge */}
            <div className="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/30">
                <Flame className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-blue-200 tracking-wider">Active Streak</div>
                <div className="text-sm font-extrabold text-white">{student.streakCount} Classes Attended</div>
              </div>
            </div>

            {/* Academic Standing */}
            <div className="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/30">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-blue-200 tracking-wider">Eligibility Standing</div>
                <div className="text-sm font-extrabold text-emerald-300">EXAM ELIGIBLE</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Feedback Banner if simulation is active */}
      {actionFeedback && (
        <div className="p-4 rounded-2xl bg-blue-900 text-white flex items-center justify-between border border-blue-700 shadow-lg animate-in slide-in-from-top duration-300">
          <div className="flex items-center space-x-3 text-sm">
            <Sparkles className="w-5 h-5 text-orange-400 animate-spin" />
            <span className="font-medium">{actionFeedback}</span>
          </div>
          <button
            onClick={resetSimulation}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white flex items-center gap-1 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Simulation
          </button>
        </div>
      )}

      {/* 4 PRIMARY KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Overall Attendance */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Overall Attendance</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              overallStats.overallPercentage >= 75 ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300' : 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300'
            }`}>
              {overallStats.overallPercentage >= 75 ? 'ELIGIBLE' : 'CONDONATION'}
            </span>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {overallStats.overallPercentage.toFixed(2)}%
            </div>
            <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center">
              <TrendingUp className="w-4 h-4 mr-0.5" /> +1.96%
            </div>
          </div>
          <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                overallStats.overallPercentage >= 75 ? 'bg-gradient-to-r from-blue-600 to-emerald-500' : 'bg-rose-500'
              }`}
              style={{ width: `${Math.min(100, overallStats.overallPercentage)}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 flex items-center justify-between">
            <span>Minimum 75.00% Required</span>
            <span className="font-semibold text-blue-900 dark:text-blue-400">334 / 434 total</span>
          </p>
        </div>

        {/* Metric 2: Classes Attended */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Classes Attended</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="text-3xl font-black text-blue-950 dark:text-white tracking-tight">
              {overallStats.totalAttended}
            </div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">out of {overallStats.totalHeld}</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 font-medium">
            Classes Missed: <span className="font-bold text-rose-600 dark:text-rose-400">{overallStats.totalMissed}</span> (23.04%)
          </p>
          <div className="mt-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> High regular attendance velocity
          </div>
        </div>

        {/* Metric 3: Safe Bunk Buffer */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Safe Bunk Allowance</span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-300 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="text-3xl font-black text-orange-600 dark:text-orange-400 tracking-tight">
              {overallStats.classesCanMiss} Classes
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/80 text-orange-800 dark:text-orange-300">
              Safe Margin
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 font-medium">
            You can skip up to <strong className="text-slate-900 dark:text-white">{overallStats.classesCanMiss} classes</strong> consecutively and still maintain ≥75.00%.
          </p>
          <div className="mt-2 text-[11px] text-slate-400 dark:text-slate-500">
            Formula: ⌊(100×334 - 75×434) / 75⌋ = 8
          </div>
        </div>

        {/* Metric 4: Academic Performance */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Academic Score</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center">
              <BarChart2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="text-3xl font-black text-purple-950 dark:text-white tracking-tight">
              82.00%
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300">
              SGPA 8.64
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 font-medium">
            Cumulative GPA: <strong className="text-slate-900 dark:text-white">8.58 CGPA</strong>
          </p>
          <div className="mt-2 text-[11px] text-purple-700 dark:text-purple-400 font-semibold">
            Top 5% in 5th Semester AI & ML
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* FLAGSHIP HERO NEXT CLASS COMPONENT */}
      {/* ============================================================== */}
      <div className="bg-gradient-to-br from-white to-blue-50/40 dark:from-slate-900 dark:to-slate-850 rounded-3xl border-2 border-blue-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xl shadow-blue-900/5 relative overflow-hidden transition-all">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-blue-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-orange-500 text-white uppercase tracking-wider animate-pulse">
                HERO: NEXT CLASS
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300">
                Period 2 • 10:00 AM - 11:00 AM
              </span>
              {nextSubjectData.percentage < 75 ? (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 flex items-center gap-1 border border-amber-200 dark:border-amber-800">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" /> Subject Under 75%
                </span>
              ) : (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-300 flex items-center gap-1 border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Exam Eligible (&gt;=75%)
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-blue-950 dark:text-white tracking-tight">
              {nextSubjectData.subjectName}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-300 mt-2 font-medium">
              <span className="flex items-center gap-1 font-mono font-bold text-blue-900 dark:text-blue-400">
                <BookOpen className="w-3.5 h-3.5 text-orange-500" /> Code: {nextSubjectData.courseCode}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                <User className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" /> Faculty: {nextSubjectData.facultyName}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" /> Room: {nextSubjectData.room}
              </span>
            </div>
          </div>

          {/* Current Subject Standing */}
          <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div>
              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Current Standing</div>
              <div className={`text-2xl font-black ${nextSubjectData.percentage >= 75 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {nextSubjectData.percentage.toFixed(2)}%
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {nextSubjectData.attended} / {nextSubjectData.totalHeld} classes attended
              </div>
            </div>
            {nextSubjectData.percentage < 75 ? (
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-xs text-center p-1 leading-tight">
                Deficit Alert
              </div>
            ) : (
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs text-center p-1 leading-tight">
                Safe Standing
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Dual Projection Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* OPTION 1: "✓ I'LL ATTEND" */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-emerald-200 dark:border-emerald-800/80 shadow-sm hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">
                  ✓
                </div>
                <span className="text-xs font-extrabold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider">
                  If You Attend This Class
                </span>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                +{nextAttendProjection.delta.toFixed(2)}% GAIN
              </span>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400">
                  {nextAttendProjection.projectedPercentage.toFixed(2)}%
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5">
                  Tally becomes <strong className="text-slate-900 dark:text-white">{nextAttendProjection.projectedAttended} / {nextAttendProjection.projectedTotal}</strong>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Projected Impact</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">+{nextAttendProjection.delta.toFixed(2)}% immediate lift</span>
              </div>
            </div>

            <button
              onClick={() => handleNextClassAction('attend')}
              className="mt-4 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
            >
              <span>✓ I'LL ATTEND (Simulate Gain)</span>
            </button>
          </div>

          {/* OPTION 2: "× I'LL MISS" */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-rose-200 dark:border-rose-800/80 shadow-sm hover:border-rose-400 dark:hover:border-rose-500 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-rose-500 text-white flex items-center justify-center font-bold text-sm">
                  ×
                </div>
                <span className="text-xs font-extrabold text-rose-900 dark:text-rose-300 uppercase tracking-wider">
                  If You Miss This Class
                </span>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300">
                {nextMissProjection.delta.toFixed(2)}% LOSS
              </span>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-rose-700 dark:text-rose-400">
                  {nextMissProjection.projectedPercentage.toFixed(2)}%
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5">
                  Tally becomes <strong className="text-slate-900 dark:text-white">{nextMissProjection.projectedAttended} / {nextMissProjection.projectedTotal}</strong>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Projected Impact</span>
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400">{nextMissProjection.delta.toFixed(2)}% percentage drop</span>
              </div>
            </div>

            <button
              onClick={() => handleNextClassAction('miss')}
              className="mt-4 w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-600/20 flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
            >
              <span>× I'LL MISS (Simulate Loss)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SMART "WHAT-IF" SIMULATOR & TARGET PLANNER */}
      {/* ============================================================== */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm transition-all">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <Sliders className="w-5 h-5 text-blue-700 dark:text-blue-400" />
              <h2 className="text-xl font-bold text-blue-950 dark:text-white tracking-tight">
                Smart Attendance Target Planner & What-If Simulator
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Select your goal attendance percentage to compute mathematical required classes or safe bunks.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 px-2">Presets:</span>
            {[75, 80, 85, 90].map(target => (
              <button
                key={target}
                onClick={() => setTargetPercentage(target)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  targetPercentage === target
                    ? 'bg-blue-900 dark:bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {target}%
              </button>
            ))}
          </div>
        </div>

        {/* Target Slider & Calculation Results */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-5">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Target Percentage
                </span>
                <span className="text-2xl font-black text-blue-900 dark:text-blue-400">
                  {targetPercentage}%
                </span>
              </div>
              <input
                type="range"
                min="70"
                max="95"
                step="1"
                value={targetPercentage}
                onChange={(e) => setTargetPercentage(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-900 dark:accent-blue-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 font-semibold mt-1">
                <span>70% (Min Condonation)</span>
                <span>75% (Mandatory)</span>
                <span>85% (Scholarship)</span>
                <span>95% (Excellence)</span>
              </div>
            </div>

            {/* Target Formula Result Box */}
            <div className={`p-4 rounded-2xl border ${
              overallTargetStatus.isTargetMet 
                ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/80' 
                : 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/80'
            }`}>
              <div className="flex items-center space-x-2">
                {overallTargetStatus.isTargetMet ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                )}
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  {overallTargetStatus.isTargetMet ? 'Goal Currently Met' : 'Action Required to Hit Goal'}
                </span>
              </div>

              <div className="mt-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {overallTargetStatus.isTargetMet ? (
                  <>
                    You are currently at <strong className="text-slate-900 dark:text-white">{overallStats.overallPercentage.toFixed(2)}%</strong>, which is above your <strong className="text-emerald-700 dark:text-emerald-400">{targetPercentage}%</strong> target! You can afford to miss <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{overallTargetStatus.classesCanMiss} more classes</strong> without falling below {targetPercentage}%.
                  </>
                ) : (
                  <>
                    To reach <strong className="text-amber-800 dark:text-amber-400 font-bold">{targetPercentage}%</strong> from your current {overallStats.overallPercentage.toFixed(2)}%, you must attend <strong className="text-amber-800 dark:text-amber-400 font-bold">{overallTargetStatus.classesNeeded} consecutive classes</strong> with zero absences.
                  </>
                )}
              </div>

              <div className="mt-3 text-[11px] text-slate-500 dark:text-slate-400 font-mono bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                Formula: {overallTargetStatus.isTargetMet 
                  ? `safe_bunks = floor((100 × ${overallStats.totalAttended} - ${targetPercentage} × ${overallStats.totalHeld}) / ${targetPercentage}) = ${overallTargetStatus.classesCanMiss}`
                  : `needed = ceil((${targetPercentage} × ${overallStats.totalHeld} - 100 × ${overallStats.totalAttended}) / (100 - ${targetPercentage})) = ${overallTargetStatus.classesNeeded}`}
              </div>
            </div>
          </div>

          {/* Projection Area Chart over Next 30 Classes */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-850 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Attendance Trajectory (Next 30 Classes)
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Live Mathematical Simulation</span>
            </div>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projectionChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="color100" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="color80" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="color50" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#94A3B8" opacity={0.2} />
                  <XAxis dataKey="classes" tick={{ fontSize: 11, fill: '#94A3B8' }} />
                  <YAxis domain={[65, 88]} tick={{ fontSize: 11, fill: '#94A3B8' }} unit="%" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }} 
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Area type="monotone" dataKey="100% Rate" stroke="#10B981" strokeWidth={2.5} fillOpacity={1} fill="url(#color100)" />
                  <Area type="monotone" dataKey="80% Rate" stroke="#3B82F6" strokeWidth={2.5} fillOpacity={1} fill="url(#color80)" />
                  <Area type="monotone" dataKey="50% Rate" stroke="#EF4444" strokeWidth={2.5} fillOpacity={1} fill="url(#color50)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SUBJECT ATTENDANCE TABLE & DEEP DIVE */}
      {/* ============================================================== */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-blue-950 dark:text-white tracking-tight">
              Subject-Wise Academic Attendance (Semester 5)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Click any subject to open deep-dive analysis, session logs, and specific what-if calculations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Filter:</span>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-medium">
              <button
                onClick={() => setSubjectFilter('all')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  subjectFilter === 'all' 
                    ? 'bg-white dark:bg-slate-700 text-blue-900 dark:text-blue-300 font-bold shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                All ({subjectAttendance.length})
              </button>
              <button
                onClick={() => setSubjectFilter('risk')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  subjectFilter === 'risk' 
                    ? 'bg-white dark:bg-slate-700 text-rose-700 dark:text-rose-400 font-bold shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                At Risk ({subjectAttendance.filter(s => s.percentage < 75).length})
              </button>
              <button
                onClick={() => setSubjectFilter('safe')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  subjectFilter === 'safe' 
                    ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 font-bold shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Safe ({subjectAttendance.filter(s => s.percentage >= 75).length})
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-6">Subject / Course</th>
                <th className="py-3.5 px-4">Faculty Incharge</th>
                <th className="py-3.5 px-4 text-center">Attended / Held</th>
                <th className="py-3.5 px-6">Attendance %</th>
                <th className="py-3.5 px-4">Buffer / Deficit</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs text-slate-700 dark:text-slate-200">
              {filteredSubjects.map(subject => {
                const subStatus = calculateAttendanceStatus(
                  subject.attended ?? subject.classesAttended ?? 0, 
                  subject.totalHeld ?? subject.classesHeld ?? 0, 
                  75
                );
                const isRisk = subject.percentage < 75;

                return (
                  <tr 
                    key={subject.id} 
                    onClick={() => setSelectedSubject(subject)}
                    className="hover:bg-blue-50/40 dark:hover:bg-slate-800/60 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors">
                        {subject.subjectName}
                      </div>
                      <div className="text-[11px] text-slate-400 dark:text-slate-500 font-mono mt-0.5 flex items-center gap-2">
                        <span>{subject.courseCode}</span>
                        <span>•</span>
                        <span>{subject.credits} Credits</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-medium text-slate-600 dark:text-slate-300">
                      {subject.facultyName}
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-sans">Room: {subject.room}</div>
                    </td>

                    <td className="py-4 px-4 text-center font-semibold text-slate-900 dark:text-white">
                      {subject.attended} / {subject.totalHeld}
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`font-black ${isRisk ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                          {subject.percentage.toFixed(2)}%
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isRisk 
                            ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300' 
                            : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                        }`}>
                          {isRisk ? 'CRITICAL' : 'SAFE'}
                        </span>
                      </div>
                      <div className="w-36 bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${isRisk ? 'bg-rose-500' : 'bg-emerald-500'}`}
                          style={{ width: `${Math.min(100, subject.percentage)}%` }}
                        ></div>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-medium">
                      {isRisk ? (
                        <span className="text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> Need {subStatus.classesNeeded} classes
                        </span>
                      ) : (
                        <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> {subStatus.classesCanMiss} safe bunks
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSubject(subject);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-slate-800 text-blue-800 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-slate-700 font-semibold text-xs transition-colors inline-flex items-center gap-1"
                      >
                        Deep Dive <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subject Deep Dive Modal */}
      {selectedSubject && (
        <SubjectDetailModal 
          subject={selectedSubject} 
          onClose={() => setSelectedSubject(null)} 
        />
      )}
    </div>
  );
};
