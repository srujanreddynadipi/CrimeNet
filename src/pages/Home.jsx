import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, AlertCircle, MessageSquare, Radio, Users, 
  MapPin, Phone, Clock, CheckCircle, Star, ChevronLeft, 
  ChevronRight, Menu, X, Bell, FileText, Camera, Video,
  Send, Upload, Bot, Scale, Gavel, BookOpen, UserCheck,
  ArrowRight, Sparkles, Info, Download, Home, HelpCircle
} from 'lucide-react';

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl">
              <Shield className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">CrimeNet</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-8">
              {[
                { name: 'Home', icon: Home },
                { name: 'Report Crime', icon: AlertCircle },
                { name: 'Legal AI', icon: Bot },
                { name: 'Track Case', icon: FileText },
                { name: 'Resources', icon: BookOpen }
              ].map((item) => (
                <button
                  key={item.name}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium flex items-center space-x-1 group"
                  onClick={() => {
                    if (item.name === 'Legal AI') {
                      document.getElementById('legal-ai-section')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>
            <div className="flex items-center space-x-3 ml-4">
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105"
              >
                Sign Up
              </button>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {['Home', 'Report Crime', 'Legal AI', 'Track Case', 'Resources'].map((item) => (
              <button
                key={item}
                className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => {
                  if (item === 'Legal AI') {
                    document.getElementById('legal-ai-section')?.scrollIntoView({ behavior: 'smooth' });
                  }
                  setIsMenuOpen(false);
                }}
              >
                {item}
              </button>
            ))}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <button
                onClick={() => { navigate('/login'); setIsMenuOpen(false); }}
                className="block w-full text-center py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Login
              </button>
              <button
                onClick={() => { navigate('/register'); setIsMenuOpen(false); }}
                className="block w-full text-center py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-bold"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// Hero Section
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="text-left">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Legal Assistant</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Your Safety, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Our Priority</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Report crimes instantly, get AI-powered legal guidance, and track cases in real-time through our secure civic safety platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => document.getElementById('legal-ai-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Bot className="w-6 h-6" />
              <span>Try Legal AI Assistant</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-full font-bold text-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <AlertCircle className="w-6 h-6" />
              <span>Report Crime</span>
            </button>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl transform rotate-3 opacity-20"></div>
          <img 
            src="https://images.unsplash.com/photo-1593115057322-e94b77572f20?w=600&h=400&fit=crop" 
            alt="Indian Police Service"
            className="relative rounded-3xl shadow-2xl object-cover w-full h-96"
          />
          <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center space-x-3">
            <div className="bg-green-100 p-3 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="font-bold text-gray-900">50K+ Cases</p>
              <p className="text-sm text-gray-600">Successfully Resolved</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// AI Legal Assistant Section
const LegalAISection = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hello! I\'m your AI Legal Assistant powered by InLegalBERT, trained on 5.4 million Indian legal documents. Describe your incident, and I\'ll help identify relevant IPC sections and guide you through the legal process.',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      name: file.name,
      size: (file.size / 1024).toFixed(2) + ' KB',
      type: file.type.includes('image') ? 'image' : 'document'
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const removeFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() && uploadedFiles.length === 0) return;

    const userMessage = {
      type: 'user',
      content: inputText,
      files: uploadedFiles,
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate API call to InLegalBERT
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        content: generateLegalResponse(inputText),
        sections: [
          { section: 'IPC Section 323', title: 'Punishment for voluntarily causing hurt', description: 'Whoever, except in the case provided for by section 334, voluntarily causes hurt, shall be punished with imprisonment of either description for a term which may extend to one year, or with fine which may extend to one thousand rupees, or with both.' },
          { section: 'IPC Section 325', title: 'Punishment for voluntarily causing grievous hurt', description: 'Whoever, except in the case provided for by section 335, voluntarily causes grievous hurt, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.' }
        ],
        nextSteps: [
          { step: 'File an FIR', icon: FileText, description: 'Visit the nearest police station or file online' },
          { step: 'Medical Documentation', icon: Camera, description: 'Get medical certificate documenting injuries' },
          { step: 'Legal Consultation', icon: Scale, description: 'Consider consulting a lawyer for legal guidance' },
          { step: 'Collect Evidence', icon: Upload, description: 'Gather witnesses and any video/photo evidence' }
        ],
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
      setUploadedFiles([]);
    }, 2000);
  };

  const generateLegalResponse = (input) => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('beat') || lowerInput.includes('assault') || lowerInput.includes('hit')) {
      return 'Based on your description of physical assault leading to hospitalization, I\'ve identified the following relevant IPC sections that may apply to your case. The severity of charges depends on the extent of injuries sustained.';
    }
    return 'I\'ve analyzed your case description. Here are the relevant legal sections and recommended actions for your situation.';
  };

  return (
    <section id="legal-ai-section" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Bot className="w-4 h-4" />
            <span>Powered by InLegalBERT AI</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            AI Legal Assistant
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Describe your incident and get instant legal guidance with relevant IPC sections
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 flex items-center space-x-3">
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Legal AI Assistant</h3>
                  <p className="text-blue-100 text-sm">Trained on 5.4M+ Indian legal documents</p>
                </div>
              </div>

              {/* Messages Area */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-3xl ${message.type === 'user' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' : 'bg-white border border-gray-200'} rounded-2xl p-4 shadow-md`}>
                      <p className={`${message.type === 'user' ? 'text-white' : 'text-gray-800'} leading-relaxed`}>
                        {message.content}
                      </p>
                      
                      {message.files && message.files.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {message.files.map((file, idx) => (
                            <div key={idx} className="bg-white/20 rounded-lg p-2 flex items-center space-x-2 text-sm">
                              {file.type === 'image' ? <Camera className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                              <span className="font-medium">{file.name}</span>
                              <span className="text-xs opacity-75">({file.size})</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {message.sections && (
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center space-x-2 text-blue-600 font-semibold">
                            <Scale className="w-5 h-5" />
                            <span>Identified Legal Sections:</span>
                          </div>
                          {message.sections.map((section, idx) => (
                            <div key={idx} className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                              <h4 className="font-bold text-blue-900 mb-2 flex items-center space-x-2">
                                <Gavel className="w-4 h-4" />
                                <span>{section.section}</span>
                              </h4>
                              <p className="text-blue-800 font-medium text-sm mb-2">{section.title}</p>
                              <p className="text-blue-700 text-sm leading-relaxed">{section.description}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {message.nextSteps && (
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center space-x-2 text-indigo-600 font-semibold">
                            <CheckCircle className="w-5 h-5" />
                            <span>Recommended Next Steps:</span>
                          </div>
                          <div className="grid gap-3">
                            {message.nextSteps.map((step, idx) => (
                              <div key={idx} className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 flex items-start space-x-3">
                                <div className="bg-indigo-100 p-2 rounded-lg">
                                  <step.icon className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div>
                                  <h5 className="font-bold text-indigo-900 text-sm">{step.step}</h5>
                                  <p className="text-indigo-700 text-xs mt-1">{step.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-md">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4 bg-white">
                {uploadedFiles.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {uploadedFiles.map((file, idx) => (
                      <div key={idx} className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 flex items-center space-x-2 text-sm">
                        {file.type === 'image' ? <Camera className="w-4 h-4 text-blue-600" /> : <FileText className="w-4 h-4 text-blue-600" />}
                        <span className="text-blue-900 font-medium">{file.name}</span>
                        <button onClick={() => removeFile(idx)} className="text-blue-600 hover:text-blue-800">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-end space-x-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                    title="Upload Evidence"
                  >
                    <Upload className="w-5 h-5 text-gray-600" />
                  </button>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Describe your incident... (e.g., 'Someone beat me and I was hospitalized')"
                    className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows="2"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading}
                    className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Press Enter to send, Shift + Enter for new line</p>
              </div>
            </div>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center space-x-2 mb-4">
                <Info className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-gray-900">How It Works</h3>
              </div>
              <ol className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
                  <span>Describe your incident in detail</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">2</span>
                  <span>Upload any evidence (photos, documents)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">3</span>
                  <span>AI identifies relevant IPC sections</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">4</span>
                  <span>Get step-by-step legal guidance</span>
                </li>
              </ol>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-5 h-5 text-green-600" />
                <h3 className="font-bold text-gray-900">Privacy & Security</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>End-to-end encrypted conversations</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Data stored securely in your account</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>AI guidance is not legal advice</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
              <div className="flex items-center space-x-2 mb-4">
                <HelpCircle className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-gray-900">Example Queries</h3>
              </div>
              <div className="space-y-2">
                {[
                  'Someone stole my phone',
                  'I was assaulted and injured',
                  'Neighbor threatening me',
                  'Property dispute issue'
                ].map((example, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputText(example)}
                    className="w-full text-left p-2 bg-white hover:bg-amber-100 border border-amber-200 rounded-lg text-sm text-gray-700 transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Features Section
const Features = () => {
  const features = [
    { icon: AlertCircle, title: 'Instant Crime Reporting', description: 'Report incidents with photos, videos, and precise location in seconds.', color: 'from-red-400 to-pink-500' },
    { icon: Bot, title: 'AI Legal Guidance', description: 'Get instant IPC section identification and legal advice powered by AI.', color: 'from-blue-400 to-indigo-500' },
    { icon: Clock, title: 'Live Status Tracking', description: 'Track your case progress in real-time with automatic updates.', color: 'from-green-400 to-emerald-500' },
    { icon: MessageSquare, title: 'Secure Chat', description: 'Encrypted communication channel between citizens and officers.', color: 'from-purple-400 to-violet-500' },
    { icon: Phone, title: 'SOS Button', description: 'One-tap emergency alert sends location to police and contacts.', color: 'from-orange-400 to-red-500' },
    { icon: Users, title: 'Community Watch', description: 'Join neighborhood groups and report suspicious activities together.', color: 'from-cyan-400 to-blue-500' },
  ];
  
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Powerful Features for Your Safety
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cutting-edge technology to empower citizens and streamline law enforcement response
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`bg-gradient-to-br ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Status Tracker
const StatusTracker = () => {
  const steps = [
    { label: 'Report Filed', icon: FileText, status: 'completed' },
    { label: 'Under Review', icon: Clock, status: 'completed' },
    { label: 'Officer Assigned', icon: Shield, status: 'active' },
    { label: 'Investigation', icon: Camera, status: 'pending' },
    { label: 'Case Resolved', icon: CheckCircle, status: 'pending' },
  ];
  
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Track Your Case Progress
          </h2>
          <p className="text-xl text-gray-600">
            Real-time updates at every step of your complaint journey
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 border border-blue-200 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-8 md:space-y-0 md:space-x-4">
            {steps.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center text-center flex-1">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                    step.status === 'completed' ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/50' :
                    step.status === 'active' ? 'bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/50 animate-pulse' :
                    'bg-gray-200 border-2 border-gray-300'
                  }`}>
                    <step.icon className={`w-8 h-8 ${step.status === 'pending' ? 'text-gray-400' : 'text-white'}`} />
                  </div>
                  <p className={`font-bold text-sm md:text-base ${
                    step.status === 'pending' ? 'text-gray-400' : 'text-gray-900'
                  }`}>
                    {step.label}
                  </p>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`hidden md:block h-1 flex-1 rounded-full transition-all duration-300 ${
                    steps[idx + 1].status === 'completed' || steps[idx + 1].status === 'active'
                      ? 'bg-gradient-to-r from-green-400 to-blue-500'
                      : 'bg-gray-300'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Stats Section
const StatsSection = () => {
  const stats = [
    { number: '50K+', label: 'Cases Resolved', icon: CheckCircle },
    { number: '10K+', label: 'Active Users', icon: Users },
    { number: '500+', label: 'Police Stations', icon: Shield },
    { number: '98%', label: 'Satisfaction Rate', icon: Star },
  ];
  
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-500 to-indigo-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-blue-100">
            Making India safer, one case at a time
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-center transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 p-4 rounded-2xl">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-4xl font-extrabold text-white mb-2">{stat.number}</h3>
              <p className="text-blue-100 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials
const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const testimonials = [
    { name: 'Priya Sharma', location: 'Mumbai', text: 'The AI Legal Assistant helped me understand which sections to file under. Got my case registered within hours!', rating: 5, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' },
    { name: 'Rajesh Kumar', location: 'Delhi', text: 'The SOS button is a lifesaver. I felt secure knowing help is just one tap away. The secure chat feature is excellent.', rating: 5, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop' },
    { name: 'Anita Patel', location: 'Bangalore', text: 'Community Watch brought our neighborhood together. We caught suspicious activity early thanks to CrimeNet.', rating: 5, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop' },
  ];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            What Citizens Say
          </h2>
          <p className="text-xl text-gray-600">
            Real stories from people who trusted CrimeNet
          </p>
        </div>
        
        <div className="relative bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-2xl">
          <div className="flex justify-center mb-6">
            {[...Array(testimonials[current].rating)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          
          <div className="flex justify-center mb-6">
            <img 
              src={testimonials[current].image} 
              alt={testimonials[current].name}
              className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
            />
          </div>
          
          <p className="text-xl md:text-2xl text-gray-700 text-center mb-8 leading-relaxed italic">
            "{testimonials[current].text}"
          </p>
          
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900">{testimonials[current].name}</p>
            <p className="text-gray-600">{testimonials[current].location}</p>
          </div>
          
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div className="flex space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === current ? 'bg-blue-500 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Image Showcase Section
const ImageShowcase = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Serving the Nation
          </h2>
          <p className="text-xl text-gray-600">
            Partnering with law enforcement across India
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group relative overflow-hidden rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-300">
            <img 
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop" 
              alt="Indian Police Force"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
              <div>
                <h3 className="text-white font-bold text-xl mb-2">Empowering Officers</h3>
                <p className="text-blue-100 text-sm">Advanced tools for faster response</p>
              </div>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-300">
            <img 
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop" 
              alt="Digital Safety"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
              <div>
                <h3 className="text-white font-bold text-xl mb-2">Digital First</h3>
                <p className="text-blue-100 text-sm">Technology-driven safety solutions</p>
              </div>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-300">
            <img 
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop" 
              alt="Community Safety"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
              <div>
                <h3 className="text-white font-bold text-xl mb-2">Community United</h3>
                <p className="text-blue-100 text-sm">Citizens and police working together</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full filter blur-3xl animate-pulse"></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
          Ready to Make Your Community Safer?
        </h2>
        <p className="text-xl text-blue-100 mb-10">
          Join thousands of citizens using CrimeNet to report crimes and track cases
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-10 py-4 bg-white text-blue-600 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-center space-x-2">
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            onClick={() => document.getElementById('legal-ai-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 bg-white/10 backdrop-blur-md border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center space-x-2"
          >
            <Bot className="w-5 h-5" />
            <span>Try Legal AI</span>
          </button>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">CrimeNet</span>
            </div>
            <p className="text-gray-400">
              Empowering citizens and law enforcement with technology for a safer tomorrow.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {['About Us', 'How It Works', 'Safety Tips', 'FAQs'].map((item) => (
                <li key={item}>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-lg">Legal</h4>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Data Protection', 'Accessibility'].map((item) => (
                <li key={item}>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-lg">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>support@crimenet.in</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Emergency: 100</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Helpline: 1800-XXX-XXXX</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 CrimeNet. All rights reserved. Built for a safer community.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <LegalAISection />
      <Features />
      <StatusTracker />
      <StatsSection />
      <ImageShowcase />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
}