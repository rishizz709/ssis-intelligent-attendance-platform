import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { 
  ShieldCheck, 
  Users, 
  UserPlus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  Download, 
  FileText, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  X,
  Clock,
  Terminal
} from 'lucide-react';

interface StudentRecord {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  program: string;
  semester: string;
  section: string;
  overallAttendance: number;
  cgpa: number;
  status: 'ELIGIBLE' | 'CONDONATION' | 'DEBARRED';
}

export const AdminPanelView: React.FC = () => {
  const { student, auditLogs } = useStudent();
  const [activeTab, setActiveTab] = useState<'students' | 'logs'>('students');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Initial student records
  const [students, setStudents] = useState<StudentRecord[]>([
    {
      id: '1',
      rollNumber: '24B11AI051',
      name: 'B. Rishi Vardhan',
      email: 'rishi.24b11ai051@aditya.ac.in',
      program: 'B.Tech AI & ML',
      semester: '5th Semester',
      section: 'A',
      overallAttendance: 76.96,
      cgpa: 8.58,
      status: 'ELIGIBLE'
    },
    {
      id: '2',
      rollNumber: '24B11AI052',
      name: 'G. Ananya Sharma',
      email: 'ananya.24b11ai052@aditya.ac.in',
      program: 'B.Tech AI & ML',
      semester: '5th Semester',
      section: 'A',
      overallAttendance: 84.20,
      cgpa: 9.12,
      status: 'ELIGIBLE'
    },
    {
      id: '3',
      rollNumber: '24B11AI053',
      name: 'K. Sai Teja',
      email: 'saiteja.24b11ai053@aditya.ac.in',
      program: 'B.Tech AI & ML',
      semester: '5th Semester',
      section: 'A',
      overallAttendance: 71.30,
      cgpa: 7.80,
      status: 'CONDONATION'
    },
    {
      id: '4',
      rollNumber: '24B11AI054',
      name: 'M. Harsha Vardhan',
      email: 'harsha.24b11ai054@aditya.ac.in',
      program: 'B.Tech AI & ML',
      semester: '5th Semester',
      section: 'B',
      overallAttendance: 64.80,
      cgpa: 7.15,
      status: 'DEBARRED'
    },
    {
      id: '5',
      rollNumber: '24B11AI055',
      name: 'P. Sneha Reddy',
      email: 'sneha.24b11ai055@aditya.ac.in',
      program: 'B.Tech AI & ML',
      semester: '5th Semester',
      section: 'A',
      overallAttendance: 91.50,
      cgpa: 9.40,
      status: 'ELIGIBLE'
    }
  ]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentRecord | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    program: 'B.Tech AI & ML',
    semester: '5th Semester',
    section: 'A',
    overallAttendance: 75,
    cgpa: 8.0
  });

  const handleOpenAdd = () => {
    setEditingStudent(null);
    setFormData({
      name: '',
      rollNumber: '',
      email: '',
      program: 'B.Tech AI & ML',
      semester: '5th Semester',
      section: 'A',
      overallAttendance: 75,
      cgpa: 8.0
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s: StudentRecord) => {
    setEditingStudent(s);
    setFormData({
      name: s.name,
      rollNumber: s.rollNumber,
      email: s.email,
      program: s.program,
      semester: s.semester,
      section: s.section,
      overallAttendance: s.overallAttendance,
      cgpa: s.cgpa
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this student record?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const computedStatus: 'ELIGIBLE' | 'CONDONATION' | 'DEBARRED' = 
      formData.overallAttendance >= 75 ? 'ELIGIBLE' :
      formData.overallAttendance >= 65 ? 'CONDONATION' : 'DEBARRED';

    if (editingStudent) {
      setStudents(students.map(s => s.id === editingStudent.id ? {
        ...s,
        ...formData,
        status: computedStatus
      } : s));
    } else {
      const newStudent: StudentRecord = {
        id: String(Date.now()),
        ...formData,
        status: computedStatus
      };
      setStudents([newStudent, ...students]);
    }
    setIsModalOpen(false);
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-700 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-400/30 uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Dean & Academic Administration
            </span>
            <span className="text-xs text-slate-400">• Role: SUPER_ADMIN</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">Student Management & Audit Console</h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Manage student registrations, conduct eligibility checks, and inspect Spring AOP system telemetry.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700">
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'students' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Students CRUD ({students.length})
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'logs' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>AOP Audit Logs</span>
          </button>
        </div>
      </div>

      {activeTab === 'students' ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Action and Filter Bar */}
          <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search roll or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
              >
                <option value="ALL">All Statuses</option>
                <option value="ELIGIBLE">Eligible (≥75%)</option>
                <option value="CONDONATION">Condonation (65-74%)</option>
                <option value="DEBARRED">Debarred (&lt;65%)</option>
              </select>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <button
                onClick={handleOpenAdd}
                className="px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-md shadow-blue-900/20 flex items-center space-x-1.5 transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add Student</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3.5 px-6">Student Info</th>
                  <th className="py-3.5 px-4">Program & Sem</th>
                  <th className="py-3.5 px-4 text-center">Attendance %</th>
                  <th className="py-3.5 px-4 text-center">CGPA</th>
                  <th className="py-3.5 px-4 text-center">Eligibility</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900">{s.name}</div>
                      <div className="text-[11px] font-mono text-blue-900 font-semibold">{s.rollNumber}</div>
                      <div className="text-[10px] text-slate-400">{s.email}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-slate-800">{s.program}</div>
                      <div className="text-[11px] text-slate-500">{s.semester} • Sec {s.section}</div>
                    </td>
                    <td className="py-4 px-4 text-center font-bold text-slate-900">
                      <span className={s.overallAttendance >= 75 ? 'text-emerald-700' : 'text-rose-600'}>
                        {s.overallAttendance.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center font-bold text-blue-950">
                      {s.cgpa.toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-block font-extrabold px-2.5 py-0.5 rounded-full text-[10px] ${
                        s.status === 'ELIGIBLE' ? 'bg-emerald-100 text-emerald-800' :
                        s.status === 'CONDONATION' ? 'bg-amber-100 text-amber-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(s)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-900 transition-colors cursor-pointer"
                        title="Edit Student"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete Student"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* AOP Audit Logs View */
        <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 shadow-xl text-slate-200 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <Terminal className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-white">Spring AOP @Around Method Interception Logs</h2>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1 rounded-full">
              LIVE TELEMETRY STREAM
            </span>
          </div>

          <div className="space-y-2 font-mono text-xs max-h-[500px] overflow-y-auto">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2 text-slate-400 text-[11px]">
                    <span className="text-blue-400 font-bold">{log.timestamp}</span>
                    <span>•</span>
                    <span className="text-purple-400 font-semibold">{log.user}</span>
                    <span>•</span>
                    <span className="text-slate-500">IP: {log.ipAddress}</span>
                  </div>
                  <div className="text-emerald-300 font-semibold">{log.action}</div>
                  <div className="text-slate-400 text-[11px] truncate max-w-xl">{log.details}</div>
                </div>
                <div className="flex items-center space-x-3 shrink-0">
                  <span className="text-[11px] font-bold text-orange-400 bg-orange-950/50 px-2 py-0.5 rounded border border-orange-800/40">
                    {log.executionTimeMs} ms
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                    200 OK
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add / Edit Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-blue-950 text-white p-6 flex items-center justify-between">
              <h3 className="text-base font-bold">
                {editingStudent ? 'Edit Student Record' : 'Register New Student'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStudent} className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Student Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. B. Rishi Vardhan"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Roll Number</label>
                  <input
                    type="text"
                    required
                    value={formData.rollNumber}
                    onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                    placeholder="24B11AI051"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Section</label>
                  <input
                    type="text"
                    required
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    placeholder="A"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">College Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="rishi.24b11ai051@aditya.ac.in"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Current Attendance %</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    required
                    value={formData.overallAttendance}
                    onChange={(e) => setFormData({ ...formData, overallAttendance: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">CGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    required
                    value={formData.cgpa}
                    onChange={(e) => setFormData({ ...formData, cgpa: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 font-bold"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold shadow-md cursor-pointer"
                >
                  Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
