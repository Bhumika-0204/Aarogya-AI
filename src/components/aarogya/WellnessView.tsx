import { useState } from 'react';
import { CheckCircle, Plus, Activity, Flame, Leaf } from 'lucide-react';
import { useAppState } from '@/context/AppContext';

const yogaPoses = [
  {
    id: 'cobra',
    name: 'Bhujangasana',
    english: 'Cobra Pose',
    duration: '30 seconds × 3 sets',
    difficulty: 'Beginner',
    diffColor: 'bg-green-100 text-green-700',
    image: '/airo-assets/images/pages/wellness/yoga-cobra',
    benefit: 'Strengthens spine, opens chest, relieves lower back pain',
    howTo: 'Lie face down. Place palms under shoulders. Inhale and lift chest off floor, keeping elbows slightly bent. Hold and breathe. Exhale to release.',
    points: 5,
  },
  {
    id: 'cat-cow',
    name: 'Marjaryasana-Bitilasana',
    english: 'Cat-Cow Stretch',
    duration: '10 rounds, slow breath',
    difficulty: 'Beginner',
    diffColor: 'bg-green-100 text-green-700',
    image: '/airo-assets/images/pages/wellness/yoga-cat-cow',
    benefit: 'Improves spinal flexibility, massages abdominal organs',
    howTo: 'Start on all fours. Inhale: drop belly, lift head (Cow). Exhale: round spine, tuck chin (Cat). Flow between both with breath.',
    points: 5,
  },
  {
    id: 'childs-pose',
    name: 'Balasana',
    english: "Child's Pose",
    duration: '1-3 minutes',
    difficulty: 'Beginner',
    diffColor: 'bg-green-100 text-green-700',
    image: '/airo-assets/images/pages/wellness/yoga-childs-pose',
    benefit: 'Releases tension in back, hips, and shoulders',
    howTo: 'Kneel and sit back on heels. Extend arms forward on floor, forehead down. Breathe deeply into your back. Rest and relax completely.',
    points: 5,
  },
  {
    id: 'pelvic-tilt',
    name: 'Setu Bandhasana',
    english: 'Bridge / Pelvic Tilt',
    duration: '15 reps × 3 sets',
    difficulty: 'Intermediate',
    diffColor: 'bg-yellow-100 text-yellow-700',
    image: '/airo-assets/images/pages/wellness/yoga-hero',
    benefit: 'Strengthens core and glutes, stabilizes lower back',
    howTo: 'Lie on back, knees bent, feet flat. Tighten core and tilt pelvis up slightly. For bridge: lift hips off floor. Hold 2 seconds, lower slowly.',
    points: 7,
  },
];

const eatFoods = [
  { name: 'Turmeric', benefit: 'Powerful anti-inflammatory (curcumin)', emoji: '🟡' },
  { name: 'Walnuts', benefit: 'Omega-3 fatty acids reduce inflammation', emoji: '🥜' },
  { name: 'Salmon / Fatty Fish', benefit: 'EPA & DHA for joint health', emoji: '🐟' },
  { name: 'Leafy Greens', benefit: 'Magnesium & Vitamin K for bone health', emoji: '🥬' },
  { name: 'Ginger', benefit: 'Natural COX-2 inhibitor, pain relief', emoji: '🫚' },
  { name: 'Berries', benefit: 'Antioxidants reduce oxidative stress', emoji: '🫐' },
];

const avoidFoods = [
  { name: 'Processed Foods', reason: 'Trans fats increase inflammation', emoji: '🍟' },
  { name: 'Refined Sugar', reason: 'Spikes inflammatory cytokines', emoji: '🍬' },
  { name: 'Alcohol', reason: 'Dehydrates muscles and discs', emoji: '🍺' },
  { name: 'Red Meat (excess)', reason: 'Saturated fats worsen inflammation', emoji: '🥩' },
  { name: 'Nightshades', reason: 'May aggravate joint pain in some', emoji: '🍅' },
  { name: 'Caffeine (excess)', reason: 'Depletes calcium, weakens bones', emoji: '☕' },
];

const doshaFoodNotes = {
  Vata: 'As a Vata type, favor warm, cooked, oily foods. Avoid raw, cold, and dry foods. Eat at regular times.',
  Pitta: 'As a Pitta type, favor cool, sweet, and bitter foods. Avoid spicy, sour, and fermented foods.',
  Kapha: 'As a Kapha type, favor light, dry, and warm foods. Avoid heavy, oily, and sweet foods.',
};

