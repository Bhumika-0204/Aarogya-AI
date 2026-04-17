import { Leaf, Heart, Phone, Mail, MapPin } from 'lucide-react';
import { useAppState } from '@/context/AppContext';

export default function AppFooter() {
  const { setCurrentView } = useAppState();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#22C55E] flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl">Aarogya <span className="text-[#22C55E]">AI</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              India's first AI-powered holistic health platform combining Allopathy, Ayurveda, and Homeopathy.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#22C55E]" /> +91-800-AAROGYA</div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#22C55E]" /> care@aarogya.ai</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#22C55E]" /> New Delhi, India</div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4">Features</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              {[
                { label: 'AI Symptom Checker', view: 'diagnosis' as const },
                { label: 'Prakriti Quiz', view: 'diagnosis' as const },
                { label: 'Triple-Path Results', view: 'results' as const },
                { label: 'Yoga & Exercise', view: 'wellness' as const },
                { label: 'Diet Chart', view: 'wellness' as const },
                { label: 'Doctor Booking', view: 'doctors' as const },
              ].map(item => (
                <li key={item.label}>
                  <button
                    onClick={() => setCurrentView(item.view)}
                    className="hover:text-[#22C55E] transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Medical Systems */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4">Medical Systems</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              {['Allopathic Medicine', 'Ayurveda', 'Homeopathy', 'Naturopathy', 'Yoga Therapy', 'Nutritional Medicine'].map(item => (
                <li key={item} className="hover:text-[#22C55E] transition-colors cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4">Legal & Support</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              {['Privacy Policy', 'Terms of Service', 'Medical Disclaimer', 'Cookie Policy', 'Help Center', 'Contact Us'].map(item => (
                <li key={item} className="hover:text-[#22C55E] transition-colors cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-800 pt-8 mb-6">
          <div className="bg-gray-800 rounded-2xl p-5">
            <p className="text-xs text-gray-400 leading-relaxed text-center">
              <strong className="text-yellow-400">⚠️ Medical Disclaimer:</strong> Aarogya AI provides informational content only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this platform.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 Aarogya AI. All rights reserved. Made with <Heart className="w-3.5 h-3.5 inline text-red-400" /> in India.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" />
              All systems operational
            </span>
            <span>AYUSH Aligned</span>
            <span>ISO 27001</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
