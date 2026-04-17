/**
 * AppContext — single source of truth for all Aarogya AI global state.
 *
 * Usage:
 *   const { currentView, setCurrentView, healthScore, ... } = useAppState();
 *
 * No prop-drilling required. Wrap the app once with <AppProvider>.
 */

import { createContext, useContext, useState, useEffect, useRef, useCallback, type ReactNode } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type View = 'home' | 'diagnosis' | 'results' | 'wellness' | 'doctors';
export type Prakriti = 'Vata' | 'Pitta' | 'Kapha' | null;

export interface AppContextValue {
  // Navigation
  currentView: View;
  setCurrentView: (v: View) => void;

  // Health metrics
  healthScore: number;
  setHealthScore: (n: number) => void;

  // Ayurvedic body type
  prakriti: Prakriti;
  setPrakriti: (p: Prakriti) => void;

  // Wellness tracking
  completedExercises: string[];
  setCompletedExercises: (e: string[]) => void;
  activityLog: string[];
  addActivity: (msg: string) => void;

  // Diagnosis inputs
  selectedBodyPart: string;
  setSelectedBodyPart: (s: string) => void;
  symptoms: string;
  setSymptoms: (s: string) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AppContext = createContext<AppContextValue | null>(null);

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAppState(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppState must be used inside <AppProvider>');
  }
  return ctx;
}

// ─── Hash ↔ View helpers ──────────────────────────────────────────────────────

const VIEW_TO_HASH: Record<View, string> = {
  home:      '',
  diagnosis: 'diagnosis',
  results:   'results',
  wellness:  'wellness',
  doctors:   'doctors',
};

const HASH_TO_VIEW: Record<string, View> = {
  '':          'home',
  'home':      'home',
  'diagnosis': 'diagnosis',
  'results':   'results',
  'wellness':  'wellness',
  'doctors':   'doctors',
};

function hashToView(hash: string): View {
  const key = hash.replace('#', '').toLowerCase();
  return HASH_TO_VIEW[key] ?? 'home';
}

// ─── Provider ─────────────────────────────────────────────────────────────────

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  // Initialise view from URL hash so deep-links / back-button work on load
  const [currentView, _setCurrentView] = useState<View>(() =>
    hashToView(window.location.hash)
  );
  const [healthScore, setHealthScore] = useState(65);
  const [prakriti, setPrakriti] = useState<Prakriti>(null);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [activityLog, setActivityLog] = useState<string[]>([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [symptoms, setSymptoms] = useState('');

  // Track whether the hash change came from us (to avoid double-firing)
  const internalNavRef = useRef(false);

  // Wrapped setter: updates state + URL hash atomically
  const setCurrentView = useCallback((v: View) => {
    internalNavRef.current = true;
    _setCurrentView(v);
    const hash = VIEW_TO_HASH[v];
    window.history.pushState(null, '', hash ? `#${hash}` : window.location.pathname);
    // Scroll to top on every view change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Listen for browser back / forward
  useEffect(() => {
    const onPopState = () => {
      if (internalNavRef.current) {
        internalNavRef.current = false;
        return;
      }
      _setCurrentView(hashToView(window.location.hash));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const addActivity = useCallback((msg: string) => {
    setActivityLog(prev => [msg, ...prev].slice(0, 10));
  }, []);

  const value: AppContextValue = {
    currentView, setCurrentView,
    healthScore, setHealthScore,
    prakriti, setPrakriti,
    completedExercises, setCompletedExercises,
    activityLog, addActivity,
    selectedBodyPart, setSelectedBodyPart,
    symptoms, setSymptoms,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
