import { useState } from 'react';
import { Star, Clock, Phone, MapPin, X, CheckCircle, AlertTriangle, Navigation } from 'lucide-react';
import { useAppState } from '@/context/AppContext';

const doctors = [
  { id: 1, name: 'Dr. Priya Sharma', specialty: 'Orthopedic Surgeon', available: true, rating: 4.9, reviews: 312, experience: '14 yrs', fee: '₹800', image: '/airo-assets/images/doctors/priya-sharma', languages: ['English', 'Hindi'], hospital: 'Apollo Hospital' },
  { id: 2, name: 'Dr. Rajesh Mehta', specialty: 'Ayurvedic Practitioner', available: true, rating: 4.8, reviews: 256, experience: '18 yrs', fee: '₹600', image: '/airo-assets/images/doctors/rajesh-mehta', languages: ['Hindi', 'Gujarati'], hospital: 'Ayush Wellness Center' },
  { id: 3, name: 'Dr. Anita Patel', specialty: 'Homeopathic Doctor', available: false, rating: 4.7, reviews: 189, experience: '12 yrs', fee: '₹500', image: '/airo-assets/images/doctors/anita-patel', languages: ['English', 'Gujarati'], hospital: 'Homeo Care Clinic' },
  { id: 4, name: 'Dr. Vikram Singh', specialty: 'General Physician', available: true, rating: 4.8, reviews: 445, experience: '20 yrs', fee: '₹700', image: '/airo-assets/images/doctors/vikram-singh', languages: ['Hindi', 'English'], hospital: 'Fortis Hospital' },
  { id: 5, name: 'Dr. Sunita Rao', specialty: 'Nutritionist & Dietitian', available: true, rating: 4.9, reviews: 278, experience: '10 yrs', fee: '₹550', image: '/airo-assets/images/doctors/sunita-rao', languages: ['English', 'Telugu'], hospital: 'NutriCare Wellness' },
  { id: 6, name: 'Dr. Arjun Nair', specialty: 'Physiotherapist', available: false, rating: 4.7, reviews: 203, experience: '9 yrs', fee: '₹650', image: '/airo-assets/images/doctors/arjun-nair', languages: ['English', 'Malayalam'], hospital: 'PhysioFit Center' },
];

const hospitals = [
  { name: 'Apollo Hospital', distance: '1.2 km', phone: '+91-11-2692-5858', beds: 'Emergency Available', color: 'bg-red-500' },
  { name: 'Fortis Healthcare', distance: '2.8 km', phone: '+91-11-4277-6222', beds: 'ICU Available', color: 'bg-blue-500' },
  { name: 'AIIMS Delhi', distance: '4.1 km', phone: '+91-11-2658-8500', beds: 'Trauma Center', color: 'bg-green-500' },
];

const timeSlots = ['9:00 AM', '10:00 AM', '11:30 AM', '2:00 PM', '3:30 PM', '5:00 PM'];

