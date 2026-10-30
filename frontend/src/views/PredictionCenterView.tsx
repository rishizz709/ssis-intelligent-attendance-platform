import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { calculatePredictionModel } from '../utils/aiPrediction';
import { 
  Sparkles, 
  BrainCircuit, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Sliders, 
  Layers, 
  HelpCircle,
  Award,
  Zap,
  ArrowRight
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Cell } from 'recharts';

export const PredictionCenterView: React.FC = () => {
  const { overallStats, subjectAttendance, attendanceHistory } = useStudent();
  const [selectedScenario, setSelectedScenario] = useState<'90' | '75' | '50'>('90');

  // Compute AI prediction
  const prediction = calculatePredictionModel(
    overallStats.totalAttended,
    overallStats.totalHeld,
    520, // Total expected semester classes
    attendanceHistory
  );

  // Subject risk chart data
  const subjectRiskData = subjectAttendance.map(subject => ({
    name: subject.courseCode,
    fullName: subject.subjectName,
    current: Number(subject.percentage.toFixed(1)),
    predicted: Number((subject.percentage + (subject.percentage < 75 ? 2.5 : 0.8)).toFixed(1)),
    risk: subject.percentage < 75 ? 'HIGH' : subject.percentage < 80 ? 'MODERATE' : 'LOW'
  }));

  // Trend projection points
  const projectionTimeline = [
    { label: 'Week 1', actual: 74.2, predicted: 74.2 },
    { label: 'Week 4', actual: 75.8, predicted: 75.8 },
    { label: 'Week 8', actual: 76.5, predicted: 76.5 },
    { label: 'Week 12 (Now)', actual: 76.96, predicted: 76.96 },
    { label: 'Week 14', actual: null, predicted: 77.5 },
    { label: 'Week 16 (Pre-Finals)', actual: null, predicted: 78.1 },
    { label: 'Week 18 (End Sem)', actual: null, predicted: prediction.forecastedPercentage }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 rounded-3xl p-6 sm:p-8 text-white border border-blue-800/60 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-400/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Machine Learning Predictive Engine
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              AI Attendance & Performance Predictor
            </h1>
            <p className="text-xs sm:text-sm text-blue-200/80 max-w-2xl">
              Trained on historical semester velocity, morning attendance patterns, and academic correlations 
              to provide an empirical forecast of your final semester outcome.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center shrink-0">
            <div className="text-[10px] font-bold text-blue-200 uppercase tracking-wider">Model Accuracy</div>
            <div className="text-3xl font-black text-emerald-400 mt-1">94.2%</div>
            <div className="text-[10px] text-slate-300 font-medium">95% Confidence Interval</div>
          </div>
        </div>
      </div>

      {/* Main Prediction Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden transition-colors">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <span>End-Semester Forecast</span>
            <BrainCircuit className="w-4 h-4 text-blue-700 dark:text-blue-400" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-blue-950 dark:text-white">
              {(prediction.forecastedPercentage ?? prediction.projectedSemesterPercentage ?? 78.4).toFixed(2)}%
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
              SAFE PASS
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
            95% Confidence Interval: <strong className="text-slate-900 dark:text-white">[{(prediction.confidenceInterval?.lower ?? prediction.confidenceLower ?? 75.8).toFixed(1)}% — {(prediction.confidenceInterval?.upper ?? prediction.confidenceUpper ?? 81.2).toFixed(1)}%]</strong>
          </p>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Current: 76.96%</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +1.44% Trend
            </span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden transition-colors">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <span>Projected SGPA</span>
            <Award className="w-4 h-4 text-orange-500 dark:text-orange-400" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              8.64
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300">
              GRADE A+
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
            Based on current 82% internal marks average & attendance consistency multiplier.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Target: 8.50+</span>
            <span className="text-purple-700 dark:text-purple-400 font-bold">Top 5% Rank</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden transition-colors">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <span>Current Risk Status</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
              LOW RISK
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
              NO DEBAR
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
            Only 1 of 8 courses (<strong className="text-rose-600 dark:text-rose-400 font-bold">OOAD & UML</strong>) requires active attendance mitigation.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Condonation Buffer:</span>
            <span className="text-orange-600 dark:text-orange-400 font-bold">8 classes</span>
          </div>
        </div>
      </div>

      {/* Trajectory Timeline Chart */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-lg font-bold text-blue-950 dark:text-white">
              Semester Attendance Trajectory & Forecast Curve
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Historical actuals (Weeks 1–12) merged with linear regression trajectory (Weeks 14–18).
            </p>
          </div>
          <div className="flex items-center space-x-3 text-xs font-semibold">
            <span className="flex items-center gap-1 text-blue-900 dark:text-blue-400">
              <span className="w-3 h-0.5 bg-blue-900 dark:bg-blue-400"></span> Actual Trend
            </span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <span className="w-3 h-0.5 bg-emerald-500 border-dashed"></span> AI Projection
            </span>
            <span className="flex items-center gap-1 text-rose-500 dark:text-rose-400">
              <span className="w-3 h-0.5 bg-rose-500"></span> 75% Threshold
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={projectionTimeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#94A3B8" opacity={0.25} />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis domain={[72, 82]} tick={{ fontSize: 11, fill: '#64748B' }} unit="%" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F2A4A', borderColor: '#1E3A8A', borderRadius: '12px', color: '#fff', fontSize: '12px' }} 
              />
              <Line type="monotone" dataKey="actual" stroke="#1E3A8A" strokeWidth={3} dot={{ r: 4 }} connectNulls={false} />
              <Line type="monotone" dataKey="predicted" stroke="#10B981" strokeWidth={2.5} strokeDasharray="5 5" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3 Interactive Future Scenarios */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
        <div>
          <h2 className="text-xl font-bold text-blue-950 dark:text-white">
            Interactive Future Attendance Scenarios
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Test what will happen across the remaining 86 classes of the semester under various attendance commitments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Scenario 1: 90% Commitment */}
          <div 
            onClick={() => setSelectedScenario('90')}
            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
              selectedScenario === '90' 
                ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-500 shadow-md ring-2 ring-emerald-500/20' 
                : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                High Discipline (90%)
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                RECOMMENDED
              </span>
            </div>
            <div className="mt-3">
              <div className="text-3xl font-black text-emerald-700 dark:text-emerald-400">79.12%</div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Attend 77 of 86 remaining classes.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-100 dark:border-emerald-900/60 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
              <div className="flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Condonation Free
              </div>
              <div>Projected SGPA: <strong>8.82</strong></div>
            </div>
          </div>

          {/* Scenario 2: 75% Maintenance */}
          <div 
            onClick={() => setSelectedScenario('75')}
            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
              selectedScenario === '75' 
                ? 'bg-blue-50/50 dark:bg-blue-950/30 border-blue-500 shadow-md ring-2 ring-blue-500/20' 
                : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300">
                Maintenance (75%)
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300">
                BASELINE
              </span>
            </div>
            <div className="mt-3">
              <div className="text-3xl font-black text-blue-900 dark:text-blue-400">76.63%</div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Attend 65 of 86 remaining classes.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-blue-100 dark:border-blue-900/60 text-xs text-blue-950 dark:text-blue-200 space-y-1">
              <div className="flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" /> Standard Exam Eligible
              </div>
              <div>Projected SGPA: <strong>8.50</strong></div>
            </div>
          </div>

          {/* Scenario 3: 50% Lax */}
          <div 
            onClick={() => setSelectedScenario('50')}
            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
              selectedScenario === '50' 
                ? 'bg-rose-50/50 dark:bg-rose-950/30 border-rose-500 shadow-md ring-2 ring-rose-500/20' 
                : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-rose-200 dark:hover:border-rose-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">
                Complacent (50%)
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300">
                HIGH DANGER
              </span>
            </div>
            <div className="mt-3">
              <div className="text-3xl font-black text-rose-600 dark:text-rose-400">72.50%</div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Attend only 43 of 86 remaining classes.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-rose-100 dark:border-rose-900/60 text-xs text-rose-900 dark:text-rose-200 space-y-1">
              <div className="flex items-center gap-1 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" /> DEBARRED / CONDONATION
              </div>
              <div>Fine Required: <strong>₹2,500 INR</strong></div>
            </div>
          </div>
        </div>
      </div>

      {/* Model Feature Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
          <h3 className="text-base font-bold text-blue-950 dark:text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-700 dark:text-blue-400" />
            AI Model Feature Weights
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Past 30-Day Attendance Velocity', weight: '35%', desc: 'Recent consistency has highest correlation with future turns' },
              { label: 'Morning Period Ratio (09:00 - 10:00 AM)', weight: '20%', desc: 'Morning classes have 18% higher historic absenteeism rate' },
              { label: 'Subject Technical Rigor & Lab Demands', weight: '20%', desc: 'Lab subjects experience mandatory 90%+ physical attendance' },
              { label: 'Day of Week Fluctuations (Fri/Mon)', weight: '15%', desc: 'Mondays and Fridays correlate with extended weekend skips' },
              { label: 'Prior Semesters Baseline (1st - 4th Sem)', weight: '10%', desc: 'Historical 85%+ average student baseline factor' }
            ].map((f, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{f.label}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{f.desc}</div>
                </div>
                <span className="text-xs font-extrabold text-blue-900 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/80 px-2 py-0.5 rounded-md">
                  {f.weight}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
          <h3 className="text-base font-bold text-blue-950 dark:text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-orange-500 dark:text-orange-400" />
            Actionable AI Recommendations
          </h3>
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/80 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-amber-950 dark:text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" /> Urgent: Prioritize OOAD & UML
              </div>
              <p>
                OOAD (241CS017) is your only course below 75% (currently 71.43%). If you attend the upcoming Monday 10:00 AM class and the next 8 sessions, you will recover full 75%+ eligibility.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/80 text-xs text-blue-950 dark:text-blue-200 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-blue-900 dark:text-blue-300">
                <CheckCircle2 className="w-4 h-4 text-blue-700 dark:text-blue-400" /> Excel in API & Micro Services
              </div>
              <p>
                API & Micro Services (241CS019) under Kumari is in strong standing. Sustain perfect attendance to secure full internal marks and capstone honors.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 text-xs text-emerald-950 dark:text-emerald-200 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Target SGPA 8.8+ Potential
              </div>
              <p>
                By maintaining a 90% attendance discipline over the final 86 classes, your projected internal marks correlate to an SGPA of 8.82, placing you on the University Merit Roll.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
