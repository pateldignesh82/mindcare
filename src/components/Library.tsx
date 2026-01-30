import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  Clock,
  Eye,
  Heart,
  Download,
  Play,
  Volume2,
  ExternalLink,
  Bookmark,
  Share2
} from 'lucide-react';
import Navigation from './Navigation';
import { User } from '../types/User';

interface LibraryProps {
  user: User;
  onLogout: () => void;
}

const Library = ({ user, onLogout }: LibraryProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [savedResourceIds, setSavedResourceIds] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedResources');
    if (saved) {
      setSavedResourceIds(JSON.parse(saved));
    }
  }, []);

  const toggleSave = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const newSaved = savedResourceIds.includes(id)
      ? savedResourceIds.filter(savedId => savedId !== id)
      : [...savedResourceIds, id];

    setSavedResourceIds(newSaved);
    localStorage.setItem('savedResources', JSON.stringify(newSaved));
  };

  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'saved', name: 'Saved Resources' },
    { id: 'stress', name: 'Stress Management' },
    { id: 'anxiety', name: 'Anxiety Support' },
    { id: 'depression', name: 'Depression Help' },
    { id: 'sleep', name: 'Sleep Issues' },
    { id: 'academic', name: 'Academic Pressure' }
  ];

  const resources = [
    {
      id: 1,
      title: "Understanding Student Stress: A Complete Guide",
      category: "stress",
      type: "article",
      duration: "8 min read",
      views: 1524,
      rating: 4.8,
      summary: "Learn about common sources of student stress and effective coping strategies.",
      content: `Student stress is incredibly common, affecting up to 85% of college students. This comprehensive guide covers:

      • Common stress triggers for students
      • Physical and emotional symptoms to watch for  
      • Evidence-based stress management techniques
      • When to seek professional help
      • Building long-term resilience

      Remember: Stress is normal, but chronic stress needs attention. You're not alone in this journey.`,
      tags: ["stress", "coping", "student life"],
      link: "https://www.nimh.nih.gov/health/publications/so-stressed-out-fact-sheet"
    },
    {
      id: 2,
      title: "Breathing Techniques for Anxiety Relief",
      category: "anxiety",
      type: "video",
      duration: "12 min",
      views: 2341,
      rating: 4.9,
      summary: "Guided breathing exercises specifically designed for anxiety management.",
      content: `This video guide teaches you proven breathing techniques:

      • 4-7-8 breathing method
      • Box breathing technique
      • Belly breathing basics
      • When and where to practice
      • Making it a daily habit

      Practice these techniques daily for best results. Even 5 minutes can make a difference.`,
      tags: ["anxiety", "breathing", "mindfulness"],
      videoUrl: "https://www.youtube.com/watch?v=UB3tSaiEbNY"
    },
    {
      id: 3,
      title: "Recognizing Depression in College Students",
      category: "depression",
      type: "article",
      duration: "10 min read",
      views: 1876,
      rating: 4.7,
      summary: "Important information about depression symptoms and getting help.",
      content: `Depression among college students is serious but treatable. Key points:

      • Common symptoms and warning signs
      • Difference between sadness and depression
      • How academic pressure contributes
      • Available treatment options
      • Supporting friends who may be struggling

      If you recognize these signs in yourself or others, please reach out for help.`,
      tags: ["depression", "mental health", "support"],
      link: "https://www.nimh.nih.gov/health/topics/depression"
    },
    {
      id: 4,
      title: "Sleep Hygiene for Better Mental Health",
      category: "sleep",
      type: "guide",
      duration: "6 min read",
      views: 1203,
      rating: 4.6,
      summary: "Improve your sleep quality to support your mental wellbeing.",
      content: `Quality sleep is crucial for mental health. This guide covers:

      • Creating the ideal sleep environment
      • Establishing a bedtime routine
      • Managing screen time before bed
      • Dealing with racing thoughts
      • When sleep problems need professional attention

      Good sleep is not a luxury—it's essential for your mental health.`,
      tags: ["sleep", "routine", "wellness"],
      link: "https://www.cdc.gov/sleep/about_sleep/sleep_hygiene.html"
    },
    {
      id: 5,
      title: "Managing Academic Pressure and Perfectionism",
      category: "academic",
      type: "article",
      duration: "9 min read",
      views: 1655,
      rating: 4.8,
      summary: "Strategies for dealing with academic stress and perfectionist tendencies.",
      content: `Academic pressure can be overwhelming. Learn to manage it:

      • Setting realistic academic goals
      • Understanding perfectionism's hidden costs
      • Time management strategies
      • Building resilience to failure
      • Maintaining work-life balance

      Your worth is not determined by your grades. You are more than your academic performance.`,
      tags: ["academic", "perfectionism", "balance"],
      link: "https://screening.mhanational.org/content/mental-health-college-students/"
    },
    {
      id: 6,
      title: "Crisis Resources and When to Seek Help",
      category: "all",
      type: "resource",
      duration: "5 min read",
      views: 892,
      rating: 5.0,
      summary: "Essential information about crisis support and professional help.",
      content: `Know when and how to get help:

      • Warning signs of a mental health crisis
      • Emergency contact numbers
      • How to support someone in crisis
      • Finding professional help
      • What to expect from therapy

      Crisis Hotlines:
      • National Suicide Prevention Lifeline: 988
      • Crisis Text Line: Text HOME to 741741
      • SAMHSA National Helpline: 1-800-662-4357

      Remember: Seeking help is a sign of strength, not weakness.`,
      tags: ["crisis", "help", "resources"],
      link: "https://988lifeline.org/"
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all'
      ? true
      : selectedCategory === 'saved'
        ? savedResourceIds.includes(resource.id)
        : resource.category === selectedCategory;

    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-4 w-4" />;
      case 'audio': return <Volume2 className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'text-red-600 bg-red-100';
      case 'audio': return 'text-purple-600 bg-purple-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  if (selectedResource) {
    return (
      <div className="flex">
        <Navigation user={user} onLogout={onLogout} />
        <main className="flex-1 ml-64 p-8">
          <button
            onClick={() => setSelectedResource(null)}
            className="mb-6 text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            ← Back to Library
          </button>

          <article className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex items-center px-3 py-1 rounded-full bg-white bg-opacity-20`}>
                    {getTypeIcon(selectedResource.type)}
                    <span className="ml-2 text-sm font-medium capitalize">{selectedResource.type}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={(e) => toggleSave(e, selectedResource.id)}
                      className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
                    >
                      <Bookmark className={`h-5 w-5 ${savedResourceIds.includes(selectedResource.id) ? 'fill-current' : ''}`} />
                    </button>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">{selectedResource.duration}</span>
                    </div>
                  </div>
                </div>
                <h1 className="text-3xl font-bold mb-2">{selectedResource.title}</h1>
                <p className="text-lg opacity-90">{selectedResource.summary}</p>

                <div className="flex items-center mt-6 space-x-6">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    <span className="text-sm">{selectedResource.views} views</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    <span className="text-sm">{selectedResource.rating}/5</span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="prose prose-lg max-w-none mb-8">
                  <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
                    {selectedResource.content}
                  </pre>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  {selectedResource.link && (
                    <a
                      href={selectedResource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center text-center"
                    >
                      <ExternalLink className="h-5 w-5 mr-2" />
                      Read Full Article
                    </a>
                  )}

                  {selectedResource.videoUrl && (
                    <a
                      href={selectedResource.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center text-center"
                    >
                      <Play className="h-5 w-5 mr-2" />
                      Watch Video
                    </a>
                  )}

                  <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <Share2 className="h-5 w-5 mr-2" />
                    Share Resource
                  </button>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedResource.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mental Health Resource Library</h1>
          <p className="text-gray-600">Evidence-based resources for stress, anxiety, depression, and overall wellbeing</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">Filter by category</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer group"
              onClick={() => setSelectedResource(resource)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                    {getTypeIcon(resource.type)}
                    <span className="ml-1 capitalize">{resource.type}</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{resource.duration}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">{resource.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{resource.summary}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      <span className="text-sm">{resource.views}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => toggleSave(e, resource.id)}
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Bookmark className={`h-5 w-5 ${savedResourceIds.includes(resource.id) ? 'fill-current text-blue-600' : ''}`} />
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap gap-1">
                    {resource.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Resources */}
        <div className="mt-12 bg-red-50 border border-red-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-red-800 mb-4">Crisis Support Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-red-700 mb-2">Suicide Prevention Lifeline</h3>
              <p className="text-2xl font-bold text-gray-900">988</p>
              <p className="text-sm text-gray-600">24/7 crisis support</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-red-700 mb-2">Crisis Text Line</h3>
              <p className="text-lg font-bold text-gray-900">Text HOME to 741741</p>
              <p className="text-sm text-gray-600">Free, confidential support</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-red-700 mb-2">Campus Counseling</h3>
              <p className="text-lg font-bold text-gray-900">Contact your school</p>
              <p className="text-sm text-gray-600">Student support services</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Library;