export default function DoctorsView() {
  useAppState(); // available for future use
  const [bookingDoctor, setBookingDoctor] = useState<typeof doctors[0] | null>(null);
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingDone, setBookingDone] = useState(false);
  const [showSOS, setShowSOS] = useState(false);

  const handleBook = () => {
    if (!bookingName || !bookingPhone || !bookingDate || !bookingTime) return;
    setBookingDone(true);
  };

  const closeModal = () => {
    setBookingDoctor(null);
    setBookingDone(false);
    setBookingName('');
    setBookingPhone('');
    setBookingDate('');
    setBookingTime('');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-heading text-4xl font-bold text-gray-900">AI-Recommended Specialists</h1>
          <p className="text-gray-500 mt-2">Doctors selected based on your symptoms and location</p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {['All Specialists', 'Available Today', 'Allopathic', 'Ayurvedic', 'Homeopathic'].map(f => (
            <button
              key={f}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all active:scale-95 ${
                f === 'All Specialists' ? 'bg-[#2563EB] text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-[#2563EB] hover:text-[#2563EB]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {doctors.map(doc => (
            <div key={doc.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden card-hover">
              {/* Top */}
              <div className="relative p-5 pb-0">
                <div className="flex items-start gap-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-100"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${doc.available ? 'bg-[#22C55E]' : 'bg-gray-300'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold text-gray-900 text-base truncate">{doc.name}</h3>
                    <p className="text-sm text-[#2563EB] font-medium">{doc.specialty}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{doc.hospital}</p>
                  </div>
                </div>

                <div className="mt-3">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${
                    doc.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${doc.available ? 'bg-green-500' : 'bg-gray-400'}`} />
                    {doc.available ? 'Available Today' : 'Next: Tomorrow'}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="px-5 py-4">
                <div className="grid grid-cols-3 gap-2 text-center mb-4">
                  <div className="bg-gray-50 rounded-xl py-2">
                    <div className="flex items-center justify-center gap-0.5">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-gray-900">{doc.rating}</span>
                    </div>
                    <p className="text-xs text-gray-400">{doc.reviews} reviews</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl py-2">
                    <p className="text-sm font-bold text-gray-900">{doc.experience}</p>
                    <p className="text-xs text-gray-400">Experience</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl py-2">
                    <p className="text-sm font-bold text-[#2563EB]">{doc.fee}</p>
                    <p className="text-xs text-gray-400">Consult</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {doc.languages.map(lang => (
                    <span key={lang} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{lang}</span>
                  ))}
                </div>

                <button
                  onClick={() => setBookingDoctor(doc)}
                  className="w-full bg-[#2563EB] hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-bold active:scale-95 transition-all shadow-sm"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency SOS */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-8 text-white">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl animate-pulse">
                🚨
              </div>
              <div>
                <h2 className="font-heading text-2xl font-bold">Emergency? Find Nearest Hospital</h2>
                <p className="text-red-200 text-sm mt-1">Get immediate help — hospitals near you</p>
              </div>
            </div>
            <div className="flex gap-3 ml-auto">
              <button
                onClick={() => alert('📍 Location shared with emergency services. Help is on the way!')}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 border border-white/30 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95"
              >
                <Navigation className="w-4 h-4" /> Share Location
              </button>
              <button
                onClick={() => setShowSOS(!showSOS)}
                className="flex items-center gap-2 bg-white text-red-600 px-5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 hover:bg-red-50"
              >
                <MapPin className="w-4 h-4" /> Find Hospitals
              </button>
            </div>
          </div>

          {showSOS && (
            <div className="mt-6">
              {/* Mock Map */}
              <div className="bg-gray-200 rounded-2xl h-36 mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-200" />
                {/* Grid lines */}
                {[20, 40, 60, 80].map(p => (
                  <div key={p} className="absolute top-0 bottom-0 border-l border-gray-300/50" style={{ left: `${p}%` }} />
                ))}
                {[33, 66].map(p => (
                  <div key={p} className="absolute left-0 right-0 border-t border-gray-300/50" style={{ top: `${p}%` }} />
                ))}
                {/* Location pins */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
                </div>
                {[{ x: '30%', y: '25%', c: 'bg-red-500' }, { x: '65%', y: '60%', c: 'bg-red-500' }, { x: '75%', y: '30%', c: 'bg-red-500' }].map((pin, i) => (
                  <div key={i} className="absolute" style={{ left: pin.x, top: pin.y }}>
                    <div className={`w-3 h-3 ${pin.c} rounded-full border-2 border-white shadow-md`} />
                  </div>
                ))}
                <div className="absolute bottom-2 left-3 text-xs text-gray-500 bg-white/80 px-2 py-0.5 rounded-full">📍 Your Location</div>
              </div>

              {/* Hospital Cards */}
              <div className="grid sm:grid-cols-3 gap-3">
                {hospitals.map(h => (
                  <div key={h.name} className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full ${h.color}`} />
                      <p className="font-bold text-white text-sm">{h.name}</p>
                    </div>
                    <div className="space-y-1 text-xs text-red-100">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" /> {h.distance} away
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" /> {h.beds}
                      </div>
                    </div>
                    <a
                      href={`tel:${h.phone}`}
                      className="mt-3 flex items-center gap-1.5 bg-white text-red-600 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-red-50 transition-all active:scale-95 w-full justify-center"
                    >
                      <Phone className="w-3 h-3" /> Call Now
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center">
                <p className="text-red-200 text-xs">For life-threatening emergencies, call <strong className="text-white">112</strong> immediately</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {bookingDoctor && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <img src={bookingDoctor.image} alt={bookingDoctor.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h3 className="font-heading font-bold text-gray-900">{bookingDoctor.name}</h3>
                    <p className="text-sm text-[#2563EB]">{bookingDoctor.specialty}</p>
                  </div>
                </div>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-1 rounded-xl hover:bg-gray-100 transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!bookingDone ? (
                <>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name *</label>
                      <input
                        type="text" value={bookingName} onChange={e => setBookingName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                      <input
                        type="tel" value={bookingPhone} onChange={e => setBookingPhone(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred Date *</label>
                      <input
                        type="date" value={bookingDate} onChange={e => setBookingDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Select Time Slot *</label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map(slot => (
                          <button
                            key={slot}
                            onClick={() => setBookingTime(slot)}
                            className={`py-2 rounded-xl text-xs font-semibold transition-all active:scale-95 ${
                              bookingTime === slot ? 'bg-[#2563EB] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-blue-50'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-center justify-between">
                      <span className="text-sm text-gray-600">Consultation Fee</span>
                      <span className="font-bold text-[#2563EB]">{bookingDoctor.fee}</span>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-amber-700">This is a demo booking. No actual appointment will be created.</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleBook}
                    disabled={!bookingName || !bookingPhone || !bookingDate || !bookingTime}
                    className="w-full mt-5 bg-[#2563EB] text-white py-3.5 rounded-2xl font-bold text-sm active:scale-95 transition-all shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm Appointment
                  </button>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-[#22C55E]" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Your appointment with <strong>{bookingDoctor.name}</strong> is scheduled for{' '}
                    <strong>{bookingDate}</strong> at <strong>{bookingTime}</strong>
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 text-left space-y-2 mb-5">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Patient</span>
                      <span className="font-semibold text-gray-900">{bookingName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Phone</span>
                      <span className="font-semibold text-gray-900">{bookingPhone}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Hospital</span>
                      <span className="font-semibold text-gray-900">{bookingDoctor.hospital}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Fee</span>
                      <span className="font-semibold text-[#2563EB]">{bookingDoctor.fee}</span>
                    </div>
                  </div>
                  <button onClick={closeModal} className="w-full bg-[#22C55E] text-white py-3 rounded-2xl font-bold text-sm active:scale-95 transition-all">
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
