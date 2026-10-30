import React from 'react';
import { useStudent } from '../../context/StudentContext';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Target,
  Sparkles,
  Award,
  FileText,
  Users,
  Shield,
  GraduationCap,
  TrendingUp,
  Flame,
  ChevronRight
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, profile, overallAttendancePercentage, currentStreak } = useStudent();
  const { user } = useAuth();

  const studentNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'attendance', label: 'Subject Attendance', icon: CheckSquare, badge: null },
    { id: 'timetable', label: 'Smart Timetable', icon: Calendar, badge: null },
    { id: 'planner', label: 'Target Planner', icon: Target, badge: 'What-If' },
    { id: 'prediction', label: 'AI Prediction', icon: Sparkles, badge: 'ML' },
    { id: 'performance', label: 'Performance & Marks', icon: Award, badge: null },
    { id: 'reports', label: 'Student Report', icon: FileText, badge: 'PDF' },
    { id: 'faculty-dir', label: 'Faculty Directory', icon: Users, badge: null }
  ];

  const facultyNavItems = [
    { id: 'faculty', label: 'Roll Call Terminal', icon: GraduationCap, badge: 'LIVE' },
    { id: 'timetable', label: 'Assigned Schedule', icon: Calendar, badge: null },
    { id: 'faculty-dir', label: 'Faculty Directory', icon: Users, badge: null }
  ];

  const adminNavItems = [
    { id: 'admin', label: 'Admin Console', icon: Shield, badge: 'CRUD' },
    { id: 'timetable', label: 'Master Timetable', icon: Calendar, badge: null },
    { id: 'faculty-dir', label: 'Faculty Roster', icon: Users, badge: null }
  ];

  const currentRole = user?.role || 'STUDENT';
  const navItems = currentRole === 'ADMIN' ? adminNavItems : currentRole === 'FACULTY' ? facultyNavItems : studentNavItems;
  const suiteTitle = currentRole === 'ADMIN' ? 'ADMINISTRATION SUITE' : currentRole === 'FACULTY' ? 'FACULTY PORTAL' : 'STUDENT ACADEMIC SUITE';

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200/80 min-h-[calc(100vh-57px)] select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-aditya-gradient flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-aditya-blue/20">
            AU
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-base text-aditya-navy tracking-tight">SSIS</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 font-bold">
                {currentRole}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">Aditya University Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        <div>
          <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
            {suiteTitle}
          </div>
          <nav className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-aditya-blue text-white shadow-md shadow-aditya-blue/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Attendance Streak Banner - ONLY FOR STUDENT */}
        {currentRole === 'STUDENT' && (
          <div className="p-3.5 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-200/70">
            <div className="flex items-center gap-2 text-orange-800 font-bold text-xs font-display">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
              <span>Attendance Streak</span>
            </div>
            <div className="mt-1.5 flex items-baseline justify-between text-xs">
              <span className="text-2xl font-black font-mono text-orange-600">{currentStreak}</span>
              <span className="text-[11px] text-orange-700 font-medium">Consecutive Classes</span>
            </div>
            <div className="text-[10px] text-orange-800/80 mt-1">
              Best Personal Streak: <strong className="font-mono">14 sessions</strong>
            </div>
          </div>
        )}

        {/* Quick Role Specific Info for Faculty */}
        {currentRole === 'FACULTY' && (
          <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200/80">
            <div className="flex items-center gap-2 text-purple-900 font-bold text-xs font-display">
              <GraduationCap className="w-4 h-4 text-purple-600" />
              <span>Teaching Department</span>
            </div>
            <p className="text-[11px] text-purple-800 font-semibold mt-1">
              {user?.department || 'Computer Science & Engineering'}
            </p>
            <p className="text-[10px] text-purple-600 font-mono mt-0.5">
              Faculty ID: {user?.facultyId || 'FAC-201'}
            </p>
          </div>
        )}

        {/* Quick Role Specific Info for Admin */}
        {currentRole === 'ADMIN' && (
          <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/80">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs font-display">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Administrative Console</span>
            </div>
            <p className="text-[11px] text-emerald-800 font-semibold mt-1">
              Full System Telemetry Access
            </p>
            <p className="text-[10px] text-emerald-600 font-mono mt-0.5">
              Status: SUPER_ADMIN
            </p>
          </div>
        )}
      </div>

      {/* Role-Specific Badge Footer */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        {currentRole === 'STUDENT' ? (
          <div
            onClick={() => setActiveTab('profile')}
            className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition cursor-pointer"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 font-display truncate">
                {user?.name || profile?.fullName || 'B. Rishi Vardhan'}
              </span>
              <span className="font-mono font-bold text-aditya-blue">
                {overallAttendancePercentage || 76.96}%
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-0.5">
              {user?.studentId || profile?.rollNumber || '24B11AI051'} • {(profile?.department || 'AI & ML').split(' ')[0]}
            </div>
          </div>
        ) : currentRole === 'FACULTY' ? (
          <div
            onClick={() => setActiveTab('faculty')}
            className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-purple-300 transition cursor-pointer"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-purple-950 font-display truncate">
                {user?.name || 'Kumari'}
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                FACULTY
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-0.5">
              {user?.facultyId || 'FAC-201'} • {user?.department || 'CSE'}
            </div>
          </div>
        ) : (
          <div
            onClick={() => setActiveTab('admin')}
            className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-300 transition cursor-pointer"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 font-display truncate">
                {user?.name || 'Academic Administrator'}
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                ADMIN
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-0.5">
              Dean Academic Affairs
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
