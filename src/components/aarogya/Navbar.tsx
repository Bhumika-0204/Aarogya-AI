import { useState } from 'react';
import { Leaf, Menu, X, Activity, LogOut } from 'lucide-react';
import { useAppState } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { label: 'Home',      view: 'home'      as const },
  { label: 'Diagnosis', view: 'diagnosis' as const },
  { label: 'Wellness',  view: 'wellness'  as const },
  { label: 'Doctors',   view: 'doctors'   as const },
];

export default function Navbar() {
  const { currentView, setCurrentView, healthScore } = useAppState();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scoreColor = healthScore >= 70 ? '#22C55E' : healthScore >= 40 ? '#F59E0B' : '#EF4444';
  const circumference = 2 * Math.PI * 14;
  const offset = circumference - (healthScore / 100) * circumference;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#22C55E] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-gray-900">
              Aarogya <span className="text-[#2563EB]">AI</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.view}
                onClick={() => setCurrentView(link.view)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  currentView === link.view
                    ? 'bg-[#2563EB] text-white shadow-md'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-[#2563EB]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Health Pulse Badge + Logout */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white rounded-2xl px-3 py-1.5 shadow-sm border border-gray-100">
              <Activity className="w-4 h-4 text-[#2563EB]" />
              <span className="text-xs font-medium text-gray-500">Health Pulse</span>
              <div className="relative w-8 h-8">
                <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="14" fill="none"
                    stroke={scoreColor} strokeWidth="3"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-gray-700">
                  {healthScore}
                </span>
              </div>
            </div>
            <button
              onClick={() => setCurrentView('diagnosis')}
              className="bg-[#2563EB] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-md"
            >
              Check Symptoms
            </button>
            {/* User display + Logout */}
            {user && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 max-w-[100px] truncate hidden lg:block">
                  {user.displayName ?? user.email}
                </span>
                <button
                  onClick={logout}
                  title="Log out"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 border border-gray-200 transition-all active:scale-95"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 px-4 py-3 space-y-1">
          {navLinks.map(link => (
            <button
              key={link.view}
              onClick={() => { setCurrentView(link.view); setMobileOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentView === link.view
                  ? 'bg-[#2563EB] text-white'
                  : 'text-gray-600 hover:bg-blue-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="flex items-center gap-2 px-4 py-2">
            <Activity className="w-4 h-4 text-[#2563EB]" />
            <span className="text-sm text-gray-600">Health Score: <strong style={{ color: scoreColor }}>{healthScore}/100</strong></span>
          </div>
          {user && (
            <button
              onClick={() => { logout(); setMobileOpen(false); }}
              className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout ({user.displayName ?? user.email})
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
