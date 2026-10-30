import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  Users, 
  Calendar, 
  Clock, 
  Send, 
  Sparkles, 
  AlertCircle,
  Check,
  RotateCcw
} from 'lucide-react';

interface RosterStudent {
  rollNumber: string;
  name: string;
  isPresent: boolean;
  priorAttendance: number;
}

export const FacultyPanelView: React.FC = () => {
  const { user } = useAuth();
  const { subjectAttendance, simulateAttendance } = useStudent();
  const [topic, setTopic] = useState('UML Sequence Diagrams & Message Passing Semantics');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Roster of students for OOAD & UML
  const [roster, setRoster] = useState<RosterStudent[]>([
    { rollNumber: '24B11AI051', name: 'B. Rishi Vardhan', isPresent: true, priorAttendance: 71.43 },
    { rollNumber: '24B11AI052', name: 'G. Ananya Sharma', isPresent: true, priorAttendance: 84.20 },
    { rollNumber: '24B11AI053', name: 'K. Sai Teja', isPresent: false, priorAttendance: 71.30 },
    { rollNumber: '24B11AI054', name: 'M. Harsha Vardhan', isPresent: true, priorAttendance: 64.80 },
    { rollNumber: '24B11AI055', name: 'P. Sneha Reddy', isPresent: true, priorAttendance: 91.50 },
    { rollNumber: '24B11AI056', name: 'R. Vignesh Kumar', isPresent: true, priorAttendance: 78.40 },
    { rollNumber: '24B11AI057', name: 'T. Kavya Sri', isPresent: true, priorAttendance: 88.00 },
    { rollNumber: '24B11AI058', name: 'V. Akhil Raj', isPresent: false, priorAttendance: 72.50 }
  ]);

  const toggleStudent = (roll: string) => {
    setRoster(roster.map(r => r.rollNumber === roll ? { ...r, isPresent: !r.isPresent } : r));
  };

  const markAll = (present: boolean) => {
    setRoster(roster.map(r => ({ ...r, isPresent: present })));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // If Rishi is present, also trigger simulation on student context
    const rishi = roster.find(r => r.rollNumber === '24B11AI051');
    if (rishi) {
      simulateAttendance('ooad', rishi.isPresent ? 'attend' : 'miss');
    }

    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  const presentCount = roster.filter(r => r.isPresent).length;
  const absentCount = roster.length - presentCount;
  const attendanceRate = Math.round((presentCount / roster.length) * 100);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-blue-950 rounded-3xl p-6 sm:p-8 text-white border border-purple-800/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 uppercase tracking-wider">
              Faculty Roll Call Terminal
            </span>
            <span className="text-xs text-purple-200">
              • Incharge: {user?.name || 'Dr. S. Vijaya Nirmala'} {user?.facultyId ? `(${user.facultyId})` : ''}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">OOAD & UML Attendance Marker</h1>
          <p className="text-xs text-purple-200/80 mt-0.5">
            Course: 241CS017 • Section A • Room CSE-204 • Period 2 (10:00 AM - 11:00 AM)
          </p>
        </div>

        <div className="flex items-center gap-3 bg-purple-900/40 p-3 rounded-2xl border border-purple-700/50">
          <div className="text-center px-2">
            <div className="text-[10px] text-purple-200 uppercase font-bold">Present</div>
            <div className="text-2xl font-black text-emerald-400">{presentCount}</div>
          </div>
          <div className="text-center px-2 border-l border-purple-700/60">
            <div className="text-[10px] text-purple-200 uppercase font-bold">Absent</div>
            <div className="text-2xl font-black text-rose-400">{absentCount}</div>
          </div>
          <div className="text-center px-2 border-l border-purple-700/60">
            <div className="text-[10px] text-purple-200 uppercase font-bold">Turnout</div>
            <div className="text-2xl font-black text-white">{attendanceRate}%</div>
          </div>
        </div>
      </div>

      {isSubmitted && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white flex items-center justify-between shadow-lg animate-in slide-in-from-top duration-300">
          <div className="flex items-center space-x-2 text-xs font-bold">
            <CheckCircle2 className="w-5 h-5" />
            <span>Attendance successfully recorded to SSIS Central Database! Notifications dispatched.</span>
          </div>
        </div>
      )}

      {/* Roster Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Student Roll Call (Section A)</h2>
            <p className="text-xs text-slate-500">Click student status pill to toggle Present / Absent.</p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => markAll(true)}
              className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" /> All Present
            </button>
            <button
              onClick={() => markAll(false)}
              className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> All Absent
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-6">Roll Number</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4 text-center">Prior Attendance</th>
                <th className="py-3 px-6 text-right">Mark Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {roster.map(st => (
                <tr key={st.rollNumber} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-6 font-mono font-bold text-blue-900">{st.rollNumber}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">{st.name}</td>
                  <td className="py-3.5 px-4 text-center font-bold">
                    <span className={st.priorAttendance >= 75 ? 'text-emerald-700' : 'text-rose-600'}>
                      {st.priorAttendance.toFixed(2)}%
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <button
                      type="button"
                      onClick={() => toggleStudent(st.rollNumber)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition-all cursor-pointer ${
                        st.isPresent
                          ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-600/20'
                          : 'bg-rose-600 text-white hover:bg-rose-500 shadow-rose-600/20'
                      }`}
                    >
                      {st.isPresent ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      <span>{st.isPresent ? 'PRESENT' : 'ABSENT'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Topic & Confirmation Footer */}
        <form onSubmit={handleSubmit} className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
              Topic / Syllabus Delivered
            </label>
            <input
              type="text"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Unit 3: Design Patterns and Class Diagrams..."
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500 font-medium">
              Timestamp: {new Date().toLocaleDateString()} • Instructor Signature Recorded
            </span>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-purple-900 hover:bg-purple-800 text-white font-bold text-xs shadow-md shadow-purple-900/20 flex items-center space-x-2 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit & Publish Attendance</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
