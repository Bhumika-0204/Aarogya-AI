/**
 * Aarogya AI — root entry point.
 *
 * Provider hierarchy:
 *   <AuthProvider>   ← Firebase auth state (user, authReady, logout)
 *     <AppProvider>  ← app navigation + health state
 *       <Shell />    ← renders AuthPage OR the main app
 *
 * Route protection is handled inside <Shell>:
 *   - authReady=false  → full-screen spinner (avoids flash)
 *   - user=null        → <AuthPage />
 *   - user present     → full app (Navbar + views + Footer + ChatBot)
 */

import { AnimatePresence, motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

import { AuthProvider, useAuth }    from '@/context/AuthContext';
import { AppProvider, useAppState } from '@/context/AppContext';

import AuthPage      from '@/components/aarogya/AuthPage';
import Navbar        from '@/components/aarogya/Navbar';
import HomeView      from '@/components/aarogya/HomeView';
import DiagnosisView from '@/components/aarogya/DiagnosisView';
import ResultsView   from '@/components/aarogya/ResultsView';
import WellnessView  from '@/components/aarogya/WellnessView';
import DoctorsView   from '@/components/aarogya/DoctorsView';
import ChatBot       from '@/components/aarogya/ChatBot';
import AppFooter     from '@/components/aarogya/AppFooter';

// ─── View transition variants ─────────────────────────────────────────────────

const viewVariants = {
  initial:  { opacity: 0, y: 18 },
  animate:  { opacity: 1, y: 0,  transition: { duration: 0.35, ease: 'easeOut' as const } },
  exit:     { opacity: 0, y: -12, transition: { duration: 0.2,  ease: 'easeIn'  as const } },
};

// ─── Loading spinner ──────────────────────────────────────────────────────────

function FullScreenLoader() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-10 h-10 text-[#2563EB] animate-spin" />
        <p className="text-sm text-gray-500 font-medium">Loading Aarogya AI…</p>
      </div>
    </div>
  );
}

// ─── Main app shell (needs both contexts) ────────────────────────────────────

function AppShell() {
  const { user, authReady } = useAuth();
  const { currentView }     = useAppState();

  // Wait for Firebase to resolve auth state before rendering anything
  if (!authReady) return <FullScreenLoader />;

  // Not logged in → show auth page
  if (!user) return <AuthPage />;

  // Logged in → full app
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <title>Aarogya AI – Unified Holistic Health Ecosystem</title>
      <meta
        name="description"
        content="AI-powered holistic health platform combining Allopathy, Ayurveda, and Homeopathy for personalised wellness."
      />

      <Navbar />

      <main className="pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            variants={viewVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {currentView === 'home'      && <HomeView />}
            {currentView === 'diagnosis' && <DiagnosisView />}
            {currentView === 'results'   && <ResultsView />}
            {currentView === 'wellness'  && <WellnessView />}
            {currentView === 'doctors'   && <DoctorsView />}
          </motion.div>
        </AnimatePresence>
      </main>

      <AppFooter />
      <ChatBot />
    </div>
  );
}

// ─── Public export ────────────────────────────────────────────────────────────

export default function AarogyaApp() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppShell />
      </AppProvider>
    </AuthProvider>
  );
}

// ─── Re-export types (legacy compat) ─────────────────────────────────────────
export type { View, Prakriti, AppContextValue as AppState } from '@/context/AppContext';
