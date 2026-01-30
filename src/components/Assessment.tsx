import React, { useState } from 'react';
import { Brain, ChevronRight } from 'lucide-react';
import { User } from '../types/User';

interface AssessmentProps {
  user: User;
  onComplete: () => void;
}

const Assessment = ({ user, onComplete }: AssessmentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const questions = [
    "Have you been feeling stressed or overwhelmed with your studies in the past month?",
    "Do you often feel anxious about your academic performance or future career?",
    "Have you experienced persistent feelings of sadness or hopelessness recently?",
    "Do you have trouble sleeping or find yourself sleeping too much?"
  ];

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Assessment complete, calculate results
      const yesCount = newAnswers.filter(answer => answer).length;
      const assessmentResults = {
        stress: newAnswers[0],
        anxiety: newAnswers[1],
        depression: newAnswers[2],
        sleepIssues: newAnswers[3],
        score: yesCount
      };

      // Save results to user (in real app, save to database)
      const updatedUser = { ...user, assessmentResults };
      localStorage.setItem('mindcare_user', JSON.stringify(updatedUser));
      
      onComplete();
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-12 w-12 text-blue-600 mr-3" />
            <span className="text-3xl font-bold text-gray-900">MindCare</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Quick Mental Health Check-In
          </h1>
          <p className="text-gray-600">
            Welcome {user.name}! Let's start with a brief assessment to personalize your experience.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
              {questions[currentQuestion]}
            </h2>

            {/* Answer Options */}
            <div className="space-y-4">
              <button
                onClick={() => handleAnswer(true)}
                className="w-full p-4 text-left bg-red-50 border-2 border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-red-800">Yes</span>
                  <ChevronRight className="h-5 w-5 text-red-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button
                onClick={() => handleAnswer(false)}
                className="w-full p-4 text-left bg-green-50 border-2 border-green-200 rounded-lg hover:bg-green-100 hover:border-green-300 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-green-800">No</span>
                  <ChevronRight className="h-5 w-5 text-green-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>

          {/* Information Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> This assessment is for informational purposes only and is not a substitute for professional mental health evaluation. Your responses will help us provide personalized resources and recommendations.
            </p>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-sm text-red-800 font-medium">
            If you're in crisis or having thoughts of self-harm, please call 988 immediately
          </p>
          <p className="text-xs text-red-600 mt-1">24/7 Suicide & Crisis Lifeline</p>
        </div>
      </div>
    </div>
  );
};

export default Assessment;