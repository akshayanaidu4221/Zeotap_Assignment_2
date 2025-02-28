import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import PlatformSelector from './components/PlatformSelector';
import SearchResults from './components/SearchResults';
import { Message, SearchResult, Platform } from './types';
import { generateResponse } from './utils/chatUtils';
import { Bot, Database } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      content: "Hi! I'm your CDP support assistant. I can help with questions about Segment, mParticle, Lytics, and Zeotap. How can I help you today?",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('all');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content,
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Generate response
      const { message, results } = await generateResponse(content, selectedPlatform);
      
      // Add assistant message
      setMessages(prev => [...prev, message]);
      setSearchResults(results);
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Add error message
      setMessages(prev => [
        ...prev,
        {
          id: uuidv4(),
          content: "Sorry, I encountered an error while processing your request. Please try again.",
          role: 'assistant',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectResult = (result: SearchResult) => {
    // Add the selected result as a message
    const resultMessage: Message = {
      id: uuidv4(),
      content: `${result.content}\n\nSource: [${result.title}](${result.url})`,
      role: 'assistant',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, resultMessage]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="container mx-auto flex items-center">
          <div className="flex items-center">
            <Database size={24} className="text-blue-500 mr-2" />
            <h1 className="text-xl font-bold text-gray-800">CDP Support Assistant</h1>
          </div>
          <div className="ml-auto">
            <PlatformSelector 
              selectedPlatform={selectedPlatform}
              onSelectPlatform={setSelectedPlatform}
            />
          </div>
        </div>
      </header>
      
      {/* Chat container */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="container mx-auto max-w-4xl">
          {/* Messages */}
          <div className="space-y-4">
            {messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-center space-x-2 text-gray-500">
                <Bot size={20} />
                <span>Thinking...</span>
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Search Results */}
          {searchResults.length > 0 && (
            <SearchResults 
              results={searchResults}
              onSelectResult={handleSelectResult}
            />
          )}
        </div>
      </div>
      
      {/* Input area */}
      <div className="container mx-auto max-w-4xl">
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}

export default App;