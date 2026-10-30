import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useStudent } from '../../context/StudentContext';
import {
  Bell,
  Search,
  RotateCcw,
  Sparkles,
  ChevronDown,
  LogOut,
  UserCheck,
  Shield,
  GraduationCap,
  Clock,
  CheckCircle2,
  AlertTriangle,
  X
} from 'lucide-react';
import { DEMO_USERS } from '../../data/mockStudentData';

export const Navbar: React.FC<{ onOpenSearch: () => void }> = ({ onOpenSearch }) => {
  const { user, logout, switchDemoUser } = useAuth();
  const {
    profile,
    overallAttendancePercentage,
    academicHealth,
    notifications,
    unreadNotifsCount,
    markNotificationRead,
    resetAllDemoData,
    setActiveTab
  } = useStudent();

  const [notifOpen, setNotifOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeFmt = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      const dateFmt = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
      setCurrentTime(timeFmt.format(now));
      setCurrentDate(dateFmt.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const healthBadgeMap: Record<string, { bg: string; dot: string }> = {
    EXCELLENT: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
    STABLE: { bg: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
    NEEDS_ATTENTION: { bg: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
    CRITICAL: { bg: 'bg-red-50 text-red-700 border-red-200', dot: 'bg-red-500' }
  };
  const healthBadge = healthBadgeMap[academicHealth] || healthBadgeMap.STABLE;

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-2.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Brand & Academic Context */}
        <div className="flex items-center gap-3">
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-aditya-blue flex items-center justify-center text-white font-black text-sm">
              AU
            </div>
            <span className="font-display font-bold text-slate-900 text-sm">SSIS</span>
          </div>

          {/* Role Specific Status Pill */}
          {user?.role === 'STUDENT' ? (
            <div className={`hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${healthBadge.bg}`}>
              <span className={`w-2 h-2 rounded-full ${healthBadge.dot} animate-pulse`} />
              <span>Academic Health: {(academicHealth || 'STABLE').replace('_', ' ')}</span>
              <span className="text-slate-400 font-mono">({overallAttendancePercentage || 76.96}%)</span>
            </div>
          ) : user?.role === 'FACULTY' ? (
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold bg-purple-50 text-purple-800 border-purple-200">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span>Faculty Incharge</span>
              <span className="text-purple-600 font-mono">({user.department || 'CSE'})</span>
            </div>
          ) : (
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold bg-emerald-50 text-emerald-800 border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>System Console Active</span>
              <span className="text-emerald-600 font-mono">(Spring AOP Live)</span>
            </div>
          )}

          {/* Real System Clock (IST) */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/80 border border-slate-200 text-slate-600 text-xs font-mono">
            <Clock className="w-3.5 h-3.5 text-aditya-blue" />
            <span className="font-bold text-slate-800">{currentTime} IST</span>
            <span className="text-slate-400">|</span>
            <span>{currentDate}</span>
          </div>
        </div>

        {/* Center / Search Trigger */}
        <div className="flex-1 max-w-md hidden md:block">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-400 transition"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <span>Search subjects, faculty, attendance...</span>
            </div>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono text-slate-500 shadow-2xs">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right: Actions, Notifications, User */}
        <div className="flex items-center gap-2.5">
          {/* Demo Reset Button */}
          <button
            onClick={resetAllDemoData}
            title="Reset data back to initial seed values"
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition"
          >
            <RotateCcw className="w-3.5 h-3.5 text-orange-500" />
            <span>Reset Demo</span>
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Drawer */}
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 text-sm font-display">Notifications</span>
                    <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold">
                      {unreadNotifsCount} new
                    </span>
                  </div>
                  <button onClick={() => setNotifOpen(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                        !n.read ? 'bg-orange-50/40 border-orange-200/60' : 'bg-slate-50 border-slate-100'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-slate-800">{n.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono flex-shrink-0">{n.timestamp}</span>
                      </div>
                      <p className="text-slate-600 mt-1 leading-snug">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 p-1 pl-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full transition"
            >
              <div className="text-left hidden md:block">
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {user?.name || (user?.role === 'STUDENT' ? profile.fullName : 'SSIS User')}
                </div>
                <div className="text-[10px] text-slate-500 font-mono leading-tight">
                  {user?.role === 'STUDENT'
                    ? (user?.studentId || profile.rollNumber)
                    : user?.role === 'FACULTY'
                    ? (user?.facultyId || 'Faculty')
                    : 'System Admin'}
                </div>
              </div>
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-aditya-blue/20"
              />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1 hidden sm:block" />
            </button>

            {/* Profile Dropdown */}
            {userDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 text-xs space-y-1 animate-in fade-in slide-in-from-top-2 duration-200"
                onMouseLeave={() => setUserDropdownOpen(false)}
              >
                <div className="p-3 border-b border-slate-100 bg-slate-50/60 rounded-xl mb-1">
                  <div className="font-bold text-slate-900 text-sm">{user?.name}</div>
                  <div className="text-slate-500 text-[11px] truncate font-mono">{user?.email}</div>
                  <div className="mt-1 inline-block px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold font-mono">
                    {user?.role} PORTAL
                  </div>
                </div>

                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Quick Switch Role (Demo)
                </div>

                {DEMO_USERS.map(u => (
                  <button
                    key={u.id}
                    onClick={() => {
                      switchDemoUser(u);
                      setUserDropdownOpen(false);
                      if (u.role === 'ADMIN') setActiveTab('admin');
                      else if (u.role === 'FACULTY') setActiveTab('faculty');
                      else setActiveTab('dashboard');
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition ${
                      user?.email === u.email ? 'bg-aditya-blue text-white font-semibold' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="truncate">{u.name}</span>
                    <span className="text-[10px] opacity-75 font-mono ml-2 uppercase">({u.role})</span>
                  </button>
                ))}

                <div className="border-t border-slate-100 pt-1 mt-1">
                  <button
                    onClick={() => {
                      setActiveTab('profile');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-2 rounded-lg text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                  >
                    <UserCheck className="w-4 h-4 text-slate-500" />
                    <span>My Profile & ID Card</span>
                  </button>

                  <button
                    onClick={logout}
                    className="w-full text-left px-2.5 py-2 rounded-lg text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
