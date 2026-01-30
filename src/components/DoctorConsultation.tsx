import React, { useState } from 'react';
import {
  Stethoscope,
  Calendar,
  Clock,
  Star,
  MapPin,
  Phone,
  Video,
  MessageCircle,
  User,
  Award,
  CheckCircle
} from 'lucide-react';
import Navigation from './Navigation';
import { User as UserType } from '../types/User';

interface DoctorConsultationProps {
  user: UserType;
  onLogout: () => void;
}

const DoctorConsultation = ({ user, onLogout }: DoctorConsultationProps) => {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const doctors = [
    {
      id: 1,
      name: "Dr. Anjali Sharma",
      specialty: "Clinical Psychology",
      experience: "12 years",
      rating: 4.9,
      reviews: 234,
      location: "University Health Center",
      languages: ["English", "Hindi", "Marathi"],
      availability: "Available Today",
      consultationFee: 800,
      image: "👩‍⚕️",
      specialties: ["Anxiety Disorders", "Depression", "Student Counseling", "PTSD"],
      about: "Dr. Sharma specializes in helping college students navigate academic stress, social anxiety, and major life transitions. She uses evidence-based therapies including CBT and mindfulness techniques.",
      nextAvailable: ["2:00 PM", "3:30 PM", "5:00 PM"],
      consultationType: ["Video Call", "Phone Call", "In-Person"]
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      specialty: "Psychiatry",
      experience: "8 years",
      rating: 4.8,
      reviews: 189,
      location: "Campus Mental Health Clinic",
      languages: ["English", "Hindi", "Bengali"],
      availability: "Available Tomorrow",
      consultationFee: 1200,
      image: "👨‍⚕️",
      specialties: ["Mood Disorders", "Anxiety", "ADHD", "Medication Management"],
      about: "Dr. Kumar focuses on comprehensive mental health care for students, combining therapy with medication management when needed. He has extensive experience with anxiety and mood disorders.",
      nextAvailable: ["10:00 AM", "2:00 PM", "4:00 PM"],
      consultationType: ["Video Call", "In-Person"]
    },
    {
      id: 3,
      name: "Dr. Priya Patel",
      specialty: "Counseling Psychology",
      experience: "15 years",
      rating: 4.9,
      reviews: 312,
      location: "Student Wellness Center",
      languages: ["English", "Hindi", "Gujarati"],
      availability: "Available Today",
      consultationFee: 1000,
      image: "👩‍⚕️",
      specialties: ["Stress Management", "Academic Pressure", "Self-Esteem", "Relationship Issues"],
      about: "Dr. Patel has dedicated her career to student mental health. She provides a safe, supportive environment for students to explore their challenges and develop coping strategies.",
      nextAvailable: ["1:00 PM", "3:00 PM", "6:00 PM"],
      consultationType: ["Video Call", "Phone Call", "In-Person"]
    },
    {
      id: 4,
      name: "Dr. Vikram Singhania",
      specialty: "Behavioral Therapy",
      experience: "10 years",
      rating: 4.7,
      reviews: 156,
      location: "Downtown Mental Health Center",
      languages: ["English", "Hindi", "Punjabi"],
      availability: "Available This Week",
      consultationFee: 1500,
      image: "👨‍⚕️",
      specialties: ["CBT", "Behavioral Issues", "Sleep Disorders", "Habit Formation"],
      about: "Dr. Singhania specializes in cognitive behavioral therapy and helps students develop healthy behavioral patterns. He's particularly effective with sleep issues and habit-related challenges.",
      nextAvailable: ["9:00 AM", "11:00 AM", "3:00 PM"],
      consultationType: ["Video Call", "In-Person"]
    }
  ];

  const handleBooking = () => {
    setShowBooking(false);
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedDoctor(null);
    }, 3000);
  };

  if (bookingSuccess) {
    return (
      <div className="flex">
        <Navigation user={user} onLogout={onLogout} />
        <main className="flex-1 ml-64 p-8">
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center bg-white rounded-xl shadow-lg p-8 max-w-md">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointment Booked!</h2>
              <p className="text-gray-600 mb-6">
                Your consultation with {selectedDoctor?.name} has been scheduled.
                You'll receive a confirmation email with meeting details shortly.
              </p>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Next Steps:</strong> Check your email for the video call link or location details.
                  If you need to reschedule, please call at least 24 hours in advance.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (selectedDoctor && showBooking) {
    return (
      <div className="flex">
        <Navigation user={user} onLogout={onLogout} />
        <main className="flex-1 ml-64 p-8">
          <button
            onClick={() => setShowBooking(false)}
            className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Doctor Profile
          </button>

          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Book Consultation</h1>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <span className="text-4xl mr-4">{selectedDoctor.image}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedDoctor.name}</h3>
                  <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
                </div>
              </div>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Consultation Type
                </label>
                <div className="space-y-2">
                  {selectedDoctor.consultationType.map((type: string, index: number) => (
                    <label key={index} className="flex items-center">
                      <input
                        type="radio"
                        name="consultationType"
                        value={type}
                        className="mr-3"
                        defaultChecked={index === 0}
                      />
                      <div className="flex items-center">
                        {type === 'Video Call' && <Video className="h-4 w-4 mr-2 text-blue-600" />}
                        {type === 'Phone Call' && <Phone className="h-4 w-4 mr-2 text-green-600" />}
                        {type === 'In-Person' && <User className="h-4 w-4 mr-2 text-purple-600" />}
                        <span>{type}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Times Today
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {selectedDoctor.nextAvailable.map((time: string, index: number) => (
                    <label key={index} className="flex items-center">
                      <input
                        type="radio"
                        name="appointmentTime"
                        value={time}
                        className="sr-only"
                        defaultChecked={index === 0}
                      />
                      <div className="w-full text-center py-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors">
                        {time}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Consultation (Optional)
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Briefly describe what you'd like to discuss..."
                ></textarea>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Consultation Fee:</span>
                  <span className="text-2xl font-bold text-green-600">₹{selectedDoctor.consultationFee}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Payment will be processed after your consultation. Most insurance plans accepted.
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowBooking(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleBooking}
                  className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    );
  }

  if (selectedDoctor) {
    return (
      <div className="flex">
        <Navigation user={user} onLogout={onLogout} />
        <main className="flex-1 ml-64 p-8">
          <button
            onClick={() => setSelectedDoctor(null)}
            className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Doctor List
          </button>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="text-6xl mr-6">{selectedDoctor.image}</div>
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{selectedDoctor.name}</h1>
                      <p className="text-xl opacity-90 mb-2">{selectedDoctor.specialty}</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-300 mr-1" />
                          <span className="font-medium">{selectedDoctor.rating}</span>
                          <span className="opacity-90 ml-1">({selectedDoctor.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="h-5 w-5 mr-1" />
                          <span>{selectedDoctor.experience} experience</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-white bg-opacity-20 rounded-lg p-3 mb-3">
                      <p className="text-sm opacity-90">Consultation Fee</p>
                      <p className="text-2xl font-bold">₹{selectedDoctor.consultationFee}</p>
                    </div>
                    <div className="text-sm opacity-90">{selectedDoctor.availability}</div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="mb-8">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">About Dr. {selectedDoctor.name.split(' ')[1]}</h2>
                      <p className="text-gray-700 leading-relaxed">{selectedDoctor.about}</p>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Specializations</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedDoctor.specialties.map((specialty: string, index: number) => (
                          <div key={index} className="flex items-center bg-blue-50 rounded-lg p-3">
                            <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                            <span className="text-gray-800">{specialty}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Consultation Options</h3>
                      <div className="space-y-3">
                        {selectedDoctor.consultationType.map((type: string, index: number) => (
                          <div key={index} className="flex items-center bg-gray-50 rounded-lg p-4">
                            {type === 'Video Call' && <Video className="h-6 w-6 text-blue-600 mr-4" />}
                            {type === 'Phone Call' && <Phone className="h-6 w-6 text-green-600 mr-4" />}
                            {type === 'In-Person' && <User className="h-6 w-6 text-purple-600 mr-4" />}
                            <div>
                              <p className="font-medium text-gray-900">{type}</p>
                              <p className="text-sm text-gray-600">
                                {type === 'Video Call' && 'Secure, HIPAA-compliant video sessions'}
                                {type === 'Phone Call' && 'Traditional phone consultation'}
                                {type === 'In-Person' && `Meet at ${selectedDoctor.location}`}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="bg-gray-50 rounded-xl p-6 mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="text-gray-700">{selectedDoctor.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="text-gray-700">{selectedDoctor.availability}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-2">Languages:</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedDoctor.languages.map((lang: string, index: number) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                                {lang}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-6 mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Available Times</h3>
                      <div className="space-y-2">
                        {selectedDoctor.nextAvailable.map((time: string, index: number) => (
                          <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3">
                            <span className="font-medium text-gray-900">{time}</span>
                            <span className="text-sm text-green-600">Available</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setShowBooking(true)}
                      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      Book Consultation
                    </button>

                    <button className="w-full mt-3 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex">
      <Navigation user={user} onLogout={onLogout} />

      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mental Health Professionals</h1>
          <p className="text-gray-600">Connect with licensed therapists and counselors specializing in student mental health</p>
        </div>

        {/* Emergency Banner */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
          <div className="flex items-start">
            <div className="bg-red-100 p-2 rounded-lg mr-4">
              <Phone className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">Crisis Support Available 24/7</h3>
              <p className="text-red-700 mb-3">If you're experiencing a mental health emergency, please reach out immediately:</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="bg-red-100 px-3 py-1 rounded-full">
                  <strong>Suicide Prevention:</strong> 988
                </div>
                <div className="bg-red-100 px-3 py-1 rounded-full">
                  <strong>Crisis Text:</strong> Text HOME to 741741
                </div>
                <div className="bg-red-100 px-3 py-1 rounded-full">
                  <strong>Campus Security:</strong> Call your university's emergency line
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer"
              onClick={() => setSelectedDoctor(doctor)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="text-4xl mr-4">{doctor.image}</div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{doctor.name}</h3>
                      <p className="text-sm text-gray-600">{doctor.specialty}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-yellow-600 mb-1">
                      <Star className="h-4 w-4 mr-1 fill-current" />
                      <span className="font-medium">{doctor.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500">({doctor.reviews} reviews)</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{doctor.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{doctor.availability}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Specializes in:</p>
                  <div className="flex flex-wrap gap-1">
                    {doctor.specialties.slice(0, 2).map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                    {doctor.specialties.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        +{doctor.specialties.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-lg font-bold text-green-600">
                    ₹{doctor.consultationFee}
                  </div>
                  <div className="flex space-x-1">
                    {doctor.consultationType.includes('Video Call') && (
                      <div className="bg-blue-100 p-1 rounded">
                        <Video className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                    {doctor.consultationType.includes('Phone Call') && (
                      <div className="bg-green-100 p-1 rounded">
                        <Phone className="h-4 w-4 text-green-600" />
                      </div>
                    )}
                    {doctor.consultationType.includes('In-Person') && (
                      <div className="bg-purple-100 p-1 rounded">
                        <User className="h-4 w-4 text-purple-600" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Information Section */}
        <div className="mt-12 bg-blue-50 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What to Expect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">First Session</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Initial assessment and goal setting</li>
                <li>• Discussion of your concerns and history</li>
                <li>• Treatment plan development</li>
                <li>• Questions about the therapy process</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Ongoing Support</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Regular progress monitoring</li>
                <li>• Skill development and coping strategies</li>
                <li>• Flexible scheduling for your academic calendar</li>
                <li>• Coordination with campus resources when needed</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorConsultation;