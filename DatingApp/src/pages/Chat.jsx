import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants';
import Button from '../components/Button';
import Input from '../components/Input';

/**
 * Chat Page
 * Displays conversations and allows messaging with matches
 */
const Chat = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState(0);
  const [messageInput, setMessageInput] = useState('');
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'Sarah Smith',
      lastMessage: 'Hey! How are you doing? 😊',
      timestamp: '2 hours ago',
      unread: 2,
      messages: [
        { id: 1, sender: 'Sarah', text: 'Hi there! 👋', timestamp: '2 hours ago' },
        { id: 2, sender: 'You', text: 'Hi Sarah! How are you?', timestamp: '1 hour 59 minutes ago' },
        { id: 3, sender: 'Sarah', text: 'I am doing great, thanks for asking!', timestamp: '1 hour 58 minutes ago' },
        { id: 4, sender: 'Sarah', text: 'Hey! How are you doing? 😊', timestamp: '2 hours ago' },
      ],
    },
    {
      id: 2,
      name: 'Emma Johnson',
      lastMessage: 'That sounds amazing! Let\'s plan it',
      timestamp: '5 hours ago',
      unread: 0,
      messages: [
        { id: 1, sender: 'Emma', text: 'Have you been to the new restaurant downtown?', timestamp: '5 hours ago' },
        { id: 2, sender: 'You', text: 'Not yet! Is it good?', timestamp: '4 hours 59 minutes ago' },
        { id: 3, sender: 'Emma', text: 'It\'s amazing! We should go there sometime', timestamp: '4 hours 58 minutes ago' },
        { id: 4, sender: 'You', text: 'I\'d love that!', timestamp: '4 hours 57 minutes ago' },
        { id: 5, sender: 'Emma', text: 'That sounds amazing! Let\'s plan it', timestamp: '5 hours ago' },
      ],
    },
    {
      id: 3,
      name: 'Jessica Williams',
      lastMessage: 'Thanks! Your profile is awesome too 😄',
      timestamp: '1 day ago',
      unread: 0,
      messages: [
        { id: 1, sender: 'Jessica', text: 'I love your bio!', timestamp: '1 day ago' },
        { id: 2, sender: 'You', text: 'Thanks! I really enjoyed yours too', timestamp: '23 hours 59 minutes ago' },
        { id: 3, sender: 'Jessica', text: 'Thanks! Your profile is awesome too 😄', timestamp: '1 day ago' },
      ],
    },
  ]);

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations[selectedConversation]?.messages]);

  const currentConversation = conversations[selectedConversation];

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!messageInput.trim()) return;

    // Add new message
    const updatedConversations = [...conversations];
    updatedConversations[selectedConversation].messages.push({
      id: currentConversation.messages.length + 1,
      sender: 'You',
      text: messageInput,
      timestamp: 'just now',
    });

    // Update last message
    updatedConversations[selectedConversation].lastMessage = messageInput;
    updatedConversations[selectedConversation].timestamp = 'just now';

    setConversations(updatedConversations);
    setMessageInput('');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">DatingApp</h1>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(ROUTES.HOME)}
            >
              Home
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(ROUTES.PROFILE)}
            >
              Profile
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(ROUTES.MATCHES)}
            >
              Matches
            </Button>
          </div>
        </div>
      </nav>

      {/* Chat Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Conversations List */}
        <div className="w-full md:w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
            {conversations.map((conv, index) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(index)}
                className={`
                  p-4 rounded-lg cursor-pointer transition-all
                  ${selectedConversation === index
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50'
                  }
                  mb-2
                `}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">
                    {conv.name}
                  </h3>
                  {conv.unread > 0 && (
                    <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 truncate mb-1">
                  {conv.lastMessage}
                </p>
                <p className="text-xs text-gray-500">
                  {conv.timestamp}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="hidden md:flex flex-1 flex-col bg-white">
          {currentConversation ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {currentConversation.name}
                  </h3>
                  <p className="text-sm text-gray-600">Active now</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentConversation.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`
                        max-w-xs px-4 py-2 rounded-lg
                        ${msg.sender === 'You'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-gray-200 text-gray-900 rounded-bl-none'
                        }
                      `}
                    >
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'You' ? 'text-blue-100' : 'text-gray-600'}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                  >
                    Send
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </div>

        {/* Mobile View - Show selected conversation */}
        {selectedConversation !== null && (
          <div className="flex md:hidden flex-1 flex-col bg-white">
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {currentConversation.name}
                  </h3>
                  <p className="text-sm text-gray-600">Active now</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentConversation.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`
                        max-w-xs px-4 py-2 rounded-lg
                        ${msg.sender === 'You'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-gray-200 text-gray-900 rounded-bl-none'
                        }
                      `}
                    >
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'You' ? 'text-blue-100' : 'text-gray-600'}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                  >
                    Send
                  </Button>
                </form>
              </div>
            </>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;