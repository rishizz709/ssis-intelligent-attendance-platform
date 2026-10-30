import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  ArrowRight, 
  LayoutDashboard, 
  Calendar, 
  BrainCircuit, 
  Award, 
  FileText, 
  Users, 
  ShieldCheck, 
  BookOpen, 
  Sliders
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const { subjectAttendance, facultyList } = useStudent();

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open handled by parent
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navItems = [
    { title: 'Dashboard & Hero Next Class', tab: 'dashboard', icon: LayoutDashboard, category: 'Navigation' },
    { title: 'Smart Academic Timetable', tab: 'timetable', icon: Calendar, category: 'Navigation' },
    { title: 'AI Prediction Center', tab: 'prediction', icon: BrainCircuit, category: 'Navigation' },
    { title: 'Academic Performance & Marks', tab: 'performance', icon: Award, category: 'Navigation' },
    { title: 'Student Progress Report (PDF)', tab: 'report', icon: FileText, category: 'Navigation' },
    { title: 'Faculty & Office Hours Directory', tab: 'faculty-dir', icon: Users, category: 'Navigation' },
    { title: 'Admin & Audit Log Console', tab: 'admin', icon: ShieldCheck, category: 'Navigation' }
  ];

  const filteredNav = navItems.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const filteredSubjects = subjectAttendance.filter(s => 
    (s.subjectName || s.courseName || '').toLowerCase().includes(query.toLowerCase()) ||
    s.courseCode.toLowerCase().includes(query.toLowerCase())
  );

  const filteredFaculty = facultyList.filter(f => 
    (f.name || '').toLowerCase().includes(query.toLowerCase()) ||
    (f.subject || f.subjectsTaught?.[0] || '').toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectTab = (tab: string) => {
    onNavigate(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center space-x-3 bg-slate-50">
          <Search className="w-5 h-5 text-blue-900 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a subject name, course code, professor, or portal page..."
            className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-[60vh] overflow-y-auto space-y-4">
          {/* Navigation Section */}
          {filteredNav.length > 0 && (
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
                Portal Pages
              </div>
              <div className="space-y-1">
                {filteredNav.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelectTab(item.tab)}
                      className="w-full p-2.5 rounded-xl hover:bg-blue-50/70 text-left flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-800 group-hover:text-blue-900">
                          {item.title}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Subjects Section */}
          {filteredSubjects.length > 0 && (
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
                Subjects & Courses
              </div>
              <div className="space-y-1">
                {filteredSubjects.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => handleSelectTab('dashboard')}
                    className="w-full p-2.5 rounded-xl hover:bg-blue-50/70 text-left flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center font-mono font-bold text-xs">
                        AU
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-blue-900">
                          {sub.subjectName}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {sub.courseCode} • {sub.attended}/{sub.totalHeld} ({sub.percentage.toFixed(1)}%)
                        </div>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      sub.percentage >= 75 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {sub.percentage >= 75 ? 'ELIGIBLE' : 'DEFICIT'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Faculty Section */}
          {filteredFaculty.length > 0 && (
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
                Faculty Members
              </div>
              <div className="space-y-1">
                {filteredFaculty.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => handleSelectTab('faculty-dir')}
                    className="w-full p-2.5 rounded-xl hover:bg-blue-50/70 text-left flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xs">
                        {f.name[0]}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">{f.name}</div>
                        <div className="text-[10px] text-slate-400">{f.subject} • Cabin {f.cabin}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredNav.length === 0 && filteredSubjects.length === 0 && filteredFaculty.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-400">
              No results found for "{query}". Try searching for "OOAD", "Timetable", "Report", or "Rao".
            </div>
          )}
        </div>

        {/* Footer Shortcut Helper */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>Tip: Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">ESC</kbd> to close</span>
          <span className="font-semibold text-blue-900">SSIS Quick Launcher</span>
        </div>
      </div>
    </div>
  );
};
