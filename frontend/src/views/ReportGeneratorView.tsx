import React, { useRef } from 'react';
import { useStudent } from '../context/StudentContext';
import { 
  Printer, 
  Download, 
  FileCheck, 
  ShieldCheck, 
  Award, 
  Calendar, 
  CheckCircle2, 
  GraduationCap, 
  QrCode,
  School
} from 'lucide-react';

export const ReportGeneratorView: React.FC = () => {
  const { student, overallStats, subjectAttendance, performance } = useStudent();
  const reportRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm print:hidden">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 uppercase tracking-wider">
              Official Document
            </span>
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Digitally Verified
            </span>
          </div>
          <h1 className="text-2xl font-black text-blue-950 mt-1">Student Academic & Attendance Report</h1>
          <p className="text-xs text-slate-500">
            Aditya University official cumulative progress statement for parent review and exam eligibility.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-md shadow-blue-900/20 flex items-center space-x-2 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Report</span>
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 flex items-center space-x-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Card */}
      <div 
        ref={reportRef}
        className="bg-white rounded-3xl border border-slate-300 p-8 sm:p-12 shadow-md max-w-4xl mx-auto text-slate-800 print:shadow-none print:border-none print:p-0 print:m-0"
      >
        {/* Document Header */}
        <div className="border-b-2 border-blue-950 pb-6 text-center relative">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-950 text-orange-400 flex items-center justify-center font-black text-2xl shadow-md border-2 border-orange-400">
              <School className="w-8 h-8 text-orange-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-blue-950 uppercase">
                ADITYA UNIVERSITY
              </h1>
              <p className="text-[11px] font-semibold text-slate-600 tracking-wider uppercase">
                An Autonomous Institution • Accredited by NAAC with 'A++' Grade
              </p>
              <p className="text-[10px] text-slate-500">
                Aditya Nagar, ADB Road, Surampalem, Kakinada District, Andhra Pradesh - 533437
              </p>
            </div>
          </div>

          <div className="mt-4 py-1.5 px-4 bg-blue-950 text-white font-bold text-xs rounded-lg uppercase tracking-widest inline-block">
            CUMULATIVE ACADEMIC STATUS & ATTENDANCE STATEMENT
          </div>
        </div>

        {/* Student Metadata Card */}
        <div className="my-6 p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Student Name</span>
            <span className="font-extrabold text-slate-900 text-sm">{student.name}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Roll Number</span>
            <span className="font-mono font-bold text-blue-900 text-sm">{student.rollNumber}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Branch & Program</span>
            <span className="font-semibold text-slate-800">{student.program}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Semester / Section</span>
            <span className="font-semibold text-slate-800">{student.semester} - Section {student.section}</span>
          </div>
        </div>

        {/* Summary Metric Ribbon */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3 rounded-xl border border-slate-200 bg-white text-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Cumulative Attendance</span>
            <div className="text-2xl font-black text-blue-950 mt-0.5">{overallStats.overallPercentage.toFixed(2)}%</div>
            <span className="text-[10px] font-semibold text-emerald-600">334 / 434 Classes</span>
          </div>

          <div className="p-3 rounded-xl border border-slate-200 bg-white text-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Academic Average</span>
            <div className="text-2xl font-black text-slate-900 mt-0.5">82.00%</div>
            <span className="text-[10px] font-semibold text-purple-700">Projected SGPA 8.64</span>
          </div>

          <div className="p-3 rounded-xl border border-slate-200 bg-white text-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Examination Clearance</span>
            <div className="text-xl font-black text-emerald-600 mt-1">QUALIFIED</div>
            <span className="text-[10px] font-semibold text-slate-500">&gt; 75.00% Threshold Met</span>
          </div>
        </div>

        {/* Course-Wise Attendance & Marks Table */}
        <div className="mb-6">
          <h3 className="text-xs font-bold text-blue-950 uppercase tracking-wider mb-2">
            Course-Wise Performance Breakdown
          </h3>
          <table className="w-full text-left text-xs border border-slate-300 border-collapse">
            <thead>
              <tr className="bg-slate-100 text-[10px] font-bold text-slate-700 uppercase border-b border-slate-300">
                <th className="p-2 border-r border-slate-300">Course Code</th>
                <th className="p-2 border-r border-slate-300">Course Title</th>
                <th className="p-2 border-r border-slate-300 text-center">Held</th>
                <th className="p-2 border-r border-slate-300 text-center">Attended</th>
                <th className="p-2 border-r border-slate-300 text-center">Attendance %</th>
                <th className="p-2 border-r border-slate-300 text-center">Status</th>
                <th className="p-2 text-center">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {subjectAttendance.map((sub, i) => {
                const perf = performance.find(p => p.courseCode === sub.courseCode);
                return (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-2 font-mono font-semibold border-r border-slate-300">{sub.courseCode}</td>
                    <td className="p-2 font-medium border-r border-slate-300">{sub.subjectName}</td>
                    <td className="p-2 text-center border-r border-slate-300">{sub.totalHeld}</td>
                    <td className="p-2 text-center border-r border-slate-300 font-semibold">{sub.attended}</td>
                    <td className="p-2 text-center font-bold border-r border-slate-300">
                      {sub.percentage.toFixed(2)}%
                    </td>
                    <td className="p-2 text-center border-r border-slate-300 font-bold">
                      <span className={sub.percentage >= 75 ? 'text-emerald-700' : 'text-rose-700'}>
                        {sub.percentage >= 75 ? 'ELIGIBLE' : 'CONDONATION'}
                      </span>
                    </td>
                    <td className="p-2 text-center font-bold">{perf?.grade || 'A'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Verification and Signatures */}
        <div className="pt-8 border-t border-slate-300 grid grid-cols-3 gap-6 items-end text-center text-xs">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border border-slate-300 p-1 rounded-lg mb-2">
              <QrCode className="w-full h-full text-slate-800" />
            </div>
            <span className="text-[10px] text-slate-400">Scan to verify digital authenticity on ssis.aditya.ac.in</span>
          </div>

          <div className="space-y-1">
            <div className="h-10 flex items-center justify-center font-serif italic text-blue-900 font-bold">
              Dr. S. K. Vijaya
            </div>
            <div className="border-t border-slate-400 pt-1 font-bold text-slate-700">
              Head of Department (AI & ML)
            </div>
            <div className="text-[10px] text-slate-400">Aditya University</div>
          </div>

          <div className="space-y-1">
            <div className="h-10 flex items-center justify-center font-serif italic text-blue-900 font-bold">
              Prof. K. V. S. Rao
            </div>
            <div className="border-t border-slate-400 pt-1 font-bold text-slate-700">
              Dean of Academic Affairs
            </div>
            <div className="text-[10px] text-slate-400">Official Seal & Signature</div>
          </div>
        </div>
      </div>
    </div>
  );
};
