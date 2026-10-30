import React, { useState } from 'react';
import { SubjectAttendance } from '../types';
import { calculateAttendanceStatus, calculateSubjectProjection } from '../utils/attendanceMath';
import { 
  X, 
  Calendar, 
  User, 
  MapPin, 
  Mail, 
  BookOpen, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Sliders, 
  FileText,
  Clock
} from 'lucide-react';

interface SubjectDetailModalProps {
  subject: SubjectAttendance | null;
  onClose: () => void;
  onSimulateAction?: (subjectId: string, action: 'attend' | 'miss') => void;
}

export const SubjectDetailModal: React.FC<SubjectDetailModalProps> = ({ subject, onClose }) => {
  const [sliderClasses, setSliderClasses] = useState(5);
  const [sliderType, setSliderType] = useState<'attend' | 'miss'>('attend');

  if (!subject) return null;

  const attended = subject.attended ?? subject.classesAttended ?? 0;
  const totalHeld = subject.totalHeld ?? subject.classesHeld ?? 0;

  const currentStatus = calculateAttendanceStatus(attended, totalHeld, 75);
  const projectedAttend = calculateSubjectProjection(attended, totalHeld, 1, 0);
  const projectedMiss = calculateSubjectProjection(attended, totalHeld, 0, 1);

  // Custom slider projection
  const sliderProjected = sliderType === 'attend' 
    ? calculateSubjectProjection(attended, totalHeld, sliderClasses, 0)
    : calculateSubjectProjection(attended, totalHeld, 0, sliderClasses);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Aditya University Subject Accent */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-400/30 uppercase tracking-wider">
              {subject.courseCode}
            </span>
            <span className="text-xs text-blue-200">
              {subject.credits} Credits • Semester 5
            </span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-white">
            {subject.subjectName}
          </h2>
          <p className="text-xs text-blue-200/80 mt-1 flex items-center gap-3">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-orange-400" /> Faculty: {subject.facultyName}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-300" /> Room: {subject.room}
            </span>
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Current Attendance</div>
              <div className={`text-2xl font-bold mt-1 ${subject.percentage >= 75 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {subject.percentage.toFixed(2)}%
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {subject.attended} / {subject.totalHeld} held
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Academic Status</div>
              <div className={`text-sm font-bold mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md ${
                subject.percentage >= 75 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                {subject.percentage >= 75 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                {subject.status === 'GOOD' ? 'Eligible (Safe)' : 'Below Target'}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">75% Min. Required</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Safe Bunks Left</div>
              <div className="text-2xl font-bold text-blue-900 mt-1">
                {currentStatus.classesCanMiss}
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                {currentStatus.classesCanMiss > 0 ? 'Before dipping <75%' : 'None available'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Classes Needed (75%)</div>
              <div className="text-2xl font-bold text-orange-600 mt-1">
                {currentStatus.classesNeeded}
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                {currentStatus.classesNeeded > 0 ? 'Consecutive attend' : 'Already on track'}
              </div>
            </div>
          </div>

          {/* Interactive What-If Simulator for This Subject */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-blue-700" />
                <h3 className="text-xs font-bold text-blue-950 uppercase tracking-wider">
                  Subject Specific What-If Simulator
                </h3>
              </div>
              <div className="flex items-center space-x-1 bg-white p-1 rounded-lg border border-blue-200 text-xs font-medium">
                <button
                  onClick={() => setSliderType('attend')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    sliderType === 'attend' 
                      ? 'bg-emerald-600 text-white font-bold shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  If I Attend
                </button>
                <button
                  onClick={() => setSliderType('miss')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    sliderType === 'miss' 
                      ? 'bg-rose-600 text-white font-bold shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  If I Miss
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-700 font-medium">
                <span>Simulate next: <strong className="text-blue-950">{sliderClasses} classes</strong></span>
                <span className="text-slate-500">Range: 1 to 20 classes</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={sliderClasses}
                onChange={(e) => setSliderClasses(Number(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-700"
              />

              <div className="p-3 bg-white rounded-lg border border-blue-200/80 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500 font-medium">
                    New Projection ({sliderType === 'attend' ? `+${sliderClasses} Attended` : `+${sliderClasses} Missed`}):
                  </div>
                  <div className="text-base font-bold text-blue-950 mt-0.5">
                    {sliderProjected.projectedAttended} / {sliderProjected.projectedTotal} classes
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xl font-black ${
                    sliderProjected.projectedPercentage >= 75 ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {sliderProjected.projectedPercentage.toFixed(2)}%
                  </div>
                  <div className={`text-xs font-semibold ${
                    sliderProjected.delta >= 0 ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {sliderProjected.delta >= 0 ? `+${sliderProjected.delta.toFixed(2)}%` : `${sliderProjected.delta.toFixed(2)}%`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Immediate Impact Card */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50">
              <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Attend Next Class (+1)
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-xl font-bold text-emerald-950">{projectedAttend.projectedPercentage.toFixed(2)}%</span>
                <span className="text-xs font-bold text-emerald-600">+{projectedAttend.delta.toFixed(2)}%</span>
              </div>
              <p className="text-[10px] text-emerald-700 mt-1">
                New tally: {projectedAttend.projectedAttended} / {projectedAttend.projectedTotal}
              </p>
            </div>

            <div className="p-3 rounded-xl border border-rose-200 bg-rose-50/50">
              <div className="text-[11px] font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                Miss Next Class (-1)
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-xl font-bold text-rose-950">{projectedMiss.projectedPercentage.toFixed(2)}%</span>
                <span className="text-xs font-bold text-rose-600">{projectedMiss.delta.toFixed(2)}%</span>
              </div>
              <p className="text-[10px] text-rose-700 mt-1">
                New tally: {projectedMiss.projectedAttended} / {projectedMiss.projectedTotal}
              </p>
            </div>
          </div>

          {/* Faculty & Academic Notes */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-800">Faculty Office Hours & Cabin</div>
              <p className="text-xs text-slate-600">
                {subject.facultyName} • Cabin Ramanujan Block Room 304 • Consultation: Mon/Wed 3:30–4:30 PM
              </p>
            </div>
            <a 
              href={`mailto:${subject.facultyEmail}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-medium hover:bg-slate-100 transition-colors shadow-sm"
            >
              <Mail className="w-3.5 h-3.5 text-blue-600" /> Email Faculty
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            Subject ID: {subject.id} • Aditya University SSIS Engine
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
