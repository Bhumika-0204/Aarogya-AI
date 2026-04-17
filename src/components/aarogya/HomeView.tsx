import { ArrowRight, Brain, Leaf, Droplets, Star, ChevronRight, Shield, Zap, Users, CheckCircle } from 'lucide-react';
import { useAppState } from '@/context/AppContext';

const testimonials = [
  { name: 'Priya Verma', condition: 'Chronic Back Pain', rating: 5, quote: 'Aarogya AI gave me a complete treatment plan combining Ayurveda and physiotherapy. My pain reduced 80% in 3 weeks!', avatar: 'PV', color: 'from-purple-400 to-pink-400' },
  { name: 'Rahul Sharma', condition: 'Digestive Issues', rating: 5, quote: 'The Prakriti quiz identified I was Pitta dominant. The personalized diet chart completely transformed my gut health.', avatar: 'RS', color: 'from-blue-400 to-cyan-400' },
  { name: 'Meena Iyer', condition: 'Stress & Anxiety', rating: 5, quote: 'The yoga recommendations and Ashwagandha protocol from the AI were spot-on. I feel calmer and more energetic now.', avatar: 'MI', color: 'from-green-400 to-teal-400' },
];

const stats = [
  { value: '50,000+', label: 'Active Users', icon: Users },
  { value: '3', label: 'Medicine Systems', icon: Leaf },
  { value: '200+', label: 'Conditions Covered', icon: Shield },
  { value: '98%', label: 'Satisfaction Rate', icon: Star },
];

const howItWorks = [
  { step: '01', title: 'Describe Symptoms', desc: 'Use our interactive body map or text input to describe what you\'re experiencing.', icon: Brain, color: 'from-blue-500 to-blue-600' },
  { step: '02', title: 'AI Cross-Analysis', desc: 'Our engine cross-references Allopathic, Ayurvedic, and Homeopathic databases simultaneously.', icon: Zap, color: 'from-purple-500 to-purple-600' },
  { step: '03', title: 'Holistic Results', desc: 'Receive personalized treatment paths, diet charts, yoga routines, and specialist recommendations.', icon: CheckCircle, color: 'from-green-500 to-green-600' },
];

