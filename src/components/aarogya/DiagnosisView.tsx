import { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft, Upload, SkipForward, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useAppState } from '@/context/AppContext';

type Step = 1 | 2 | 3 | 4;

const prakritQuestions = [
  {
    question: 'Your body frame is...',
    options: [
      { label: 'Thin & Light', sub: 'Vata', emoji: '🌬️', desc: 'Lean build, find it hard to gain weight', dosha: 'Vata' as const },
      { label: 'Medium & Athletic', sub: 'Pitta', emoji: '🔥', desc: 'Moderate build, well-proportioned', dosha: 'Pitta' as const },
      { label: 'Heavy & Solid', sub: 'Kapha', emoji: '🌊', desc: 'Larger frame, gains weight easily', dosha: 'Kapha' as const },
    ]
  },
  {
    question: 'Your digestion is...',
    options: [
      { label: 'Irregular', sub: 'Vata', emoji: '🌬️', desc: 'Variable appetite, bloating, gas', dosha: 'Vata' as const },
      { label: 'Strong & Intense', sub: 'Pitta', emoji: '🔥', desc: 'Sharp hunger, can\'t skip meals', dosha: 'Pitta' as const },
      { label: 'Slow & Steady', sub: 'Kapha', emoji: '🌊', desc: 'Low appetite, slow metabolism', dosha: 'Kapha' as const },
    ]
  },
  {
    question: 'Your energy pattern is...',
    options: [
      { label: 'Bursts of Energy', sub: 'Vata', emoji: '🌬️', desc: 'Enthusiastic but tires quickly', dosha: 'Vata' as const },
      { label: 'Focused & Intense', sub: 'Pitta', emoji: '🔥', desc: 'Driven, competitive, goal-oriented', dosha: 'Pitta' as const },
      { label: 'Sustained & Calm', sub: 'Kapha', emoji: '🌊', desc: 'Steady energy, loves routine', dosha: 'Kapha' as const },
    ]
  },
];

