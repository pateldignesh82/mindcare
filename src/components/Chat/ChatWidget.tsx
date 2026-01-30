import React from 'react';
import { MessageCircle } from 'lucide-react';

const ChatWidget: React.FC = () => {
    const handleChatRedirect = () => {
        window.open('https://chatgpt.com/', '_blank');
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-float">
            <button
                onClick={handleChatRedirect}
                className="group relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95"
                title="Open Live Chat Support"
            >
                {/* 3D Sphere Effect Background */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400 via-indigo-600 to-indigo-800 shadow-xl opacity-90 group-hover:opacity-100 transition-opacity"></div>

                {/* Inner shine for depth */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-transparent to-white opacity-20"></div>

                {/* Glow Effect */}
                <div className="absolute -inset-1 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300"></div>

                {/* Icon */}
                <MessageCircle className="w-8 h-8 text-white relative z-10 drop-shadow-md" />
            </button>
        </div>
    );
};

export default ChatWidget;