export default function HomeView() {
  const { setCurrentView } = useAppState();

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1e40af] via-[#2563EB] to-[#1d4ed8] min-h-[90vh] flex items-center overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#22C55E]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="text-white space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
                <span className="text-sm font-medium text-white/90">Powered by Advanced AI</span>
              </div>

              <h1 className="font-heading text-5xl lg:text-6xl font-bold leading-tight">
                Unified Health,{' '}
                <span className="relative">
                  <span className="text-[#22C55E]">Simplified</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                    <path d="M0 6 Q50 0 100 4 Q150 8 200 2" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
                  </svg>
                </span>
              </h1>

              <p className="text-lg text-white/80 leading-relaxed max-w-lg">
                The world's first AI that combines <strong className="text-white">Allopathy</strong>, <strong className="text-white">Ayurveda</strong>, and <strong className="text-white">Homeopathy</strong> to deliver personalized, holistic health recommendations — all in one place.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setCurrentView('diagnosis')}
                  className="flex items-center gap-2 bg-[#22C55E] hover:bg-green-500 text-white px-7 py-3.5 rounded-2xl font-semibold text-base active:scale-95 transition-all shadow-lg shadow-green-500/30 hover:shadow-green-500/50"
                >
                  Start AI Diagnosis <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentView('wellness')}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-7 py-3.5 rounded-2xl font-semibold text-base active:scale-95 transition-all backdrop-blur-sm"
                >
                  Explore Wellness <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3 pt-2">
                {['AYUSH Aligned', 'WHO Guidelines', 'HIPAA Safe', 'Doctor Verified'].map(badge => (
                  <span key={badge} className="flex items-center gap-1.5 text-xs text-white/70 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                    <CheckCircle className="w-3 h-3 text-[#22C55E]" /> {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Right - Hero Image + Floating Cards */}
            <div className="relative hidden lg:block">
              <div className="relative w-full h-[500px]">
                {/* Main image */}
                <div className="absolute inset-8 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                  <img
                    src="/airo-assets/images/pages/home/hero"
                    alt="AI Medical Technology"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
                </div>

                {/* Floating stat cards */}
                <div className="absolute top-4 -left-4 bg-white rounded-2xl p-3 shadow-xl animate-float border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Brain className="w-4 h-4 text-[#2563EB]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">AI Diagnoses</p>
                      <p className="text-sm font-bold text-gray-900">10,000+</p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/3 -right-6 bg-white rounded-2xl p-3 shadow-xl animate-float-delayed border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center">
                      <Leaf className="w-4 h-4 text-[#22C55E]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Medicine Systems</p>
                      <p className="text-sm font-bold text-gray-900">3 Unified</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-8 -left-6 bg-white rounded-2xl p-3 shadow-xl animate-float border border-gray-100" style={{ animationDelay: '2s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <Star className="w-4 h-4 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Accuracy Rate</p>
                      <p className="text-sm font-bold text-gray-900">98%</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 right-0 bg-white rounded-2xl p-3 shadow-xl animate-float-delayed border border-gray-100" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Droplets className="w-4 h-4 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Remedies</p>
                      <p className="text-sm font-bold text-gray-900">500+ Herbs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-y border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center group">
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-[#2563EB] transition-colors">
                    <Icon className="w-5 h-5 text-[#2563EB] group-hover:text-white transition-colors" />
                  </div>
                </div>
                <p className="font-heading text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-sm text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-[#2563EB] bg-blue-50 px-4 py-1.5 rounded-full">How It Works</span>
            <h2 className="font-heading text-4xl font-bold text-gray-900 mt-4">Three Steps to Holistic Health</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Our AI engine processes your symptoms through three ancient and modern medical systems simultaneously.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map(({ step, title, desc, icon: Icon, color }, i) => (
              <div key={step} className="relative group">
                {i < 2 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-gray-200 to-transparent z-10 -translate-x-4" />
                )}
                <div className="bg-white rounded-2xl p-8 shadow-md card-hover border border-gray-50 relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-6xl font-bold text-gray-50 font-heading select-none">{step}</div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">{title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medicine Systems */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-[#22C55E] bg-green-50 px-4 py-1.5 rounded-full">Triple Medicine System</span>
            <h2 className="font-heading text-4xl font-bold text-gray-900 mt-4">One Platform, Three Healing Traditions</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '💊', title: 'Allopathic', subtitle: 'Modern Medicine', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', points: ['Evidence-based OTC medications', 'Clinical dosage guidelines', 'Drug interaction warnings', 'Specialist referrals'] },
              { icon: '🌿', title: 'Ayurvedic', subtitle: 'Ancient Wisdom', color: 'from-green-500 to-emerald-600', bg: 'bg-green-50', border: 'border-green-100', points: ['Dosha-based personalization', 'Herbal formulations', 'Panchakarma therapies', 'Lifestyle recommendations'] },
              { icon: '💧', title: 'Homeopathic', subtitle: 'Natural Dilutions', color: 'from-purple-500 to-violet-600', bg: 'bg-purple-50', border: 'border-purple-100', points: ['Constitutional remedies', 'Potency & dosage guidance', 'Miasm analysis', 'Holistic symptom matching'] },
            ].map(({ icon, title, subtitle, color, bg, border, points }) => (
              <div key={title} className={`${bg} ${border} border rounded-2xl p-7 card-hover`}>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl mb-5 shadow-md`}>
                  {icon}
                </div>
                <h3 className="font-heading text-xl font-bold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500 mb-4">{subtitle}</p>
                <ul className="space-y-2">
                  {points.map(p => (
                    <li key={p} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-[#F8FAFC] to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-[#2563EB] bg-blue-50 px-4 py-1.5 rounded-full">Testimonials</span>
            <h2 className="font-heading text-4xl font-bold text-gray-900 mt-4">Trusted by Thousands</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ name, condition, rating, quote, avatar, color }) => (
              <div key={name} className="bg-white rounded-2xl p-7 shadow-md card-hover border border-gray-50">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-sm font-bold`}>
                    {avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{name}</p>
                    <p className="text-xs text-gray-400">{condition}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl font-bold text-white mb-4">Ready to Transform Your Health?</h2>
          <p className="text-white/80 text-lg mb-8">Get your personalized holistic health plan in under 3 minutes.</p>
          <button
            onClick={() => setCurrentView('diagnosis')}
            className="bg-[#22C55E] hover:bg-green-400 text-white px-10 py-4 rounded-2xl font-bold text-lg active:scale-95 transition-all shadow-xl shadow-green-500/30 inline-flex items-center gap-2"
          >
            Start Free Diagnosis <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
