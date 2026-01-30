import React, { useState } from 'react';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Plus, 
  Shield, 
  Clock,
  ThumbsUp,
  Send,
  Search,
  Filter
} from 'lucide-react';
import Navigation from './Navigation';
import { User } from '../types/User';

interface CommunityProps {
  user: User;
  onLogout: () => void;
}

const Community = ({ user, onLogout }: CommunityProps) => {
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  const supportGroups = [
    {
      id: 1,
      name: "Anxiety Support Circle",
      description: "A safe space for students dealing with anxiety and panic disorders",
      members: 1247,
      category: "anxiety",
      isPrivate: true,
      moderators: 3,
      activeNow: 23,
      lastActivity: "2 minutes ago",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      name: "Depression & Mood Support",
      description: "Supportive community for those navigating depression and mood challenges",
      members: 892,
      category: "depression",
      isPrivate: true,
      moderators: 4,
      activeNow: 15,
      lastActivity: "5 minutes ago",
      color: "from-green-500 to-teal-500"
    },
    {
      id: 3,
      name: "Academic Stress Warriors",
      description: "Students helping students overcome academic pressure and perfectionism",
      members: 2156,
      category: "stress",
      isPrivate: false,
      moderators: 2,
      activeNow: 41,
      lastActivity: "1 minute ago",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      name: "Sleep & Wellness Hub",
      description: "Tips, support, and strategies for better sleep and overall wellness",
      members: 634,
      category: "wellness",
      isPrivate: false,
      moderators: 2,
      activeNow: 8,
      lastActivity: "12 minutes ago",
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: 5,
      name: "LGBTQ+ Student Mental Health",
      description: "Inclusive space for LGBTQ+ students to share experiences and support",
      members: 445,
      category: "lgbtq",
      isPrivate: true,
      moderators: 5,
      activeNow: 12,
      lastActivity: "8 minutes ago",
      color: "from-pink-500 to-rose-500"
    },
    {
      id: 6,
      name: "International Students Connect",
      description: "Support for international students facing unique mental health challenges",
      members: 789,
      category: "international",
      isPrivate: false,
      moderators: 3,
      activeNow: 19,
      lastActivity: "3 minutes ago",
      color: "from-orange-500 to-red-500"
    }
  ];

  const samplePosts = [
    {
      id: 1,
      author: "Sarah M.",
      time: "15 minutes ago",
      content: "Had my first therapy session today and I'm feeling hopeful for the first time in weeks. To anyone hesitant about seeking help - you're worth it! 💙",
      likes: 24,
      replies: 8,
      category: "therapy",
      supportive: true
    },
    {
      id: 2,
      author: "Anonymous",
      time: "32 minutes ago",
      content: "Finals week is approaching and I can feel the panic setting in. Any tried and tested study techniques that help with anxiety?",
      likes: 15,
      replies: 12,
      category: "academic",
      supportive: false
    },
    {
      id: 3,
      author: "Mike R.",
      time: "1 hour ago",
      content: "Reminder: It's okay to not be okay. It's okay to take breaks. It's okay to ask for help. You're not alone in this journey. 🌟",
      likes: 67,
      replies: 23,
      category: "encouragement",
      supportive: true
    }
  ];

  const handleJoinGroup = (groupId: number) => {
    const group = supportGroups.find(g => g.id === groupId);
    if (group) {
      setSelectedGroup(group);
      // Initialize sample messages for the group
      setMessages([
        {
          id: 1,
          author: "Community Helper",
          time: "2 hours ago",
          content: `Welcome to ${group.name}! This is a safe space for support and encouragement. Please remember to be kind and respectful to everyone.`,
          isWelcome: true
        },
        {
          id: 2,
          author: "Alex S.",
          time: "45 minutes ago",
          content: "Having a rough day today. The pressure is really getting to me. Anyone else feeling this way?",
          replies: 5
        },
        {
          id: 3,
          author: "Jamie L.",
          time: "30 minutes ago",
          content: "I hear you @Alex. You're not alone. Some days are harder than others, but remember that this feeling is temporary. We're here for you! 💙"
        }
      ]);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        author: user.name,
        time: "Just now",
        content: newMessage,
        isOwn: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  if (selectedGroup) {
    return (
      <div className="flex">
        <Navigation user={user} onLogout={onLogout} />
        <main className="flex-1 ml-64 p-8">
          <button
            onClick={() => setSelectedGroup(null)}
            className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Community Groups
          </button>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Group Header */}
            <div className={`bg-gradient-to-r ${selectedGroup.color} p-6 text-white rounded-t-xl`}>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{selectedGroup.name}</h1>
                  <p className="opacity-90 mb-4">{selectedGroup.description}</p>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{selectedGroup.members} members</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-300 rounded-full mr-2"></div>
                      <span>{selectedGroup.activeNow} active now</span>
                    </div>
                    {selectedGroup.isPrivate && (
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-1" />
                        <span>Private Group</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isOwn 
                      ? 'bg-blue-600 text-white' 
                      : message.isWelcome 
                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                        : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium">
                        {message.isOwn ? 'You' : message.author}
                      </span>
                      <span className="text-xs opacity-75">{message.time}</span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                    {message.replies && (
                      <div className="mt-2 text-xs opacity-75">
                        {message.replies} replies
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a supportive message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Remember to be kind, supportive, and respectful. All messages are moderated.
              </p>
            </div>
          </div>

          {/* Community Guidelines */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Community Guidelines</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Be respectful and supportive to all members</li>
              <li>• No discrimination, harassment, or harmful content</li>
              <li>• Respect privacy - don't share personal information</li>
              <li>• If you're in crisis, please contact emergency services immediately</li>
            </ul>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Peer Support Community</h1>
          <p className="text-gray-600">Connect with fellow students, share experiences, and find support in our safe spaces</p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Members</p>
                <p className="text-2xl font-bold text-gray-900">6,163</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Groups</p>
                <p className="text-2xl font-bold text-gray-900">{supportGroups.length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Online Now</p>
                <p className="text-2xl font-bold text-gray-900">118</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-lg">
                <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Posts Today</p>
                <p className="text-2xl font-bold text-gray-900">47</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Support Groups */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Support Groups</h2>
            <div className="flex space-x-3">
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search groups..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="h-5 w-5 mr-2" />
                Filter
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportGroups.map((group) => (
              <div key={group.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all">
                <div className={`bg-gradient-to-br ${group.color} h-20 rounded-t-xl`}></div>
                
                <div className="p-6 -mt-6 relative">
                  <div className="bg-white w-12 h-12 rounded-lg shadow-md flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-gray-600" />
                  </div>
                  
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{group.name}</h3>
                    {group.isPrivate && (
                      <Shield className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{group.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Members</span>
                      <span className="font-medium text-gray-900">{group.members.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Active now</span>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="font-medium text-green-600">{group.activeNow}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Last activity</span>
                      <span className="text-gray-600">{group.lastActivity}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleJoinGroup(group.id)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Join Group
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Community Posts */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Community Posts</h2>
            <button
              onClick={() => setShowNewPost(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Post
            </button>
          </div>

          <div className="space-y-4">
            {samplePosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">
                      {post.author.charAt(0)}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-medium text-gray-900">{post.author}</span>
                      <span className="text-sm text-gray-500">{post.time}</span>
                      {post.supportive && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          Supportive
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-700 mb-4">{post.content}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <button className="flex items-center hover:text-blue-600 transition-colors">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>{post.likes} likes</span>
                      </button>
                      <button className="flex items-center hover:text-blue-600 transition-colors">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span>{post.replies} replies</span>
                      </button>
                      <button className="flex items-center hover:text-blue-600 transition-colors">
                        <Share2 className="h-4 w-4 mr-1" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Notice */}
        <div className="mt-12 bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-start">
            <Shield className="h-6 w-6 text-red-600 mr-3 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">Community Safety</h3>
              <p className="text-red-700 mb-4">
                Our community is moderated 24/7 to ensure a safe and supportive environment. If you encounter harmful content or need immediate help:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <p className="font-medium text-red-800">Crisis Support</p>
                  <p className="text-red-700 font-bold">988</p>
                </div>
                <div className="bg-red-100 p-3 rounded-lg">
                  <p className="font-medium text-red-800">Text Crisis Line</p>
                  <p className="text-red-700 font-bold">741741</p>
                </div>
                <div className="bg-red-100 p-3 rounded-lg">
                  <p className="font-medium text-red-800">Report Content</p>
                  <p className="text-red-700 font-bold">Use report button</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Community;