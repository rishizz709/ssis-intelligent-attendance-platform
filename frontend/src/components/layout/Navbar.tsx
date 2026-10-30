import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useStudent } from '../../context/StudentContext';
import { useTheme } from '../../context/ThemeContext';
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
  X,
  Sun,
  Moon
} from 'lucide-react';
import { DEMO_USERS } from '../../data/mockStudentData';

export const Navbar: React.FC<{ onOpenSearch: () => void }> = ({ onOpenSearch }) => {
  const { user, logout, switchDemoUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
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
    EXCELLENT: { bg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800', dot: 'bg-emerald-500' },
    STABLE: { bg: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800', dot: 'bg-blue-500' },
    NEEDS_ATTENTION: { bg: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800', dot: 'bg-amber-500' },
    CRITICAL: { bg: 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800', dot: 'bg-red-500' }
  };
  const healthBadge = healthBadgeMap[academicHealth] || healthBadgeMap.STABLE;

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-6 py-2.5 transition-colors duration-200">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Brand & Academic Context */}
        <div className="flex items-center gap-3">
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-aditya-blue flex items-center justify-center text-white font-black text-sm">
              AU
            </div>
            <span className="font-display font-bold text-slate-900 dark:text-white text-sm">SSIS</span>
          </div>

          {/* Role Specific Status Pill */}
          {user?.role === 'STUDENT' ? (
            <div className={`hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${healthBadge.bg}`}>
              <span className={`w-2 h-2 rounded-full ${healthBadge.dot} animate-pulse`} />
              <span>Academic Health: {(academicHealth || 'STABLE').replace('_', ' ')}</span>
              <span className="text-slate-400 dark:text-slate-500 font-mono">({overallAttendancePercentage || 76.96}%)</span>
            </div>
          ) : user?.role === 'FACULTY' ? (
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span>Faculty Incharge: Kumari</span>
              <span className="text-purple-600 dark:text-purple-400 font-mono">(API & Micro Services)</span>
            </div>
          ) : (
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>System Console Active</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono">(Spring AOP Live)</span>
            </div>
          )}

          {/* Real System Clock (IST) */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-mono">
            <Clock className="w-3.5 h-3.5 text-aditya-blue dark:text-blue-400" />
            <span className="font-bold text-slate-800 dark:text-slate-100">{currentTime} IST</span>
            <span className="text-slate-400 dark:text-slate-500">|</span>
            <span>{currentDate}</span>
          </div>
        </div>

        {/* Center / Search Trigger */}
        <div className="flex-1 max-w-md hidden md:block">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-1.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-400 dark:text-slate-400 transition"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-400" />
              <span>Search subjects, faculty, attendance...</span>
            </div>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[10px] font-mono text-slate-500 dark:text-slate-300 shadow-2xs">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right: Actions, Theme Toggle, Notifications, User */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme mode"
            className="flex items-center gap-1.5 p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 transition-all duration-200"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                <span className="hidden xl:inline text-xs font-semibold text-amber-300">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-blue-600" />
                <span className="hidden xl:inline text-xs font-semibold text-slate-700">Dark</span>
              </>
            )}
          </button>

          {/* Demo Reset Button */}
          <button
            onClick={resetAllDemoData}
            title="Reset data back to initial seed values"
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5 text-orange-500" />
            <span>Reset Demo</span>
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 transition"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Drawer */}
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-3 z-50 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 dark:text-white text-sm font-display">Notifications</span>
                    <span className="px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/70 text-orange-700 dark:text-orange-400 text-[10px] font-bold">
                      {unreadNotifsCount} new
                    </span>
                  </div>
                  <button onClick={() => setNotifOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                        !n.read 
                          ? 'bg-orange-50/40 dark:bg-orange-950/30 border-orange-200/60 dark:border-orange-900/50' 
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-100 dark:border-slate-700/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-slate-800 dark:text-slate-100">{n.title}</span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono flex-shrink-0">{n.timestamp}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 mt-1 leading-snug">{n.message}</p>
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
              className="flex items-center gap-2 p-1 pl-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 rounded-full transition"
            >
              <div className="text-left hidden md:block">
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  {user?.name || (user?.role === 'STUDENT' ? profile.fullName : 'SSIS User')}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono leading-tight">
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
                className="w-8 h-8 rounded-full object-cover ring-2 ring-aditya-blue/20 dark:ring-blue-400/30"
              />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1 hidden sm:block" />
            </button>

            {/* Profile Dropdown */}
            {userDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 text-xs space-y-1 animate-in fade-in slide-in-from-top-2 duration-200"
                onMouseLeave={() => setUserDropdownOpen(false)}
              >
                <div className="p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/60 rounded-xl mb-1">
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{user?.name}</div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px] truncate font-mono">{user?.email}</div>
                  <div className="mt-1 inline-block px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-[10px] font-bold font-mono">
                    {user?.role} PORTAL
                  </div>
                </div>

                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
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
                      user?.email === u.email 
                        ? 'bg-aditya-blue dark:bg-blue-600 text-white font-semibold' 
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="truncate">{u.name}</span>
                    <span className="text-[10px] opacity-75 font-mono ml-2 uppercase">({u.role})</span>
                  </button>
                ))}

                <div className="border-t border-slate-100 dark:border-slate-800 pt-1 mt-1">
                  <button
                    onClick={() => {
                      setActiveTab('profile');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                  >
                    <UserCheck className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <span>My Profile & ID Card</span>
                  </button>

                  <button
                    onClick={logout}
                    className="w-full text-left px-2.5 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4 text-red-500 dark:text-red-400" />
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