const mealOptions = [
  { name: 'Turmeric Rice Bowl', points: 3, emoji: '🍚' },
  { name: 'Salmon with Greens', points: 5, emoji: '🐟' },
  { name: 'Walnut Smoothie', points: 3, emoji: '🥤' },
  { name: 'Ginger Tea', points: 2, emoji: '🫚' },
  { name: 'Berry Oatmeal', points: 4, emoji: '🫐' },
];

export default function WellnessView() {
  const { prakriti, healthScore, setHealthScore, completedExercises, setCompletedExercises, activityLog, addActivity } = useAppState();
  const [expandedPose, setExpandedPose] = useState<string | null>(null);
  const [showMealModal, setShowMealModal] = useState(false);

  const dosha = prakriti || 'Vata';
  const scoreColor = healthScore >= 70 ? '#22C55E' : healthScore >= 40 ? '#F59E0B' : '#EF4444';

  const completeExercise = (pose: typeof yogaPoses[0]) => {
    if (completedExercises.includes(pose.id)) return;
    setCompletedExercises([...completedExercises, pose.id]);
    setHealthScore(Math.min(100, healthScore + pose.points));
    addActivity(`✅ Completed ${pose.english} +${pose.points}pts`);
  };

  const logMeal = (meal: typeof mealOptions[0]) => {
    setHealthScore(Math.min(100, healthScore + meal.points));
    addActivity(`🍽️ Logged ${meal.name} +${meal.points}pts`);
    setShowMealModal(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-heading text-4xl font-bold text-gray-900">Your Wellness Plan</h1>
          <p className="text-gray-500 mt-2">Personalized yoga, diet, and lifestyle recommendations</p>
        </div>

        {/* Health Pulse Tracker */}
        <div className="bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] rounded-3xl p-6 mb-10 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-white/70 text-sm font-medium">Health Pulse Score</p>
                <p className="font-heading text-4xl font-bold">{healthScore}<span className="text-xl text-white/60">/100</span></p>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="flex justify-between text-xs text-white/70 mb-1.5">
                <span>Progress</span>
                <span style={{ color: scoreColor === '#22C55E' ? '#86efac' : scoreColor === '#F59E0B' ? '#fcd34d' : '#fca5a5' }}>
                  {healthScore >= 70 ? 'Excellent' : healthScore >= 40 ? 'Moderate' : 'Needs Work'}
                </span>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${healthScore}%`, background: 'linear-gradient(90deg, #22C55E, #86efac)' }}
                />
              </div>
              <p className="text-xs text-white/60 mt-1.5">Complete exercises and log meals to increase your score</p>
            </div>

            <button
              onClick={() => setShowMealModal(true)}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 border border-white/30 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" /> Log a Meal
            </button>
          </div>

          {/* Activity Log */}
          {activityLog.length > 0 && (
            <div className="mt-5 pt-4 border-t border-white/20">
              <p className="text-xs text-white/60 font-semibold mb-2 uppercase tracking-wide">Recent Activity</p>
              <div className="flex flex-wrap gap-2">
                {activityLog.slice(0, 5).map((log, i) => (
                  <span key={i} className="text-xs bg-white/15 text-white/90 px-3 py-1 rounded-full">{log}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Yoga Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-lg">🧘</span>
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900">Corrective Yoga & Exercise</h2>
              <p className="text-sm text-gray-500">Recommended poses for Back Pain relief</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {yogaPoses.map(pose => {
              const isDone = completedExercises.includes(pose.id);
              const isExpanded = expandedPose === pose.id;
              return (
                <div key={pose.id} className={`bg-white rounded-2xl shadow-md border overflow-hidden card-hover transition-all ${isDone ? 'border-green-200' : 'border-gray-100'}`}>
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img src={pose.image} alt={pose.english} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    {isDone && (
                      <div className="absolute inset-0 bg-green-500/40 flex items-center justify-center">
                        <CheckCircle className="w-12 h-12 text-white" />
                      </div>
                    )}
                    <div className="absolute bottom-2 left-3 right-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${pose.diffColor}`}>{pose.difficulty}</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-heading font-bold text-gray-900 text-sm">{pose.english}</h3>
                    <p className="text-xs text-gray-400 italic mb-2">{pose.name}</p>
                    <p className="text-xs text-[#2563EB] font-semibold mb-2">⏱ {pose.duration}</p>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{pose.benefit}</p>

                    <button
                      onClick={() => setExpandedPose(isExpanded ? null : pose.id)}
                      className="text-xs text-[#2563EB] font-semibold hover:underline mb-3 block"
                    >
                      {isExpanded ? '▲ Hide instructions' : '▼ How to do it'}
                    </button>

                    {isExpanded && (
                      <div className="bg-blue-50 rounded-xl p-3 mb-3">
                        <p className="text-xs text-gray-600 leading-relaxed">{pose.howTo}</p>
                      </div>
                    )}

                    <button
                      onClick={() => completeExercise(pose)}
                      disabled={isDone}
                      className={`w-full py-2 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                        isDone
                          ? 'bg-green-100 text-green-700 cursor-default'
                          : 'bg-[#22C55E] text-white hover:bg-green-500 shadow-sm'
                      }`}
                    >
                      {isDone ? `✓ Completed (+${pose.points}pts)` : `Mark Complete (+${pose.points}pts)`}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Diet Chart */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-[#22C55E]" />
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900">Personalized Diet Chart</h2>
              <p className="text-sm text-gray-500">Anti-inflammatory diet for Back Pain</p>
            </div>
          </div>

          {/* Dosha note */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5 flex items-start gap-3">
            <span className="text-xl">{dosha === 'Vata' ? '🌬️' : dosha === 'Pitta' ? '🔥' : '🌊'}</span>
            <p className="text-sm text-amber-800"><strong>{dosha} Tip:</strong> {doshaFoodNotes[dosha]}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Foods to Eat */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="bg-green-500 px-5 py-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-white" />
                <h3 className="font-heading font-bold text-white">Foods to Eat ✅</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {eatFoods.map(food => (
                  <div key={food.name} className="flex items-center gap-3 px-5 py-3 hover:bg-green-50 transition-colors">
                    <span className="text-xl">{food.emoji}</span>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{food.name}</p>
                      <p className="text-xs text-gray-500">{food.benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Foods to Avoid */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="bg-red-500 px-5 py-3 flex items-center gap-2">
                <Flame className="w-5 h-5 text-white" />
                <h3 className="font-heading font-bold text-white">Foods to Avoid ❌</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {avoidFoods.map(food => (
                  <div key={food.name} className="flex items-center gap-3 px-5 py-3 hover:bg-red-50 transition-colors">
                    <span className="text-xl">{food.emoji}</span>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{food.name}</p>
                      <p className="text-xs text-gray-500">{food.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ayurveda Image */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden mb-8">
          <div className="grid md:grid-cols-2">
            <div className="h-56 md:h-auto overflow-hidden">
              <img src="/airo-assets/images/pages/wellness/ayurveda-herbs" alt="Ayurvedic herbs" className="w-full h-full object-cover" />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span className="text-sm font-semibold text-[#22C55E] bg-green-50 px-3 py-1 rounded-full w-fit mb-3">Ayurvedic Lifestyle</span>
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3">Daily Dinacharya Routine</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {['Wake up before sunrise (Brahma Muhurta)', 'Oil pulling with sesame oil (10 mins)', 'Warm water with lemon on empty stomach', 'Abhyanga (self-massage) before shower', 'Meditation and pranayama (15 mins)', 'Light dinner before 7 PM'].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Meal Log Modal */}
      {showMealModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm w-full">
            <h3 className="font-heading text-xl font-bold text-gray-900 mb-4">Log a Healthy Meal</h3>
            <p className="text-sm text-gray-500 mb-4">Select a meal to add to your health log</p>
            <div className="space-y-2">
              {mealOptions.map(meal => (
                <button
                  key={meal.name}
                  onClick={() => logMeal(meal)}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-[#22C55E] hover:bg-green-50 transition-all active:scale-95"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{meal.emoji}</span>
                    <span className="font-medium text-gray-800 text-sm">{meal.name}</span>
                  </div>
                  <span className="text-xs font-bold text-[#22C55E] bg-green-100 px-2 py-0.5 rounded-full">+{meal.points}pts</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowMealModal(false)}
              className="w-full mt-4 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
