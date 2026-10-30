import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { useStudent } from './context/StudentContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';

// Views
import { LandingLoginView } from './views/LandingLoginView';
import { DashboardView } from './views/DashboardView';
import { TimetableView } from './views/TimetableView';
import { PredictionCenterView } from './views/PredictionCenterView';
import { PerformanceCenterView } from './views/PerformanceCenterView';
import { ReportGeneratorView } from './views/ReportGeneratorView';
import { FacultyDirectoryView } from './views/FacultyDirectoryView';
import { AdminPanelView } from './views/AdminPanelView';
import { FacultyPanelView } from './views/FacultyPanelView';
import { ProfileView } from './views/ProfileView';

// Mobile bottom bar icons
import { 
  LayoutDashboard, 
  Calendar, 
  Sparkles, 
  Award, 
  FileText, 
  User,
  Shield
} from 'lucide-react';

export const AppContent: React.FC = () => {
  const { user } = useAuth();
  const { activeTab, setActiveTab, isLoading } = useStudent();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global Ctrl+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Set default tab based on user role upon login / role switch
  useEffect(() => {
    if (user) {
      if (user.role === 'ADMIN') {
        setActiveTab('admin');
      } else if (user.role === 'FACULTY') {
        setActiveTab('faculty');
      } else {
        setActiveTab('dashboard');
      }
    }
  }, [user?.role, user?.id]);

  if (!user) {
    return <LandingLoginView />;
  }

  const renderActiveView = () => {
    const role = user.role;

    // Strict role-based route guards
    if (activeTab === 'admin' && role !== 'ADMIN') {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-rose-200 dark:border-rose-900/50 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-2xl">
            403
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Access Denied: Administrative Console</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
            You do not possess SUPER_ADMIN credentials required to inspect Spring AOP telemetry or execute student database modifications.
          </p>
          <button
            onClick={() => setActiveTab(role === 'FACULTY' ? 'faculty' : 'dashboard')}
            className="px-4 py-2 bg-blue-900 dark:bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition"
          >
            Return to Authorized Portal
          </button>
        </div>
      );
    }

    if (activeTab === 'faculty' && role !== 'FACULTY') {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-rose-200 dark:border-rose-900/50 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-2xl">
            403
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Access Denied: Faculty Roll Call Terminal</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
            Only authenticated faculty course in-charges may access student roll call terminals or submit attendance records.
          </p>
          <button
            onClick={() => setActiveTab(role === 'ADMIN' ? 'admin' : 'dashboard')}
            className="px-4 py-2 bg-blue-900 dark:bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition"
          >
            Return to Authorized Portal
          </button>
        </div>
      );
    }

    // Role-specific view routing
    switch (activeTab) {
      case 'dashboard':
      case 'attendance':
      case 'planner':
        return role === 'STUDENT' ? (
          <DashboardView onNavigate={(tab) => setActiveTab(tab)} />
        ) : role === 'FACULTY' ? (
          <FacultyPanelView />
        ) : (
          <AdminPanelView />
        );
      case 'timetable':
        return <TimetableView />;
      case 'prediction':
        return role === 'STUDENT' ? (
          <PredictionCenterView />
        ) : role === 'FACULTY' ? (
          <FacultyPanelView />
        ) : (
          <AdminPanelView />
        );
      case 'performance':
        return role === 'STUDENT' ? (
          <PerformanceCenterView />
        ) : role === 'FACULTY' ? (
          <FacultyPanelView />
        ) : (
          <AdminPanelView />
        );
      case 'reports':
        return role === 'STUDENT' ? (
          <ReportGeneratorView />
        ) : role === 'FACULTY' ? (
          <FacultyPanelView />
        ) : (
          <AdminPanelView />
        );
      case 'faculty-dir':
        return <FacultyDirectoryView />;
      case 'admin':
        return <AdminPanelView />;
      case 'faculty':
        return <FacultyPanelView />;
      case 'profile':
        return <ProfileView />;
      default:
        return role === 'ADMIN' ? (
          <AdminPanelView />
        ) : role === 'FACULTY' ? (
          <FacultyPanelView />
        ) : (
          <DashboardView onNavigate={(tab) => setActiveTab(tab)} />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1329] text-slate-800 dark:text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white transition-colors duration-200">
      {/* Top Main Navbar */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Left Sidebar */}
        <Sidebar />

        {/* Dynamic Main Workspace Content */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 max-w-7xl mx-auto w-full">
          {isLoading ? (
            <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-3">
              <div className="w-10 h-10 border-4 border-blue-900 border-t-orange-500 rounded-full animate-spin"></div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-mono">
                Synchronizing with Aditya University SSIS Gateway...
              </p>
            </div>
          ) : (
            renderActiveView()
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Visible only on small devices) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-3 py-2 z-40 flex items-center justify-around text-[10px] font-semibold text-slate-500 dark:text-slate-400">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-blue-900 dark:text-blue-400 font-bold' : ''}`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab('timetable')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'timetable' ? 'text-blue-900 dark:text-blue-400 font-bold' : ''}`}
        >
          <Calendar className="w-4 h-4" />
          <span>Classes</span>
        </button>

        <button
          onClick={() => setActiveTab('prediction')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'prediction' ? 'text-orange-600 dark:text-orange-400 font-bold' : ''}`}
        >
          <Sparkles className="w-4 h-4 text-orange-500" />
          <span>AI Forecast</span>
        </button>

        <button
          onClick={() => setActiveTab('performance')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'performance' ? 'text-blue-900 dark:text-blue-400 font-bold' : ''}`}
        >
          <Award className="w-4 h-4" />
          <span>Results</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-blue-900 dark:text-blue-400 font-bold' : ''}`}
        >
          <User className="w-4 h-4" />
          <span>ID Card</span>
        </button>
      </div>

      {/* Global Search & Command Palette Modal */}
      <GlobalSearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onNavigate={(tab) => setActiveTab(tab)} 
      />
    </div>
  );
};

export default AppContent;
