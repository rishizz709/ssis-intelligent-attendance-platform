import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  GraduationCap, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Calendar, 
  Award, 
  BookOpen, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  UserCheck,
  Sun,
  Moon
} from 'lucide-react';

export const LandingLoginView: React.FC = () => {
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState('rishi.24b11ai051@aditya.ac.in');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err?.message || 'Invalid credentials. Please use an Aditya University email or quick demo login below.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
    setError(null);
    setLoading(true);
    try {
      await login(demoEmail, 'password123');
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-slate-100 flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-blue-900/40 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-orange-500 flex items-center justify-center shadow-lg shadow-blue-900/50 ring-2 ring-blue-400/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-blue-100 to-orange-300 bg-clip-text text-transparent">
                  ADITYA UNIVERSITY
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 uppercase tracking-wider">
                  SSIS v2.5
                </span>
              </div>
              <p className="text-xs text-blue-200/70 font-medium">
                Intelligent Student Academic & Attendance Platform
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 sm:space-x-6 text-sm text-blue-200/80">
            <span className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> NAAC A++ Accredited
            </span>
            <span className="hidden md:inline text-blue-500/40">•</span>
            <span className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
              <Sparkles className="w-4 h-4 text-orange-400" /> AI Attendance Engine
            </span>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-amber-400 hover:text-amber-300 border border-slate-700 transition-all cursor-pointer shadow-sm"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-blue-300" />}
            </button>

            <a 
              href="#login-form" 
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-md shadow-blue-700/30 transition-all hover:scale-105"
            >
              Portal Login
            </a>
          </div>
        </div>
      </header>

      {/* Main Hero & Split Layout */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Product Showcase & Value Props */}
        <div className="lg:col-span-7 space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold backdrop-blur-sm shadow-inner">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
            Next-Gen Academic Intelligence Suite
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
              Know Your Status. <br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-200 to-orange-400 bg-clip-text text-transparent">
                Plan Attendance.
              </span> <br />
              Predict Performance.
            </h1>
            <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
              No more guesswork before exams. Track every single class in real-time, 
              simulate <span className="text-orange-400 font-semibold">what-if scenarios</span> before bunking, 
              and harness linear predictive models to guarantee your academic eligibility.
            </p>
          </div>

          {/* Live Metric Cards Showcase */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-blue-800/40 backdrop-blur-sm hover:border-blue-500/50 transition-all group">
              <div className="text-xs font-medium text-blue-300/80 uppercase tracking-wider mb-1 flex items-center justify-between">
                Current Threshold
                <TrendingUp className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">76.96%</div>
              <div className="text-xs text-emerald-400 font-medium mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> +1.96% above 75%
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-blue-800/40 backdrop-blur-sm hover:border-blue-500/50 transition-all group">
              <div className="text-xs font-medium text-blue-300/80 uppercase tracking-wider mb-1 flex items-center justify-between">
                Classes Held
                <Calendar className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">334 / 434</div>
              <div className="text-xs text-blue-300/80 font-medium mt-1">
                Semester 5 • Sec A
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-slate-800/60 border border-blue-800/40 backdrop-blur-sm hover:border-orange-500/50 transition-all group">
              <div className="text-xs font-medium text-blue-300/80 uppercase tracking-wider mb-1 flex items-center justify-between">
                Safe Bunk Buffer
                <Award className="w-4 h-4 text-orange-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-orange-400 tracking-tight">8 Classes</div>
              <div className="text-xs text-slate-300 font-medium mt-1">
                Safe to miss without debars
              </div>
            </div>
          </div>

          {/* Key Feature Bullets */}
          <div className="space-y-3 pt-2">
            {[
              'Hero Next-Class projection: Know exact percentage gain (+0.50%) or loss (-1.25%) before stepping into class',
              'Smart Target Simulator: Dynamic slider from 70% to 95% with mathematical formula proof',
              'AI Regression Forecast: Machine learning linear trend with 95% confidence intervals',
              'Aditya University Official Academic Report generator with PDF print layout'
            ].map((feat, i) => (
              <div key={i} className="flex items-start space-x-3 text-sm text-slate-300">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Login Portal */}
        <div id="login-form" className="lg:col-span-5">
          <div className="bg-slate-800/90 border border-blue-800/50 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-950/80 backdrop-blur-xl relative overflow-hidden">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-orange-500 to-blue-400"></div>

            <div className="mb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-orange-400 tracking-wider uppercase">
                  Single Sign-On (SSO)
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-medium">
                  Academic Session 2026-27
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white mt-1">Sign in to Student Portal</h2>
              <p className="text-xs text-slate-400 mt-1">
                Log in with your official university credentials or select a test role.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  College Email or Roll Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rollno@aditya.ac.in"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Password
                  </label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Demo Password is: password123'); }} className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={rememberMe} 
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500" 
                  />
                  <span>Keep me signed in</span>
                </label>
                <span className="text-emerald-400 font-medium">SSL Encrypted 256-bit</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 hover:from-blue-500 hover:to-orange-400 text-white font-semibold text-sm shadow-lg shadow-blue-700/30 flex items-center justify-center space-x-2 transition-all transform active:scale-95 disabled:opacity-70 cursor-pointer"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Enter Academic Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Login Switcher */}
            <div className="mt-6 pt-5 border-t border-slate-700/60">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center mb-3">
                Quick One-Click Demo Personas
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('rishi.24b11ai051@aditya.ac.in')}
                  className="p-2 rounded-xl bg-slate-900/90 border border-blue-500/30 hover:border-blue-400 text-left transition-all group hover:bg-blue-950/40"
                >
                  <div className="flex items-center space-x-1.5 text-blue-400 text-xs font-bold">
                    <UserCheck className="w-3.5 h-3.5 text-orange-400" />
                    <span>Student</span>
                  </div>
                  <div className="text-[11px] text-white font-medium truncate mt-0.5">B. Rishi</div>
                  <div className="text-[9px] text-slate-400 truncate">24B11AI051</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('nirmala.faculty@aditya.ac.in')}
                  className="p-2 rounded-xl bg-slate-900/90 border border-slate-700/60 hover:border-purple-400 text-left transition-all group hover:bg-purple-950/40"
                >
                  <div className="flex items-center space-x-1.5 text-purple-400 text-xs font-bold">
                    <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                    <span>Faculty</span>
                  </div>
                  <div className="text-[11px] text-white font-medium truncate mt-0.5">Kumari</div>
                  <div className="text-[9px] text-slate-400 truncate">API & Micro Services</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('dean.admin@aditya.ac.in')}
                  className="p-2 rounded-xl bg-slate-900/90 border border-slate-700/60 hover:border-amber-400 text-left transition-all group hover:bg-amber-950/40"
                >
                  <div className="flex items-center space-x-1.5 text-amber-400 text-xs font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Admin</span>
                  </div>
                  <div className="text-[11px] text-white font-medium truncate mt-0.5">Dean Academics</div>
                  <div className="text-[9px] text-slate-400 truncate">Control Panel</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 text-slate-400 py-6 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-200">Aditya University</span>
            <span>•</span>
            <span>Department of Artificial Intelligence & Machine Learning</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400">Project Architect: B. Rishi Vardhan (24B11AI051)</span>
            <span>•</span>
            <span className="text-blue-400 font-medium">API & Micro Services 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
