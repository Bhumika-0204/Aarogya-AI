import { useState } from 'react';
import { Pill, Leaf, Droplets, AlertTriangle, X, ChevronRight, Shield, Clock, Info } from 'lucide-react';
import { useAppState } from '@/context/AppContext';

const doshaColors = {
  Vata: { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-700', badge: 'bg-sky-100 text-sky-700' },
  Pitta: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700' },
  Kapha: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', badge: 'bg-green-100 text-green-700' },
};

const ayurvedaByDosha = {
  Vata: {
    herbs: ['Ashwagandha 500mg', 'Mahanarayan Oil', 'Bala (Sida cordifolia)'],
    advice: 'As a Vata type, focus on warm, grounding therapies. Avoid cold and dry environments.',
    prep: 'Mix 1 tsp Ashwagandha in warm sesame milk at bedtime. Apply Mahanarayan Oil with gentle massage.',
  },
  Pitta: {
    herbs: ['Shatavari 500mg', 'Brahmi Oil', 'Guduchi (Giloy)'],
    advice: 'As a Pitta type, focus on cooling, anti-inflammatory herbs. Avoid spicy and acidic foods.',
    prep: 'Mix 1 tsp Shatavari in cool coconut milk. Apply Brahmi Oil to reduce inflammation.',
  },
  Kapha: {
    herbs: ['Trikatu (Ginger-Pepper-Pippali)', 'Guggulu 500mg', 'Shallaki tablets'],
    advice: 'As a Kapha type, focus on stimulating, warming therapies. Increase physical activity.',
    prep: 'Take Trikatu with warm honey before meals. Guggulu helps reduce joint inflammation.',
  },
};

const remedies = [
  { emoji: '🫚', name: 'Ginger-Honey Tea', ingredients: 'Fresh ginger (1 inch), raw honey (1 tsp), warm water', prep: 'Boil ginger in water for 5 mins, strain, add honey when slightly cooled', frequency: '2-3 times daily', benefit: 'Anti-inflammatory, pain relief' },
  { emoji: '🌿', name: 'Turmeric Golden Milk', ingredients: 'Turmeric (1 tsp), black pepper (pinch), warm milk (1 cup)', prep: 'Heat milk, add turmeric and pepper, stir well. Add honey to taste', frequency: 'Every night before bed', benefit: 'Reduces inflammation, improves sleep' },
  { emoji: '🧊', name: 'Ice-Heat Therapy', ingredients: 'Ice pack, heating pad or warm towel', prep: 'Apply ice for 15 mins, then heat for 15 mins. Repeat 3 times', frequency: 'Twice daily for acute pain', benefit: 'Reduces swelling, relaxes muscles' },
];

export default function ResultsView() {
  const { prakriti, setCurrentView, healthScore } = useAppState();
  const [activeTab, setActiveTab] = useState<'allopathic' | 'ayurvedic' | 'homeopathic'>('allopathic');
  const [showInteraction, setShowInteraction] = useState(true);

  const dosha = prakriti || 'Vata';
  const doshaStyle = doshaColors[dosha];
  const ayurvedaData = ayurvedaByDosha[dosha];

  const scoreColor = healthScore >= 70 ? '#22C55E' : healthScore >= 40 ? '#F59E0B' : '#EF4444';
  const scoreLabel = healthScore >= 70 ? 'Good — Keep It Up!' : healthScore >= 40 ? 'Moderate — Attention Needed' : 'Low — Immediate Action Required';
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (healthScore / 100) * circumference;

  const tabs = [
    { id: 'allopathic' as const, label: 'Allopathic', icon: Pill, color: 'text-blue-600', activeBg: 'bg-[#2563EB]' },
    { id: 'ayurvedic' as const, label: 'Ayurvedic', icon: Leaf, color: 'text-green-600', activeBg: 'bg-[#22C55E]' },
    { id: 'homeopathic' as const, label: 'Homeopathic', icon: Droplets, color: 'text-purple-600', activeBg: 'bg-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-4xl font-bold text-gray-900">Your Holistic Health Report</h1>
          <p className="text-gray-500 mt-2">AI-generated analysis based on your symptoms and Prakriti</p>
        </div>

        {/* Top Row: Health Score + Dosha */}
        <div className="grid sm:grid-cols-2 gap-5 mb-8">
          {/* Health Score */}
          <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100 flex items-center gap-6">
            <div className="relative w-28 h-28 flex-shrink-0">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#F1F5F9" strokeWidth="10" />
                <circle
                  cx="60" cy="60" r="52" fill="none"
                  stroke={scoreColor} strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 1s ease' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-heading text-2xl font-bold text-gray-900">{healthScore}</span>
                <span className="text-xs text-gray-400">/100</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1">Health Score</p>
              <p className="font-heading text-lg font-bold text-gray-900">{scoreLabel}</p>
              <p className="text-xs text-gray-500 mt-1">Complete wellness activities to improve your score</p>
              <button
                onClick={() => setCurrentView('wellness')}
                className="mt-3 flex items-center gap-1 text-xs text-[#2563EB] font-semibold hover:underline"
              >
                View Wellness Plan <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Dosha Card */}
          <div className={`${doshaStyle.bg} ${doshaStyle.border} border rounded-3xl p-6 flex items-center gap-5`}>
            <div className="text-5xl">
              {dosha === 'Vata' ? '🌬️' : dosha === 'Pitta' ? '🔥' : '🌊'}
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Your Prakriti</p>
              <p className={`font-heading text-2xl font-bold ${doshaStyle.text}`}>{dosha} Dominant</p>
              <p className="text-sm text-gray-600 mt-1">
                {dosha === 'Vata' ? 'Air & Space — Creative, quick, prone to anxiety' :
                 dosha === 'Pitta' ? 'Fire & Water — Focused, intense, prone to inflammation' :
                 'Earth & Water — Calm, steady, prone to weight gain'}
              </p>
              <span className={`inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full ${doshaStyle.badge}`}>
                Recommendations personalized for {dosha}
              </span>
            </div>
          </div>
        </div>

        {/* Drug-Herb Interaction Warning */}
        {showInteraction && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5 mb-8 relative">
            <button
              onClick={() => setShowInteraction(false)}
              className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="font-heading font-bold text-red-800 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Safety Shield — Interaction Warning
                </p>
                <p className="text-sm text-red-700 mt-1">
                  <strong>Ibuprofen + Ginger:</strong> High doses of ginger may increase bleeding risk when combined with NSAIDs like Ibuprofen. Consult your doctor before combining treatments.
                </p>
                <p className="text-sm text-red-700 mt-1">
                  <strong>Aspirin + Turmeric:</strong> Turmeric has mild blood-thinning properties. Avoid high doses if taking blood thinners.
                </p>
                <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                  <Info className="w-3 h-3" /> Always inform your doctor about all supplements and medications you are taking.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Triple Path Tabs */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden mb-8">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-100">
            {tabs.map(({ id, label, icon: Icon, activeBg }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all ${
                  activeTab === id
                    ? `${activeBg} text-white`
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{label.slice(0, 5)}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-7">
            {/* Allopathic */}
            {activeTab === 'allopathic' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Pill className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-gray-900">Modern Medicine Recommendations</h3>
                    <p className="text-sm text-gray-500">Evidence-based OTC treatments for Back Pain</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { name: 'Ibuprofen 400mg', type: 'NSAID', dosage: 'Take with food, 3x daily', duration: 'Max 5 days', icon: '💊' },
                    { name: 'Diclofenac Gel 1%', type: 'Topical NSAID', dosage: 'Apply to affected area 3-4x daily', duration: 'Up to 2 weeks', icon: '🧴' },
                    { name: 'Heat Patches', type: 'Thermotherapy', dosage: 'Apply for 8-12 hours', duration: 'As needed', icon: '🌡️' },
                  ].map(med => (
                    <div key={med.name} className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                      <div className="text-2xl mb-2">{med.icon}</div>
                      <p className="font-semibold text-gray-900 text-sm">{med.name}</p>
                      <span className="inline-block text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full mb-2">{med.type}</span>
                      <div className="space-y-1">
                        <div className="flex items-start gap-1.5">
                          <Clock className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-gray-600">{med.dosage}</p>
                        </div>
                        <p className="text-xs text-gray-500 pl-4.5">Duration: {med.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
                  <p className="font-semibold text-yellow-800 text-sm flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4" /> Safety Precautions
                  </p>
                  <ul className="space-y-1 text-xs text-yellow-700">
                    <li>• Avoid Ibuprofen if allergic to NSAIDs or have stomach ulcers</li>
                    <li>• Do not exceed 1200mg Ibuprofen per day without medical supervision</li>
                    <li>• Avoid alcohol while taking NSAIDs</li>
                    <li>• Consult doctor if pain persists beyond 7 days</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                  <p className="font-semibold text-red-800 text-sm flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4" /> See a Doctor Immediately If:
                  </p>
                  <ul className="space-y-1 text-xs text-red-700">
                    <li>• Pain radiates down both legs or causes numbness</li>
                    <li>• You experience loss of bladder/bowel control</li>
                    <li>• Pain follows a fall or injury</li>
                    <li>• Fever accompanies the back pain</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Ayurvedic */}
            {activeTab === 'ayurvedic' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-[#22C55E]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-gray-900">Ayurvedic Recommendations</h3>
                    <p className="text-sm text-gray-500">Personalized for your {dosha} Prakriti</p>
                  </div>
                </div>

                <div className={`${doshaStyle.bg} ${doshaStyle.border} border rounded-2xl p-4`}>
                  <p className={`text-sm font-semibold ${doshaStyle.text} mb-1`}>🕉️ Dosha-Specific Advice</p>
                  <p className="text-sm text-gray-700">{ayurvedaData.advice}</p>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  {ayurvedaData.herbs.map((herb, i) => (
                    <div key={herb} className="bg-green-50 border border-green-100 rounded-2xl p-4">
                      <div className="text-2xl mb-2">{['🌿', '🫙', '🌱'][i]}</div>
                      <p className="font-semibold text-gray-900 text-sm">{herb}</p>
                      <span className="inline-block text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1">Herbal Remedy</span>
                    </div>
                  ))}
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-5">
                  <p className="font-semibold text-gray-800 text-sm mb-2">📋 Preparation Method</p>
                  <p className="text-sm text-gray-600">{ayurvedaData.prep}</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
                    <p className="font-semibold text-emerald-800 text-sm mb-2">✅ Recommended Therapies</p>
                    <ul className="space-y-1 text-xs text-emerald-700">
                      <li>• Abhyanga (oil massage) with warm sesame oil</li>
                      <li>• Kati Basti (lower back oil pool treatment)</li>
                      <li>• Pinda Sweda (herbal bolus massage)</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
                    <p className="font-semibold text-red-800 text-sm mb-2">⚠️ Precautions</p>
                    <ul className="space-y-1 text-xs text-red-700">
                      <li>• Avoid Ashwagandha during pregnancy</li>
                      <li>• Consult Ayurvedic practitioner for dosage</li>
                      <li>• Do not self-medicate with high doses</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Homeopathic */}
            {activeTab === 'homeopathic' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-gray-900">Homeopathic Recommendations</h3>
                    <p className="text-sm text-gray-500">Natural dilution remedies for Back Pain</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { name: 'Rhus Tox 30C', indication: 'Stiffness worse on first movement, better with continued motion', dosage: '5 pellets under tongue, 3x daily', icon: '💧' },
                    { name: 'Arnica Montana 200C', indication: 'Bruised, sore feeling. Pain from overexertion or injury', dosage: '5 pellets, 2x daily for acute pain', icon: '🌸' },
                    { name: 'Bryonia 30C', indication: 'Pain worse with any movement, better with rest and pressure', dosage: '5 pellets, 3x daily', icon: '🌿' },
                  ].map(rem => (
                    <div key={rem.name} className="bg-purple-50 border border-purple-100 rounded-2xl p-4">
                      <div className="text-2xl mb-2">{rem.icon}</div>
                      <p className="font-semibold text-gray-900 text-sm">{rem.name}</p>
                      <p className="text-xs text-gray-500 mt-1 mb-2 italic">{rem.indication}</p>
                      <div className="flex items-start gap-1.5">
                        <Clock className="w-3 h-3 text-purple-400 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-purple-700 font-medium">{rem.dosage}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5">
                  <p className="font-semibold text-purple-800 text-sm mb-3">📋 How to Take Homeopathic Remedies</p>
                  <ul className="space-y-1.5 text-xs text-purple-700">
                    <li>• Place pellets directly under the tongue and let them dissolve</li>
                    <li>• Avoid eating or drinking 15 minutes before and after</li>
                    <li>• <strong>Avoid coffee, mint, and camphor</strong> — they antidote homeopathic remedies</li>
                    <li>• Store in a cool, dark place away from strong smells</li>
                    <li>• Do not touch pellets with hands — use the cap to dispense</li>
                  </ul>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                  <p className="font-semibold text-amber-800 text-sm flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4" /> Constitutional Remedy Note
                  </p>
                  <p className="text-xs text-amber-700">For best results, consult a qualified homeopathic practitioner for a constitutional remedy tailored to your complete symptom picture and {dosha} constitution.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Home Remedies */}
        <div className="mb-8">
          <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">👵 Grandma's Secrets</h2>
          <p className="text-gray-500 text-sm mb-5">Time-tested home remedies that complement your treatment</p>
          <div className="grid sm:grid-cols-3 gap-5">
            {remedies.map(r => (
              <div key={r.name} className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 card-hover">
                <div className="text-3xl mb-3">{r.emoji}</div>
                <h3 className="font-heading font-bold text-gray-900 mb-1">{r.name}</h3>
                <span className="inline-block text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full mb-3">{r.benefit}</span>
                <div className="space-y-2 text-xs text-gray-600">
                  <div>
                    <p className="font-semibold text-gray-700 mb-0.5">Ingredients:</p>
                    <p>{r.ingredients}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 mb-0.5">Preparation:</p>
                    <p>{r.prep}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#2563EB] font-semibold">
                    <Clock className="w-3 h-3" /> {r.frequency}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setCurrentView('wellness')}
            className="flex items-center gap-2 bg-[#22C55E] text-white px-6 py-3 rounded-2xl font-semibold active:scale-95 transition-all shadow-md hover:bg-green-500"
          >
            <Leaf className="w-5 h-5" /> View Wellness Plan
          </button>
          <button
            onClick={() => setCurrentView('doctors')}
            className="flex items-center gap-2 bg-[#2563EB] text-white px-6 py-3 rounded-2xl font-semibold active:scale-95 transition-all shadow-md hover:bg-blue-700"
          >
            <Pill className="w-5 h-5" /> Book a Specialist
          </button>
          <button
            onClick={() => setCurrentView('diagnosis')}
            className="flex items-center gap-2 border border-gray-200 text-gray-600 px-6 py-3 rounded-2xl font-semibold active:scale-95 transition-all hover:bg-gray-50"
          >
            Re-analyze Symptoms
          </button>
        </div>
      </div>
    </div>
  );
}