const doshaInfo = {
  Vata: { color: 'from-sky-400 to-blue-500', bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-700', desc: 'Air & Space element. Creative, quick-thinking, but prone to anxiety and irregular digestion.' },
  Pitta: { color: 'from-orange-400 to-red-500', bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', desc: 'Fire & Water element. Intelligent, focused, but prone to inflammation and irritability.' },
  Kapha: { color: 'from-green-400 to-teal-500', bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', desc: 'Earth & Water element. Calm, nurturing, but prone to weight gain and sluggishness.' },
};

const loadingMessages = [
  'Cross-referencing Allopathic databases...',
  'Scanning Ayurvedic herb index...',
  'Analyzing Homeopathic dilutions...',
  'Generating personalized recommendations...',
  'Finalizing your holistic health plan...',
];

export default function DiagnosisView() {
  const { setCurrentView, setPrakriti, selectedBodyPart, setSelectedBodyPart, symptoms, setSymptoms } = useAppState();
  const [step, setStep] = useState<Step>(1);
  const [duration, setDuration] = useState('');
  const [severity, setSeverity] = useState(5);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [conditions, setConditions] = useState<string[]>([]);
  const [prakritAnswers, setPrakritAnswers] = useState<number[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [calculatedDosha, setCalculatedDosha] = useState<'Vata' | 'Pitta' | 'Kapha' | null>(null);
  const [uploadState, setUploadState] = useState<'idle' | 'scanning' | 'done'>('idle');
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleBodyPartClick = (partId: string, label: string) => {
    setSelectedBodyPart(label);
    if (!symptoms) setSymptoms(`Pain/discomfort in ${label}`);
  };

  const handlePrakritAnswer = (doshaChoice: 'Vata' | 'Pitta' | 'Kapha') => {
    const newAnswers = [...prakritAnswers, doshaChoice === 'Vata' ? 0 : doshaChoice === 'Pitta' ? 1 : 2];
    setPrakritAnswers(newAnswers);
    if (currentQ < 2) {
      setCurrentQ(currentQ + 1);
    } else {
      const counts = { Vata: 0, Pitta: 0, Kapha: 0 };
      newAnswers.forEach(a => {
        if (a === 0) counts.Vata++;
        else if (a === 1) counts.Pitta++;
        else counts.Kapha++;
      });
      const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as 'Vata' | 'Pitta' | 'Kapha';
      setCalculatedDosha(dominant);
      setPrakriti(dominant);
    }
  };

  const handleFileUpload = () => {
    setUploadState('scanning');
    setTimeout(() => setUploadState('done'), 2500);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setLoadingMsgIdx(0);
    const interval = setInterval(() => {
      setLoadingMsgIdx(prev => {
        if (prev >= loadingMessages.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            setCurrentView('results');
          }, 600);
          return prev;
        }
        return prev + 1;
      });
    }, 700);
  };

  const toggleCondition = (c: string) => {
    setConditions(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };

  const stepLabels = ['Body Map', 'Symptoms', 'Prakriti Quiz', 'Snap & Analyze'];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-heading text-4xl font-bold text-gray-900">AI Diagnosis Engine</h1>
          <p className="text-gray-500 mt-2">Complete all steps for the most accurate holistic analysis</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-10 overflow-x-auto pb-2">
          {stepLabels.map((label, i) => {
            const s = (i + 1) as Step;
            const isActive = step === s;
            const isDone = step > s;
            return (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    isDone ? 'bg-[#22C55E] text-white' : isActive ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-200' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {isDone ? <CheckCircle className="w-5 h-5" /> : s}
                  </div>
                  <span className={`text-xs mt-1.5 font-medium whitespace-nowrap ${isActive ? 'text-[#2563EB]' : isDone ? 'text-[#22C55E]' : 'text-gray-400'}`}>{label}</span>
                </div>
                {i < 3 && <div className={`w-12 sm:w-20 h-0.5 mx-2 mb-5 transition-all ${step > s ? 'bg-[#22C55E]' : 'bg-gray-200'}`} />}
              </div>
            );
          })}
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white rounded-3xl p-10 max-w-sm w-full mx-4 text-center shadow-2xl">
              <div className="w-20 h-20 mx-auto mb-6 relative">
                <div className="w-20 h-20 rounded-full border-4 border-blue-100 border-t-[#2563EB] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl">🧬</span>
                </div>
              </div>
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">Aarogya AI is Analyzing</h3>
              <p className="text-[#2563EB] font-medium text-sm animate-pulse">{loadingMessages[loadingMsgIdx]}</p>
              <div className="mt-4 bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#2563EB] to-[#22C55E] rounded-full transition-all duration-700"
                  style={{ width: `${((loadingMsgIdx + 1) / loadingMessages.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Body Map */}
        {step === 1 && (
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">Where does it hurt?</h2>
            <p className="text-gray-500 text-sm mb-8">Click on the body part to select your area of concern</p>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* SVG Body Map */}
              <div className="flex-shrink-0 mx-auto">
                <svg width="340" height="480" viewBox="0 0 340 480" className="cursor-pointer">
                  {/* Background */}
                  <rect width="340" height="480" fill="#F8FAFC" rx="16" />

                  {/* Human silhouette */}
                  {/* Head */}
                  <ellipse cx="170" cy="58" rx="38" ry="42" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
                  {/* Neck */}
                  <rect x="158" y="96" width="24" height="22" rx="4" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
                  {/* Torso */}
                  <path d="M120 118 Q110 130 108 200 Q108 240 115 260 L225 260 Q232 240 232 200 Q230 130 220 118 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
                  {/* Left Arm */}
                  <path d="M120 118 Q100 130 88 170 Q80 200 82 240 Q90 250 100 245 Q108 200 115 160 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
                  {/* Right Arm */}
                  <path d="M220 118 Q240 130 252 170 Q260 200 258 240 Q250 250 240 245 Q232 200 225 160 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
                  {/* Left Leg */}
                  <path d="M115 260 Q110 300 108 340 Q106 380 108 430 Q118 440 130 435 Q138 385 140 340 Q142 300 145 260 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
                  {/* Right Leg */}
                  <path d="M225 260 Q230 300 232 340 Q234 380 232 430 Q222 440 210 435 Q202 385 200 340 Q198 300 195 260 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />

                  {/* Clickable Regions */}
                  {[
                    { id: 'Head', cx: 170, cy: 58, rx: 38, ry: 42, shape: 'ellipse' },
                    { id: 'Neck', cx: 170, cy: 107, rx: 18, ry: 11, shape: 'ellipse' },
                    { id: 'Chest', cx: 170, cy: 155, rx: 52, ry: 37, shape: 'ellipse' },
                    { id: 'Stomach', cx: 170, cy: 215, rx: 48, ry: 30, shape: 'ellipse' },
                    { id: 'Left Arm', cx: 95, cy: 185, rx: 22, ry: 55, shape: 'ellipse' },
                    { id: 'Right Arm', cx: 245, cy: 185, rx: 22, ry: 55, shape: 'ellipse' },
                    { id: 'Left Leg', cx: 125, cy: 350, rx: 22, ry: 80, shape: 'ellipse' },
                    { id: 'Right Leg', cx: 215, cy: 350, rx: 22, ry: 80, shape: 'ellipse' },
                    { id: 'Knees', cx: 170, cy: 390, rx: 55, ry: 18, shape: 'ellipse' },
                    { id: 'Back', cx: 170, cy: 190, rx: 52, ry: 70, shape: 'ellipse' },
                  ].map(({ id, cx, cy, rx, ry }) => (
                    <ellipse
                      key={id}
                      cx={cx} cy={cy} rx={rx} ry={ry}
                      fill={selectedBodyPart === id ? 'rgba(37,99,235,0.25)' : 'transparent'}
                      stroke={selectedBodyPart === id ? '#2563EB' : 'transparent'}
                      strokeWidth="2"
                      className="cursor-pointer hover:fill-blue-100 transition-all"
                      onClick={() => handleBodyPartClick(id, id)}
                    />
                  ))}

                  {/* Labels */}
                  {[
                    { id: 'Head', x: 170, y: 58 },
                    { id: 'Chest', x: 170, y: 155 },
                    { id: 'Stomach', x: 170, y: 215 },
                    { id: 'Left Arm', x: 95, y: 185 },
                    { id: 'Right Arm', x: 245, y: 185 },
                    { id: 'Left Leg', x: 125, y: 350 },
                    { id: 'Right Leg', x: 215, y: 350 },
                    { id: 'Back', x: 170, y: 190 },
                  ].map(({ id, x, y }) => (
                    <text key={id} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
                      className="pointer-events-none select-none"
                      fill={selectedBodyPart === id ? '#1d4ed8' : '#64748B'}
                      fontSize="10" fontWeight={selectedBodyPart === id ? '700' : '500'}
                    >{id}</text>
                  ))}
                </svg>
              </div>

              {/* Right side */}
              <div className="flex-1 space-y-5">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">Quick Select:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Head', 'Chest', 'Stomach', 'Back', 'Left Arm', 'Right Arm', 'Left Leg', 'Right Leg', 'Knees', 'Neck'].map(part => (
                      <button
                        key={part}
                        onClick={() => handleBodyPartClick(part, part)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all active:scale-95 ${
                          selectedBodyPart === part
                            ? 'bg-[#2563EB] text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-[#2563EB]'
                        }`}
                      >
                        {part}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedBodyPart && (
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-[#2563EB]" />
                      <span className="text-sm font-semibold text-[#2563EB]">Selected: {selectedBodyPart}</span>
                    </div>
                    <p className="text-xs text-blue-600">You can describe your symptoms in detail in the next step.</p>
                  </div>
                )}

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-amber-700">This is for informational purposes only. For emergencies, call 112 immediately.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 bg-[#2563EB] text-white px-6 py-3 rounded-2xl font-semibold active:scale-95 transition-all shadow-md hover:bg-blue-700"
              >
                Next: Describe Symptoms <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Symptom Details */}
        {step === 2 && (
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">Describe Your Symptoms</h2>
            <p className="text-gray-500 text-sm mb-8">The more detail you provide, the more accurate your results</p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Describe your symptoms *</label>
                <textarea
                  value={symptoms}
                  onChange={e => setSymptoms(e.target.value)}
                  placeholder="e.g., Sharp lower back pain that worsens when sitting for long periods, radiating to left leg..."
                  className="w-full border border-gray-200 rounded-2xl p-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent resize-none h-28 bg-gray-50"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Today', '2-3 Days', '1 Week', '1 Month+'].map(d => (
                      <button
                        key={d}
                        onClick={() => setDuration(d)}
                        className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all active:scale-95 ${
                          duration === d ? 'bg-[#2563EB] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-blue-50'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Severity: <span className="text-[#2563EB]">{severity}/10</span></label>
                  <input
                    type="range" min="1" max="10" value={severity}
                    onChange={e => setSeverity(Number(e.target.value))}
                    className="w-full accent-[#2563EB] mt-2"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Mild</span><span>Moderate</span><span>Severe</span>
                  </div>
                  <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${severity <= 3 ? 'bg-green-400' : severity <= 6 ? 'bg-yellow-400' : 'bg-red-400'}`}
                      style={{ width: `${severity * 10}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                  <input
                    type="number" value={age} onChange={e => setAge(e.target.value)}
                    placeholder="Your age"
                    className="w-full border border-gray-200 rounded-2xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                  <div className="flex gap-2">
                    {['Male', 'Female', 'Other'].map(g => (
                      <button
                        key={g}
                        onClick={() => setGender(g)}
                        className={`flex-1 py-3 rounded-2xl text-sm font-medium transition-all active:scale-95 ${
                          gender === g ? 'bg-[#2563EB] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-blue-50'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Existing Conditions</label>
                <div className="flex flex-wrap gap-2">
                  {['Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Thyroid', 'None'].map(c => (
                    <button
                      key={c}
                      onClick={() => toggleCondition(c)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all active:scale-95 ${
                        conditions.includes(c) ? 'bg-[#2563EB] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-blue-50'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!symptoms.trim()}
                className="flex items-center gap-2 bg-[#2563EB] text-white px-6 py-3 rounded-2xl font-semibold active:scale-95 transition-all shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next: Prakriti Quiz <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Prakriti Quiz */}
        {step === 3 && (
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🕉️</span>
              <h2 className="font-heading text-2xl font-bold text-gray-900">Prakriti Quiz</h2>
            </div>
            <p className="text-gray-500 text-sm mb-8">Discover your Ayurvedic body type for personalized recommendations</p>

            {!calculatedDosha ? (
              <>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-600">Question {currentQ + 1} of 3</span>
                    <span className="text-sm text-gray-400">{Math.round(((currentQ) / 3) * 100)}% complete</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#2563EB] to-[#22C55E] rounded-full transition-all duration-500" style={{ width: `${(currentQ / 3) * 100}%` }} />
                  </div>
                </div>

                <h3 className="font-heading text-xl font-semibold text-gray-800 mb-6">{prakritQuestions[currentQ].question}</h3>

                <div className="grid sm:grid-cols-3 gap-4">
                  {prakritQuestions[currentQ].options.map(opt => (
                    <button
                      key={opt.dosha}
                      onClick={() => handlePrakritAnswer(opt.dosha)}
                      className="group p-5 rounded-2xl border-2 border-gray-100 hover:border-[#2563EB] hover:shadow-lg transition-all active:scale-95 text-left bg-gray-50 hover:bg-blue-50"
                    >
                      <div className="text-4xl mb-3">{opt.emoji}</div>
                      <p className="font-heading font-bold text-gray-900 text-base">{opt.label}</p>
                      <p className="text-xs text-[#2563EB] font-semibold mb-1">{opt.sub} Type</p>
                      <p className="text-xs text-gray-500">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className={`${doshaInfo[calculatedDosha].bg} ${doshaInfo[calculatedDosha].border} border rounded-2xl p-8 text-center`}>
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${doshaInfo[calculatedDosha].color} flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg`}>
                  {calculatedDosha === 'Vata' ? '🌬️' : calculatedDosha === 'Pitta' ? '🔥' : '🌊'}
                </div>
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-1">Your Prakriti: <span className={doshaInfo[calculatedDosha].text}>{calculatedDosha} Dominant</span></h3>
                <p className="text-gray-600 text-sm max-w-md mx-auto mt-2">{doshaInfo[calculatedDosha].desc}</p>
                <div className="mt-4 inline-flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm">
                  <CheckCircle className="w-4 h-4 text-[#22C55E]" />
                  <span className="text-sm font-medium text-gray-700">Recommendations will be personalized for your {calculatedDosha} type</span>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <button onClick={() => setStep(2)} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              {calculatedDosha && (
                <button
                  onClick={() => setStep(4)}
                  className="flex items-center gap-2 bg-[#2563EB] text-white px-6 py-3 rounded-2xl font-semibold active:scale-95 transition-all shadow-md hover:bg-blue-700"
                >
                  Next: Snap & Analyze <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Snap & Analyze */}
        {step === 4 && (
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">📸</span>
              <h2 className="font-heading text-2xl font-bold text-gray-900">Snap & Analyze</h2>
            </div>
            <p className="text-gray-500 text-sm mb-8">Upload a photo of a rash, wound, or lab report for visual AI analysis (optional)</p>

            <input ref={fileRef} type="file" accept="image/*,.pdf" className="hidden" onChange={handleFileUpload} />

            {uploadState === 'idle' && (
              <div
                onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={e => { e.preventDefault(); setIsDragging(false); handleFileUpload(); }}
                onClick={() => fileRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                  isDragging ? 'border-[#2563EB] bg-blue-50 scale-[1.02]' : 'border-gray-300 hover:border-[#2563EB] hover:bg-blue-50'
                }`}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Upload className="w-8 h-8 text-[#2563EB]" />
                </div>
                <p className="font-semibold text-gray-700 mb-1">Drop your image here or click to upload</p>
                <p className="text-sm text-gray-400">Supports: JPG, PNG, PDF (Max 10MB)</p>
                <p className="text-xs text-gray-400 mt-2">Skin rashes • Lab reports • X-rays • Medical photos</p>
              </div>
            )}

            {uploadState === 'scanning' && (
              <div className="border-2 border-[#2563EB] rounded-2xl p-12 text-center bg-blue-50">
                <Loader2 className="w-12 h-12 text-[#2563EB] animate-spin mx-auto mb-4" />
                <p className="font-semibold text-[#2563EB]">Scanning image for patterns...</p>
                <p className="text-sm text-blue-400 mt-1">AI is analyzing visual markers</p>
              </div>
            )}

            {uploadState === 'done' && (
              <div className="border-2 border-[#22C55E] rounded-2xl p-6 bg-green-50">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#22C55E] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-800 mb-2">Visual Analysis Complete</p>
                    <div className="space-y-1.5 text-sm text-green-700">
                      <p>✓ No acute skin lesions detected</p>
                      <p>✓ Mild inflammation markers present</p>
                      <p>✓ Consistent with musculoskeletal condition</p>
                      <p className="text-xs text-green-600 mt-2 italic">*Mock analysis for demonstration purposes only</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-700">Visual AI analysis is for reference only. Always consult a qualified doctor for diagnosis.</p>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button onClick={() => setStep(3)} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <div className="flex gap-3">
                {uploadState === 'idle' && (
                  <button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 text-gray-500 border border-gray-200 px-5 py-3 rounded-2xl font-medium hover:bg-gray-50 active:scale-95 transition-all"
                  >
                    <SkipForward className="w-4 h-4" /> Skip & Analyze
                  </button>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={uploadState === 'scanning'}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#22C55E] text-white px-7 py-3 rounded-2xl font-bold active:scale-95 transition-all shadow-lg disabled:opacity-50"
                >
                  {uploadState === 'scanning' ? <Loader2 className="w-5 h-5 animate-spin" /> : '🧬'}
                  Analyze with Aarogya AI
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
