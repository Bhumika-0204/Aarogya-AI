/**
 * AuthPage — centered Login / Signup card.
 * Handles email+password auth via Firebase.
 * Shown when no user is authenticated.
 */

import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Leaf, Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

// ─── Firebase error → human-readable message ─────────────────────────────────

function friendlyError(code: string): string {
  switch (code) {
    case 'auth/email-already-in-use':    return 'This email is already registered. Try logging in.';
    case 'auth/invalid-email':           return 'Please enter a valid email address.';
    case 'auth/weak-password':           return 'Password must be at least 6 characters.';
    case 'auth/user-not-found':          return 'No account found with this email.';
    case 'auth/wrong-password':          return 'Incorrect password. Please try again.';
    case 'auth/invalid-credential':      return 'Invalid email or password. Please try again.';
    case 'auth/too-many-requests':       return 'Too many attempts. Please wait a moment and try again.';
    default:                             return 'Something went wrong. Please try again.';
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AuthPage() {
  const [mode, setMode]           = useState<'login' | 'signup'>('login');
  const [name, setName]           = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPass, setShowPass]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [success, setSuccess]     = useState(false);
  const [error, setError]         = useState('');

  const isSignup = mode === 'signup';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignup) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        if (name.trim()) {
          await updateProfile(cred.user, { displayName: name.trim() });
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      // Show brief success state — onAuthStateChanged fires and shell re-renders
      setSuccess(true);
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? '';
      setError(friendlyError(code));
      setLoading(false);
    }
    // Note: don't setLoading(false) on success — keep spinner until shell transitions
  };

  const switchMode = () => {
    setMode(m => m === 'login' ? 'signup' : 'login');
    setError('');
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFF6FF] via-[#F0FDF4] to-[#EFF6FF] flex items-center justify-center px-4 py-12">

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Top gradient strip */}
        <div className="h-2 bg-gradient-to-r from-[#2563EB] to-[#22C55E]" />

        <div className="px-8 py-10">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#22C55E] flex items-center justify-center shadow-lg mb-3">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <h1 className="font-heading font-bold text-2xl text-gray-900">
              Aarogya <span className="text-[#2563EB]">AI</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">Unified Holistic Health Ecosystem</p>
          </div>

          {/* Mode toggle pills */}
          <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
            {(['login', 'signup'] as const).map(m => (
              <button
                key={m}
                type="button"
                onClick={() => { setMode(m); setError(''); }}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  mode === m
                    ? 'bg-white text-[#2563EB] shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {m === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name — signup only */}
            {isSignup && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Arjun Sharma"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={isSignup ? 'Min. 6 characters' : '••••••••'}
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-xl">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || success}
              className={`w-full font-semibold py-3 rounded-xl transition-all active:scale-[0.98] shadow-md flex items-center justify-center gap-2 mt-2 text-white
                ${success
                  ? 'bg-[#22C55E] cursor-default'
                  : 'bg-[#2563EB] hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed'
                }`}
            >
              {success ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  {isSignup ? 'Account created!' : 'Signed in!'}
                </>
              ) : loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {isSignup ? 'Creating account…' : 'Signing in…'}
                </>
              ) : (
                isSignup ? 'Create Account' : 'Log In'
              )}
            </button>
          </form>

          {/* Switch mode link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={switchMode}
              className="text-[#2563EB] font-semibold hover:underline"
            >
              {isSignup ? 'Log In' : 'Sign Up'}
            </button>
          </p>

        </div>
      </div>

      {/* Disclaimer */}
      <p className="absolute bottom-4 text-xs text-gray-400 text-center px-4">
        For informational purposes only. Not a substitute for professional medical advice.
      </p>
    </div>
  );
}
