import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { TimetableEntry } from '../types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Upload, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  FileSpreadsheet, 
  X, 
  Plus, 
  Sparkles,
  Layers
} from 'lucide-react';

export const TimetableView: React.FC = () => {
  const { timetable, importTimetableFromCSV } = useStudent();
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [isCsvModalOpen, setIsCsvModalOpen] = useState<boolean>(false);
  const [csvContent, setCsvContent] = useState<string>('');
  const [csvError, setCsvError] = useState<string | null>(null);
  const [csvSuccess, setCsvSuccess] = useState<string | null>(null);
  const [previewRows, setPreviewRows] = useState<Partial<TimetableEntry>[]>([]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const filteredEntries = timetable
    .filter(t => selectedDay === 'All' ? true : t.dayOfWeek.toLowerCase() === selectedDay.toLowerCase())
    .sort((a, b) => (a.period ?? 0) - (b.period ?? 0));

  // Sample CSV format generator
  const handleDownloadSample = () => {
    const sampleHeaders = 'dayOfWeek,period,timeSlot,courseCode,subjectName,facultyName,room,type\n';
    const sampleRows = [
      'Monday,1,09:00 AM - 10:00 AM,241CS018,Machine Learning,Dr. K. S. Rao,CSE-204,LECTURE',
      'Monday,2,10:00 AM - 11:00 AM,241CS017,OOAD & UML,Sunkavilli Vijaya Nirmala,CSE-204,LECTURE',
      'Monday,3,11:15 AM - 12:15 PM,241CS019,Cloud Computing,Dr. P. Rajesh,LAB-3,LAB',
      'Tuesday,1,09:00 AM - 10:00 AM,241CS020,Deep Learning,Dr. M. Swetha,CSE-204,LECTURE'
    ].join('\n');

    const blob = new Blob([sampleHeaders + sampleRows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aditya_timetable_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleCsvPasteOrUpload = (content: string) => {
    setCsvContent(content);
    setCsvError(null);
    setCsvSuccess(null);

    try {
      const lines = content.trim().split('\n');
      if (lines.length < 2) {
        setCsvError('CSV must include a header line and at least one schedule row.');
        setPreviewRows([]);
        return;
      }

      const rows: Partial<TimetableEntry>[] = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const cols = line.split(',').map(c => c.trim().replace(/^"|"$/g, ''));
        if (cols.length >= 7) {
          rows.push({
            dayOfWeek: cols[0],
            period: parseInt(cols[1], 10) || i,
            timeSlot: cols[2],
            courseCode: cols[3],
            subjectName: cols[4],
            facultyName: cols[5],
            room: cols[6],
            type: (cols[7] === 'LAB' || cols[7] === 'TUTORIAL') ? cols[7] : 'LECTURE'
          });
        }
      }

      if (rows.length === 0) {
        setCsvError('No valid rows found. Ensure format matches: dayOfWeek,period,timeSlot,courseCode,subjectName,facultyName,room,type');
      } else {
        setPreviewRows(rows);
      }
    } catch (err: any) {
      setCsvError('Parsing failed: ' + err.message);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        handleCsvPasteOrUpload(text);
      };
      reader.readAsText(file);
    }
  };

  const handleConfirmImport = () => {
    if (previewRows.length === 0) {
      setCsvError('No valid schedule entries to import.');
      return;
    }

    const success = importTimetableFromCSV(csvContent);
    if (success) {
      setCsvSuccess(`Successfully imported ${previewRows.length} timetable periods!`);
      setTimeout(() => {
        setIsCsvModalOpen(false);
        setCsvContent('');
        setPreviewRows([]);
        setCsvSuccess(null);
      }, 1200);
    } else {
      setCsvError('Failed to import timetable. Please check CSV column format.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase tracking-wider">
              Semester 5 Schedule
            </span>
            <span className="text-xs text-slate-400 font-medium">• Section A (AI & ML)</span>
          </div>
          <h1 className="text-2xl font-black text-blue-950 mt-1">Smart Academic Timetable</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Aditya University official class schedule with active period indicators and batch allocations.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsCsvModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-md shadow-blue-900/20 flex items-center space-x-2 transition-all cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Import Timetable CSV</span>
          </button>
        </div>
      </div>

      {/* Day Selector Navigation Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedDay('All')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
            selectedDay === 'All'
              ? 'bg-blue-900 text-white shadow-md shadow-blue-900/20'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All Days (Weekly Matrix)
        </button>
        {days.map(day => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              selectedDay === day
                ? 'bg-blue-900 text-white shadow-md shadow-blue-900/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule Period Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEntries.map(entry => {
          const isLab = entry.type === 'LAB';
          const isNextHero = entry.courseCode === '241CS017' && entry.period === 2 && entry.dayOfWeek === 'Monday';

          return (
            <div 
              key={entry.id}
              className={`p-5 rounded-2xl border transition-all ${
                isNextHero 
                  ? 'bg-gradient-to-br from-blue-50 to-orange-50/40 border-2 border-orange-400 shadow-md ring-2 ring-orange-400/20'
                  : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-xs">
                    P{entry.period}
                  </span>
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{entry.timeSlot}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5">
                  {isNextHero && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-orange-500 text-white uppercase tracking-wider animate-pulse">
                      NEXT UP
                    </span>
                  )}
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isLab ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {entry.type}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 text-base group-hover:text-blue-900">
                  {entry.subjectName}
                </h3>
                <div className="text-xs text-slate-500 font-mono mt-0.5">
                  {entry.courseCode} • {entry.dayOfWeek}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600 font-medium">
                <div className="flex items-center space-x-2">
                  <User className="w-3.5 h-3.5 text-blue-700" />
                  <span>{entry.facultyName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-orange-600" />
                  <span>Room: {entry.room}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredEntries.length === 0 && (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">No scheduled classes for this day</h3>
          <p className="text-xs text-slate-400 mt-1">Enjoy your study break or self-study project hours.</p>
        </div>
      )}

      {/* CSV IMPORT MODAL */}
      {isCsvModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-blue-950 text-white p-6 flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <FileSpreadsheet className="w-5 h-5 text-orange-400" />
                  <h2 className="text-lg font-bold">Import Timetable CSV Data</h2>
                </div>
                <p className="text-xs text-blue-200/80 mt-1">
                  Upload an institution-generated CSV file or paste formatted timetable rows.
                </p>
              </div>
              <button
                onClick={() => setIsCsvModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-blue-50/70 border border-blue-200">
                <div className="text-xs text-blue-950 font-medium">
                  <strong>Expected CSV Schema:</strong> <br />
                  <code className="text-[11px] font-mono text-blue-900">
                    dayOfWeek,period,timeSlot,courseCode,subjectName,facultyName,room,type
                  </code>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadSample}
                  className="px-3 py-1.5 rounded-xl bg-white border border-blue-300 text-blue-900 font-bold text-xs hover:bg-blue-100 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer shrink-0"
                >
                  <Download className="w-3.5 h-3.5 text-blue-700" /> Download Sample Template
                </button>
              </div>

              {/* Upload Input & Paste Area */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select CSV File or Paste Raw Content
                  </label>
                  <label className="cursor-pointer text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Browse .csv file</span>
                    <input 
                      type="file" 
                      accept=".csv,text/csv" 
                      onChange={handleFileUpload} 
                      className="hidden" 
                    />
                  </label>
                </div>

                <textarea
                  rows={6}
                  value={csvContent}
                  onChange={(e) => handleCsvPasteOrUpload(e.target.value)}
                  placeholder="dayOfWeek,period,timeSlot,courseCode,subjectName,facultyName,room,type&#10;Monday,1,09:00 AM - 10:00 AM,241CS018,Machine Learning,Dr. K. S. Rao,CSE-204,LECTURE&#10;Monday,2,10:00 AM - 11:00 AM,241CS017,OOAD & UML,Sunkavilli Vijaya Nirmala,CSE-204,LECTURE"
                  className="w-full p-3 rounded-2xl border border-slate-300 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              {csvError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{csvError}</span>
                </div>
              )}

              {csvSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{csvSuccess}</span>
                </div>
              )}

              {/* Live Preview Table */}
              {previewRows.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Parsed Rows Preview ({previewRows.length} entries)
                  </div>
                  <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-500 sticky top-0">
                        <tr>
                          <th className="p-2">Day</th>
                          <th className="p-2">Period</th>
                          <th className="p-2">Time</th>
                          <th className="p-2">Course</th>
                          <th className="p-2">Room</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {previewRows.slice(0, 5).map((r, i) => (
                          <tr key={i}>
                            <td className="p-2 font-medium">{r.dayOfWeek}</td>
                            <td className="p-2">P{r.period}</td>
                            <td className="p-2">{r.timeSlot}</td>
                            <td className="p-2">{r.courseCode} - {r.subjectName}</td>
                            <td className="p-2">{r.room}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setIsCsvModalOpen(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 font-medium text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmImport}
                disabled={previewRows.length === 0}
                className="px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-blue-900/20 flex items-center space-x-1.5 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm & Apply Timetable</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
