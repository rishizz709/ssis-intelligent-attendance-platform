import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  BookOpen, 
  Search, 
  MessageSquare,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const FacultyDirectoryView: React.FC = () => {
  const { facultyList } = useStudent();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<any | null>(null);
  const [consultationSuccess, setConsultationSuccess] = useState(false);

  const filteredFaculty = facultyList.filter(f => {
    const subject = f.subject || (f.subjectsTaught ? f.subjectsTaught.join(', ') : '');
    const designation = f.designation || '';
    const name = f.name || '';
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      designation.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleBookConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultationSuccess(true);
    setTimeout(() => {
      setConsultationSuccess(false);
      setSelectedFaculty(null);
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 uppercase tracking-wider">
            Academic Mentorship
          </span>
          <h1 className="text-2xl font-black text-blue-950 dark:text-white mt-1">Faculty & Instructor Directory</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Connect with professors, course in-charges, and schedule office hour appointments.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search by faculty or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-850 transition-all"
          />
        </div>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFaculty.map((f) => (
          <div 
            key={f.id}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all hover:border-blue-300 dark:hover:border-blue-600 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center space-x-3.5 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-900 to-indigo-600 text-white font-bold text-base flex items-center justify-center shadow-md">
                  {f.name.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-tight">{f.name}</h3>
                  <p className="text-[11px] text-blue-700 dark:text-blue-400 font-semibold mt-0.5">{f.designation}</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">{f.department}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-3">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{f.subject || (f.subjectsTaught ? f.subjectsTaught.join(', ') : 'Academic Faculty')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400 shrink-0" />
                  <span>Cabin: {f.cabin || f.roomNumber || 'Faculty Block'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                  <span>Office Hours: {f.officeHours || '10:00 AM - 04:00 PM'}</span>
                </div>
                <div className="flex items-center space-x-2 text-[11px] text-blue-600 dark:text-blue-400 font-mono">
                  <Mail className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                  <a href={`mailto:${f.email}`} className="hover:underline">{f.email}</a>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <a
                href={`mailto:${f.email}`}
                className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-400 flex items-center gap-1 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" /> Email
              </a>
              <button
                onClick={() => setSelectedFaculty(f)}
                className="px-3 py-1.5 rounded-xl bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
              >
                Book Hours
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Book Consultation Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200 p-6 transition-colors">
            <h3 className="text-lg font-bold text-blue-950 dark:text-white">Book Office Hours Consultation</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              With <strong className="text-slate-850 dark:text-white">{selectedFaculty.name}</strong> ({selectedFaculty.subject || (selectedFaculty.subjectsTaught ? selectedFaculty.subjectsTaught.join(', ') : 'Faculty')})
            </p>

            {consultationSuccess ? (
              <div className="my-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Appointment request submitted! Faculty will confirm via email.</span>
              </div>
            ) : (
              <form onSubmit={handleBookConsultation} className="space-y-4 my-5">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Preferred Day & Slot</label>
                  <select className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Monday 03:30 PM - 04:30 PM</option>
                    <option>Wednesday 03:30 PM - 04:30 PM</option>
                    <option>Friday 11:15 AM - 12:15 PM</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Reason / Discussion Topic</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="e.g., Doubts in Class Diagram design or attendance condonation discussion..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <div className="flex items-center justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedFaculty(null)}
                    className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-medium cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
