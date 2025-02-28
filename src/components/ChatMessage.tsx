import React, { useState, useEffect } from 'react';
import { Message } from '../types';
import { MessageCircle, Bot } from 'lucide-react';
import { marked } from 'marked';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const [displayContent, setDisplayContent] = useState(isUser ? message.content : '');
  const [isTyping, setIsTyping] = useState(!isUser);
  
  // Typing effect for assistant messages
  useEffect(() => {
    if (isUser) return;
    
    let index = 0;
    const content = message.content;
    const typingSpeed = 15; // milliseconds per character
    
    setIsTyping(true);
    
    const typingInterval = setInterval(() => {
      setDisplayContent(content.substring(0, index));
      index++;
      
      if (index > content.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, typingSpeed);
    
    return () => clearInterval(typingInterval);
  }, [message.content, isUser]);
  
  // Parse markdown in assistant messages
  const formattedContent = isUser 
    ? displayContent 
    : marked.parse(displayContent) as string;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-3xl ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex items-center justify-center h-10 w-10 rounded-full ${isUser ? 'bg-blue-500 ml-3' : 'bg-gray-300 mr-3'}`}>
          {isUser ? <MessageCircle size={20} className="text-white" /> : <Bot size={20} className="text-gray-700" />}
        </div>
        <div className={`py-3 px-4 rounded-lg ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
          {isUser ? (
            <p>{displayContent}</p>
          ) : (
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
          )}
          <div className={`text-xs mt-1 ${isUser ? 'text-blue-200' : 'text-gray-500'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          {isTyping && !isUser && (
            <div className="flex space-x-1 mt-1">
              <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;