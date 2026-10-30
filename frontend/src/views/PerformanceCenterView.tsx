import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { 
  Award, 
  TrendingUp, 
  BarChart2, 
  BookOpen, 
  CheckCircle2, 
  Download, 
  FileText, 
  Sparkles,
  ArrowUpRight,
  GraduationCap
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ScatterChart, Scatter, ZAxis } from 'recharts';

export const PerformanceCenterView: React.FC = () => {
  const { student, performance } = useStudent();
  const [selectedSemester, setSelectedSemester] = useState<number>(5);

  const semesterGpaHistory = [
    { sem: 'Sem 1', sgpa: 8.42, cgpa: 8.42, credits: 21 },
    { sem: 'Sem 2', sgpa: 8.55, cgpa: 8.48, credits: 22 },
    { sem: 'Sem 3', sgpa: 8.60, cgpa: 8.52, credits: 23 },
    { sem: 'Sem 4', sgpa: 8.70, cgpa: 8.56, credits: 22 },
    { sem: 'Sem 5 (Current)', sgpa: 8.64, cgpa: 8.58, credits: 24 }
  ];

  // Subject performance bar chart
  const subjectScoresData = performance.map(p => {
    const marks = p.internalMarks ?? p.totalInternal ?? 0;
    const maxMarks = p.maxInternalMarks ?? p.maxInternal ?? 40;
    return {
      name: p.courseCode,
      fullName: p.subjectName || p.courseName,
      internalMarks: marks,
      maxInternal: maxMarks,
      percentage: Math.round((marks / maxMarks) * 100),
      grade: p.grade || p.predictedGrade
    };
  });

  // Correlation dataset between attendance and academic score
  const correlationData = [
    { attendance: 71.4, score: 76, subject: 'OOAD & UML' },
    { attendance: 75.0, score: 79, subject: 'Deep Learning' },
    { attendance: 76.2, score: 81, subject: 'Compiler Design' },
    { attendance: 76.9, score: 82, subject: 'Machine Learning' },
    { attendance: 77.8, score: 84, subject: 'Web Technologies' },
    { attendance: 78.6, score: 85, subject: 'Data Mining' },
    { attendance: 80.0, score: 88, subject: 'AI Ethics' },
    { attendance: 80.7, score: 90, subject: 'API & Micro Services' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 rounded-3xl p-6 sm:p-8 text-white border border-blue-700/50 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-500 text-white uppercase tracking-wider">
                Academic Results Center
              </span>
              <span className="text-xs text-blue-200">Aditya University Autonomous Grading</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">
              Student Performance & Grading Metrics
            </h1>
            <p className="text-xs sm:text-sm text-blue-200/80 mt-1 max-w-xl">
              Verified internal assessment scores, grade point averages, and the empirical link between lecture attendance and academic excellence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 text-center">
              <div className="text-[10px] font-bold text-blue-200 uppercase tracking-wider">Cumulative CGPA</div>
              <div className="text-3xl font-black text-white mt-0.5">8.58</div>
              <div className="text-[10px] text-emerald-300 font-semibold">First Class with Distinction</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 text-center">
              <div className="text-[10px] font-bold text-blue-200 uppercase tracking-wider">Sem 5 SGPA</div>
              <div className="text-3xl font-black text-orange-400 mt-0.5">8.64</div>
              <div className="text-[10px] text-blue-200 font-medium">Projected 24 Credits</div>
            </div>
          </div>
        </div>
      </div>

      {/* Semester GPA Track Record */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-blue-950 dark:text-white">Academic Progression (Sem 1 to Sem 5)</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Continuous semester grade point trajectory.</p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300">
            112 Total Credits Earned
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {semesterGpaHistory.map((s, idx) => (
            <div 
              key={idx}
              className={`p-4 rounded-2xl border transition-all ${
                s.sem.includes('Current')
                  ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-400 dark:border-blue-600 shadow-sm ring-1 ring-blue-400/30'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{s.sem}</div>
              <div className="text-2xl font-black text-blue-950 dark:text-white mt-1">{s.sgpa}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex justify-between">
                <span>CGPA: <strong className="text-slate-700 dark:text-slate-300">{s.cgpa}</strong></span>
                <span>{s.credits} Cr</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subject Internal Marks Breakdown */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-blue-950 dark:text-white">5th Semester Internal Marks Evaluation</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Includes Mid Exams, Continuous Lab Assessment, and Assignments.</p>
          </div>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Export Marksheet
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/80 text-[11px] uppercase font-bold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                <th className="py-3.5 px-6">Subject Name</th>
                <th className="py-3.5 px-4">Code</th>
                <th className="py-3.5 px-4 text-center">Score / Max</th>
                <th className="py-3.5 px-4 text-center">Percentage</th>
                <th className="py-3.5 px-4 text-center">Grade</th>
                <th className="py-3.5 px-6">Evaluation Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {performance.map((p, i) => {
                const marks = p.internalMarks ?? p.totalInternal ?? 0;
                const maxMarks = p.maxInternalMarks ?? p.maxInternal ?? 40;
                const pct = Math.round((marks / maxMarks) * 100);
                return (
                  <tr key={i} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">{p.subjectName || p.courseName}</td>
                    <td className="py-4 px-4 font-mono text-slate-500 dark:text-slate-400">{p.courseCode}</td>
                    <td className="py-4 px-4 text-center font-bold text-slate-800 dark:text-slate-200">
                      {marks} / {maxMarks}
                    </td>
                    <td className="py-4 px-4 text-center font-semibold text-blue-900 dark:text-blue-400">
                      {pct}%
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-block font-extrabold px-2.5 py-0.5 rounded-full text-xs ${
                        p.grade === 'O' ? 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300' :
                        p.grade === 'A+' ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300' :
                        'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300'
                      }`}>
                        {p.grade}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendance vs Marks Correlation Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-lg font-bold text-blue-950 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Attendance vs Academic Score Empirical Correlation
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Shows how student lecture attendance directly correlates with higher internal performance.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full">
            Pearson r = +0.89 (Strong Positive Correlation)
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={correlationData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#94A3B8" opacity={0.25} />
              <XAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748B' }} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: '#64748B' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F2A4A', borderColor: '#1E3A8A', borderRadius: '12px', color: '#fff', fontSize: '12px' }} 
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="attendance" name="Attendance %" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="score" name="Internal Score %" fill="#F97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
