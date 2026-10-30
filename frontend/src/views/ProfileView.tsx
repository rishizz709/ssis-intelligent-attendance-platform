import React from 'react';
import { useStudent } from '../context/StudentContext';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  GraduationCap, 
  Award, 
  BookOpen, 
  QrCode, 
  Bus, 
  CheckCircle2,
  Calendar,
  Building,
  Key
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { student, overallStats } = useStudent();
  const { user } = useAuth();

  const currentRole = user?.role || 'STUDENT';

  if (currentRole === 'FACULTY') {
    return (
      <div className="space-y-8 pb-12 animate-in fade-in duration-300">
        {/* Faculty Top Banner */}
        <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white border border-purple-800/50 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white font-black text-3xl flex items-center justify-center shadow-lg border-2 border-white/20">
              {user?.name?.split(' ').map((n: string) => n[0]).slice(0, 2).join('') || 'VN'}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-500 text-white uppercase tracking-wider">
                  Faculty Incharge
                </span>
                <span className="text-xs text-purple-200">ID: {user?.facultyId || 'FAC-201'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">{user?.name || 'Dr. S. Vijaya Nirmala'}</h1>
              <p className="text-xs text-purple-200/80">
                Department of {user?.department || 'Computer Science & Engineering'} • Aditya University
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
              <div className="text-[10px] text-purple-200 uppercase font-bold">Assigned Courses</div>
              <div className="text-2xl font-black text-white mt-0.5">2 Courses</div>
              <div className="text-[10px] text-purple-300">OOAD & UML • SWE</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
              <div className="text-[10px] text-purple-200 uppercase font-bold">Designation</div>
              <div className="text-lg font-black text-purple-300 mt-0.5">Associate Prof</div>
              <div className="text-[10px] text-purple-200">Cabin CSE-304</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Faculty Digital ID Card */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Faculty Smart Identity Card
            </h2>
            <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 rounded-3xl p-6 text-white border-2 border-purple-400/40 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-purple-800/80 pb-4">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center font-black text-white text-xs">
                    AU
                  </div>
                  <div>
                    <div className="font-extrabold text-sm tracking-tight">ADITYA UNIVERSITY</div>
                    <div className="text-[9px] text-purple-300 uppercase tracking-widest font-semibold">Faculty Identification</div>
                  </div>
                </div>
                <span className="text-[9px] font-mono bg-purple-900/80 px-2 py-0.5 rounded text-purple-200 font-bold">
                  ACTIVE
                </span>
              </div>

              <div className="my-5 flex items-center space-x-4">
                <div className="w-20 h-24 rounded-2xl bg-gradient-to-b from-purple-800 to-indigo-900 border-2 border-white/30 flex items-center justify-center text-white font-black text-2xl shadow-inner shrink-0">
                  {user?.name?.split(' ').map((n: string) => n[0]).slice(0, 2).join('') || 'VN'}
                </div>
                <div className="space-y-1">
                  <h3 className="font-black text-base text-white tracking-wide">{user?.name || 'Dr. S. Vijaya Nirmala'}</h3>
                  <div className="text-xs font-mono font-bold text-purple-400">{user?.facultyId || 'FAC-201'}</div>
                  <div className="text-[11px] text-slate-300 font-medium">Associate Professor</div>
                  <div className="text-[10px] text-purple-200">Dept. of {user?.department || 'Computer Science & Engineering'}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-purple-800/80 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="text-[9px] text-slate-400 uppercase">Official Email</div>
                  <div className="font-mono text-[11px] text-white">{user?.email || 'vijayanirmala@adityauniversity.in'}</div>
                </div>
                <div className="w-10 h-10 bg-white p-1 rounded-lg">
                  <QrCode className="w-full h-full text-slate-900" />
                </div>
              </div>
            </div>
          </div>

          {/* Faculty Academic Profile */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-base font-bold text-purple-950">Faculty Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 font-bold text-[10px] uppercase block">Faculty Name</span>
                  <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">{user?.name || 'Dr. S. Vijaya Nirmala'}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 font-bold text-[10px] uppercase block">Faculty ID</span>
                  <span className="font-mono font-extrabold text-purple-900 text-sm mt-0.5 block">{user?.facultyId || 'FAC-201'}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 font-bold text-[10px] uppercase block">Official Email</span>
                  <span className="font-medium text-slate-800 mt-0.5 block">{user?.email}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 font-bold text-[10px] uppercase block">Department</span>
                  <span className="font-bold text-slate-800 mt-0.5 block">{user?.department || 'Computer Science & Engineering'}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 font-bold text-[10px] uppercase block">Cabin / Office</span>
                  <span className="font-bold text-slate-800 mt-0.5 block">Cabin CSE-304, Ramanujan Block</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 font-bold text-[10px] uppercase block">Primary Course Assigned</span>
                  <span className="font-bold text-purple-900 mt-0.5 block">241CS017 - OOAD & UML (Sec A)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentRole === 'ADMIN') {
    return (
      <div className="space-y-8 pb-12 animate-in fade-in duration-300">
        {/* Admin Top Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-700 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white font-black text-3xl flex items-center justify-center shadow-lg border-2 border-white/20">
              DA
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500 text-white uppercase tracking-wider">
                  Academic Administrator
                </span>
                <span className="text-xs text-slate-300">Access: SUPER_ADMIN</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">{user?.name || 'Dean Academic Affairs'}</h1>
              <p className="text-xs text-slate-300">
                SSIS Central Administration • Aditya University
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900">Administrator Credentials & System Controls</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 font-bold text-[10px] uppercase block">Official Title</span>
              <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">{user?.name || 'Dean Academic Affairs'}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 font-bold text-[10px] uppercase block">Administrative Email</span>
              <span className="font-mono font-extrabold text-blue-900 text-sm mt-0.5 block">{user?.email || 'dean.admin@aditya.ac.in'}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 font-bold text-[10px] uppercase block">Security Role</span>
              <span className="font-bold text-emerald-700 mt-0.5 block">ROLE_ADMIN (Full Audit & CRUD Permissions)</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 font-bold text-[10px] uppercase block">AOP Telemetry Stream</span>
              <span className="font-bold text-slate-800 mt-0.5 block">Active • Intercepting All Controller Invocations</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STUDENT VIEW (Default for STUDENT role)
  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-blue-900 rounded-3xl p-6 sm:p-8 text-white border border-blue-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white font-black text-3xl flex items-center justify-center shadow-lg border-2 border-white/20">
            {user?.name?.split(' ').map((n: string) => n[0]).slice(0, 2).join('') || 'RV'}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-500 text-white uppercase tracking-wider">
                Aditya University Scholar
              </span>
              <span className="text-xs text-blue-200">ID: {user?.studentId || student.rollNumber}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">{user?.name || student.name}</h1>
            <p className="text-xs text-blue-200/80">
              {student.program} • {student.semester} • Section {student.section}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
            <div className="text-[10px] text-blue-200 uppercase font-bold">Attendance</div>
            <div className="text-2xl font-black text-emerald-400 mt-0.5">
              {overallStats.overallPercentage.toFixed(2)}%
            </div>
            <div className="text-[10px] text-blue-200">334 / 434 Classes</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
            <div className="text-[10px] text-blue-200 uppercase font-bold">CGPA</div>
            <div className="text-2xl font-black text-white mt-0.5">8.58</div>
            <div className="text-[10px] text-orange-400">Merit Rank #3</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Digital University ID Card */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Official Digital Identity Card
          </h2>

          <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 rounded-3xl p-6 text-white border-2 border-orange-400/40 shadow-2xl relative overflow-hidden">
            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-blue-800/80 pb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center font-black text-white text-xs">
                  AU
                </div>
                <div>
                  <div className="font-extrabold text-sm tracking-tight">ADITYA UNIVERSITY</div>
                  <div className="text-[9px] text-orange-300 uppercase tracking-widest font-semibold">Autonomous • NAAC A++</div>
                </div>
              </div>
              <span className="text-[9px] font-mono bg-blue-800/80 px-2 py-0.5 rounded text-blue-200 font-bold">
                VALID 2024-2028
              </span>
            </div>

            {/* Card Body */}
            <div className="my-5 flex items-center space-x-4">
              <div className="w-20 h-24 rounded-2xl bg-gradient-to-b from-blue-700 to-indigo-800 border-2 border-white/30 flex items-center justify-center text-white font-black text-2xl shadow-inner shrink-0">
                {user?.name?.split(' ').map((n: string) => n[0]).slice(0, 2).join('') || 'RV'}
              </div>
              <div className="space-y-1">
                <h3 className="font-black text-base text-white tracking-wide">{user?.name || student.name}</h3>
                <div className="text-xs font-mono font-bold text-orange-400">{user?.studentId || student.rollNumber}</div>
                <div className="text-[11px] text-slate-300 font-medium">{student.program}</div>
                <div className="text-[10px] text-blue-200">Dept. of AI & Machine Learning</div>
              </div>
            </div>

            {/* Barcode / QR Section */}
            <div className="pt-3 border-t border-blue-800/80 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <div className="text-[9px] text-slate-400 uppercase">Emergency Contact</div>
                <div className="font-mono text-[11px] text-white">+91 98480 12345</div>
              </div>
              <div className="w-10 h-10 bg-white p-1 rounded-lg">
                <QrCode className="w-full h-full text-slate-900" />
              </div>
            </div>
          </div>

          {/* Quick Status Badges */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Transportation / Bus Route</span>
              <span className="font-bold text-slate-800 flex items-center gap-1">
                <Bus className="w-3.5 h-3.5 text-blue-700" /> Route 14 (Kakinada Express)
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 pt-2">
              <span className="text-slate-500">Hostel / Residential</span>
              <span className="font-bold text-slate-800">Day Scholar</span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 pt-2">
              <span className="text-slate-500">Library Card Status</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Active (0 Overdue)
              </span>
            </div>
          </div>
        </div>

        {/* Right: Academic Records & Contacts */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-blue-950">Student Academic Profile</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-bold text-[10px] uppercase block">Full Official Name</span>
                <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">{user?.name || student.name}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-bold text-[10px] uppercase block">University Registration No</span>
                <span className="font-mono font-extrabold text-blue-900 text-sm mt-0.5 block">{user?.studentId || student.rollNumber}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-bold text-[10px] uppercase block">Official Email</span>
                <span className="font-medium text-slate-800 mt-0.5 block">{user?.email || student.email}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-bold text-[10px] uppercase block">Degree Program</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{student.program}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-bold text-[10px] uppercase block">Current Semester</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{student.semester} - Section {student.section}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-bold text-[10px] uppercase block">Academic Mentor / Proctor</span>
                <span className="font-bold text-blue-900 mt-0.5 block">Dr. K. S. Rao (Cabin 302)</span>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="border-t border-slate-200 pt-5 space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Automated Attendance & Performance Alerts
              </h3>
              <div className="space-y-2 text-xs text-slate-700">
                <label className="flex items-center space-x-2.5">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span>Receive WhatsApp alert when attendance falls below 75% threshold in any subject</span>
                </label>
                <label className="flex items-center space-x-2.5">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span>Send daily morning timetable schedule alert at 08:00 AM IST</span>
                </label>
                <label className="flex items-center space-x-2.5">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span>Monthly consolidated report dispatch to parent email</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
