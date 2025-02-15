import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Stethoscope, Send, Loader2 } from "lucide-react";

const API_KEY = "AIzaSyCbFlp1gmXGZyukXLwiUkr5B-qpVI-wj9M";
const genAI = new GoogleGenerativeAI(API_KEY);

// Context prompt to make the AI focus on health-related queries
const HEALTH_CONTEXT = `You are a knowledgeable health assistant. Your role is to:
- Provide general health information and wellness advice
- Help users understand basic medical concepts
- Offer lifestyle and preventive health recommendations
- Guide users on when to seek professional medical help

Important notes:
- Always clarify you're not a substitute for professional medical advice
- Don't diagnose conditions or prescribe treatments
- Encourage users to consult healthcare providers for specific medical concerns
- Focus on evidence-based information from reliable medical sources
- Keep responses clear, concise, and easy to understand

Please only answer health-related questions. For non-health questions, politely explain that you're focused on health topics.`;

const HealthAI: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ question: string; answer: string }>>([]);

  const fetchAIResponse = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent([HEALTH_CONTEXT, question]);
      const text = result.response.text();

      setChatHistory(prev => [...prev, { question, answer: text }]);
      setResponse(text);
      setQuestion("");
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("❌ Sorry, I couldn't process your health-related question. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      fetchAIResponse();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-block p-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
          <Stethoscope className="w-16 h-16 text-blue-600" />
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          Health & Wellness AI Assistant
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Ask me anything about health, wellness, and lifestyle. I'm here to provide evidence-based information and general guidance.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-sm bg-white/90 border border-gray-100">
        <div className="mb-6 max-h-[400px] overflow-y-auto custom-scrollbar">
          {chatHistory.map((chat, index) => (
            <div key={index} className="mb-6 animate-fadeIn">
              <div className="flex items-start mb-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl py-3 px-5 max-w-[80%] shadow-sm transform hover:-translate-y-0.5 transition-transform duration-200">
                  <p className="text-gray-800">{chat.question}</p>
                </div>
              </div>
              <div className="flex items-start justify-end">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl py-3 px-5 max-w-[80%] shadow-sm transform hover:-translate-y-0.5 transition-transform duration-200">
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{chat.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-6">
          <div className="flex gap-3">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a health-related question..."
              className="flex-1 p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none shadow-sm transition-all duration-200 hover:border-blue-300"
              rows={2}
            />
            <button
              onClick={fetchAIResponse}
              disabled={loading || !question.trim()}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[56px] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Send className="w-6 h-6" />
              )}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-3 ml-1">
            Press Enter to send • Shift + Enter for new line
          </p>
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 mt-8 bg-white/50 backdrop-blur-sm py-3 px-6 rounded-full shadow-sm inline-block mx-auto">
        ⚕️ Note: This AI assistant provides general health information only. Always consult healthcare professionals for medical advice.
      </p>
    </div>
  );
};

export default HealthAI;
