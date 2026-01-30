import React, { useState } from 'react';
import { 
  MessageCircle, 
  Phone, 
  Video, 
  Mail, 
  Clock, 
  Send, 
  User,
  AlertTriangle,
  Heart,
  Shield,
  ExternalLink
} from 'lucide-react';
import Navigation from './Navigation';
import { User as UserType } from '../types/User';

interface SupportProps {
  user: UserType;
  onLogout: () => void;
}

const Support = ({ user, onLogout }: SupportProps) => {
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<any[]>([
    {
      id: 1,
      sender: 'support',
      name: 'Sarah - Support Specialist',
      message: 'Hi! I\'m here to help. How are you feeling today?',
      time: '2 minutes ago',
      isSupport: true
    }
  ]);
  const [showChat, setShowChat] = useState(false);

  const emergencyContacts = [
    {
      name: "Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 crisis support and suicide prevention",
      type: "emergency",
      available: "24/7",
      icon: "🆘"
    },
    {
      name: "Crisis Text Line",
      number: "741741",
      description: "Text HOME for immediate crisis support",
      type: "text",
      available: "24/7",
      icon: "💬"
    },
    {
      name: "SAMHSA National Helpline",
      number: "1-800-662-4357",
      description: "Mental health and substance abuse support",
      type: "phone",
      available: "24/7",
      icon: "🏥"
    },
    {
      name: "National Alliance on Mental Illness",
      number: "1-800-950-6264",
      description: "Information and support for mental health",
      type: "info",
      available: "Mon-Fri, 10AM-10PM ET",
      icon: "ℹ️"
    }
  ];

  const campusResources = [
    {
      name: "Campus Counseling Center",
      contact: "(555) 123-HELP",
      description: "Free counseling services for students",
      hours: "Mon-Fri, 8AM-5PM",
      emergency: true
    },
    {
      name: "Dean of Students Office",
      contact: "(555) 123-DEAN",
      description: "Student crisis intervention and support",
      hours: "Mon-Fri, 9AM-5PM",
      emergency: false
    },
    {
      name: "Campus Health Services",
      contact: "(555) 123-HEALTH",
      description: "Medical and mental health services",
      hours: "Mon-Fri, 7AM-7PM",
      emergency: true
    },
    {
      name: "Residence Life Support",
      contact: "(555) 123-DORM",
      description: "24/7 support for residential students",
      hours: "24/7",
      emergency: true
    }
  ];

  const supportOptions = [
    {
      type: "chat",
      title: "Live Chat Support",
      description: "Connect with a trained peer counselor",
      availability: "24/7 Available",
      responseTime: "Usually responds in 2-3 minutes",
      icon: MessageCircle,
      color: "from-blue-500 to-cyan-500"
    },
    {
      type: "phone",
      title: "Phone Support",
      description: "Speak with a mental health professional",
      availability: "Mon-Fri, 8AM-10PM",
      responseTime: "Call now for immediate support",
      icon: Phone,
      color: "from-green-500 to-emerald-500"
    },
    {
      type: "video",
      title: "Video Counseling",
      description: "Face-to-face session with licensed therapist",
      availability: "By Appointment",
      responseTime: "Next available: Today 3:00 PM",
      icon: Video,
      color: "from-purple-500 to-pink-500"
    },
    {
      type: "email",
      title: "Email Support",
      description: "Send a detailed message about your concerns",
      availability: "Always Open",
      responseTime: "Response within 2-4 hours",
      icon: Mail,
      color: "from-orange-500 to-red-500"
    }
  ];

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        sender: 'user',
        name: user.name,
        message: chatMessage,
        time: 'Just now',
        isSupport: false
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatMessage('');

      // Simulate support response
      setTimeout(() => {
        const supportResponse = {
          id: chatMessages.length + 2,
          sender: 'support',
          name: 'Sarah - Support Specialist',
          message: 'Thank you for sharing. I understand this might be difficult. Can you tell me more about what\'s been on your mind lately?',
          time: 'Just now',
          isSupport: true
        };
        setChatMessages(prev => [...prev, supportResponse]);
      }, 2000);
    }
  };

  const handleStartSupport = (type: string) => {
    if (type === 'chat') {
      setShowChat(true);
    }
    // Other support types would open different interfaces
  };

  if (showChat) {
    return (
      <div className="flex">
        <Navigation user={user} onLogout={onLogout} />
        <main className="flex-1 ml-64 p-8">
          <button
            onClick={() => setShowChat(false)}
            className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Support Options
          </button>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-96 flex flex-col">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white rounded-t-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Live Support Chat</h3>
                      <p className="text-sm opacity-90">Connected to trained counselor</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-green-300 rounded-full mr-2"></div>
                    <span>Online</span>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isSupport ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.isSupport 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'bg-blue-600 text-white'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium">
                          {msg.name}
                        </span>
                        <span className="text-xs opacity-75">{msg.time}</span>
                      </div>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!chatMessage.trim()}
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  All conversations are confidential and secure. If you're in immediate danger, please call 988.
                </p>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Support Center</h1>
          <p className="text-gray-600">Get immediate help and connect with mental health professionals</p>
        </div>

        {/* Crisis Alert */}
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-8">
          <div className="flex items-start">
            <div className="bg-red-100 p-2 rounded-lg mr-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-800 mb-2">In Crisis? Get Immediate Help</h3>
              <p className="text-red-700 mb-4">
                If you're having thoughts of suicide or self-harm, or if you're in immediate danger, please reach out for help right now.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="bg-red-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center justify-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Call 988 Now
                </button>
                <button className="bg-red-100 text-red-700 px-4 py-3 rounded-lg font-medium hover:bg-red-200 transition-colors flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Text 741741
                </button>
                <button className="bg-red-100 text-red-700 px-4 py-3 rounded-lg font-medium hover:bg-red-200 transition-colors flex items-center justify-center">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Chat Online
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Support Options */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Support Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div key={option.type} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all">
                  <div className={`bg-gradient-to-r ${option.color} h-16`}></div>
                  <div className="p-6 -mt-8">
                    <div className="bg-white w-12 h-12 rounded-lg shadow-md flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-gray-600" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                    <p className="text-gray-600 mb-4">{option.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-green-600 font-medium">{option.availability}</span>
                      </div>
                      <p className="text-sm text-gray-600">{option.responseTime}</p>
                    </div>

                    <button
                      onClick={() => handleStartSupport(option.type)}
                      className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    >
                      Start {option.title}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">24/7 Crisis Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{contact.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{contact.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{contact.description}</p>
                      <div className="flex items-center text-sm text-green-600 mb-2">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{contact.available}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-600">{contact.number}</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    {contact.type === 'text' ? 'Send Text' : 'Call Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campus Resources */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Campus Support Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campusResources.map((resource, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{resource.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{resource.hours}</span>
                    </div>
                  </div>
                  {resource.emergency && (
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                      Emergency
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-600">{resource.contact}</span>
                  <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-medium hover:bg-blue-200 transition-colors">
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety & Privacy */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-start">
            <Shield className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">Your Privacy & Safety</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-green-700">
                <div>
                  <h4 className="font-medium mb-2">Confidentiality</h4>
                  <ul className="space-y-1">
                    <li>• All conversations are private and secure</li>
                    <li>• HIPAA-compliant data protection</li>
                    <li>• Information shared only with your consent</li>
                    <li>• Anonymous options available</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Professional Standards</h4>
                  <ul className="space-y-1">
                    <li>• Licensed mental health professionals</li>
                    <li>• Crisis-trained support specialists</li>
                    <li>• Regular supervision and quality assurance</li>
                    <li>• Evidence-based support approaches</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;