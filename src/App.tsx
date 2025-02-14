import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Thermometer, Droplets, Heart, Stethoscope } from 'lucide-react';
import { MetricCard } from './components/MetricCard';
import { DataTable } from './components/DataTable';
import HealthDataChart from './components/HealthDataChart';
import { HealthData } from './types';
import AskAI from './components/AskAI';

function App() {
  const [data, setData] = useState<HealthData[]>([]);
  const [userInput, setUserInput] = useState({
    temperature: '',
    heartRate: '',
    spo2: ''
  });
  const [aiPrediction, setAiPrediction] = useState('Awaiting input...');
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput(prev => ({ ...prev, [name]: value }));
  };
  const recordData = () => {
    const temp = parseFloat(userInput.temperature);
    const heartRate = parseFloat(userInput.heartRate);
    const spo2 = parseFloat(userInput.spo2);
    
    if (isNaN(temp) || isNaN(heartRate) || isNaN(spo2)) {
      toast.error('Please enter valid numerical values');
      return;
    }
    const newEntry: HealthData = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      temperature: temp,
      heartRate: heartRate,
      spo2: spo2
    };
    setData(prev => [...prev, newEntry]);
    toast.success('Health data recorded successfully');
  };
  const handleAIPrediction = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const temp = parseFloat(userInput.temperature);
      const heartRate = parseFloat(userInput.heartRate);
      const spo2 = parseFloat(userInput.spo2);
      
      if (isNaN(temp) || isNaN(heartRate) || isNaN(spo2)) {
        setAiPrediction('Invalid input. Please enter numerical values.');
        setIsLoading(false);
        return;
      }
      if (temp > 38 || temp < 35) {
        setAiPrediction('Check Required - Temperature');
      } else if (heartRate > 100 || heartRate < 60) {
        setAiPrediction('Check Required - Heart Rate');
      } else if (spo2 < 95) {
        setAiPrediction('Check Required - SpO2');
      } else {
        setAiPrediction('Normal');
      }
      setIsLoading(false);
      recordData();
    }, 1000);
  };
  const team = [
    {
      name: 'Vitthal Choudhary',
      role: 'Cardiologist',
      education: 'M.D in Heart Transplant',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300'
    },
    {
      name: 'Lakshay Chhabra',
      role: 'Neurologist',
      education: 'Ph.D in Brain',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300'
    },
    {
      name: 'Suresh Khanna',
      role: 'Dental',
      education: 'MDS/BDS',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300'
    },
    {
      name: 'Ronak Sharma',
      role: 'Physiologist',
      education: 'PhD in physiology',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300&h=300'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <Stethoscope className="w-10 h-10" />
            <div>
              <h1 className="text-3xl font-bold">Health Monitoring Dashboard</h1>
              <p className="text-blue-100 mt-1">Real-time health metrics with AI predictions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Health Data Chart */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              Health Data History
            </h2>
          </div>
          
          <div className="p-6">
            {data.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                No data recorded yet. Start by entering your health metrics above.
              </div>
            ) : (
              <HealthDataChart data={data} />
            )}
          </div>
        </div>

        {/* AI Prediction Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              AI Health Prediction
            </h2>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative">
                <Thermometer className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm text-gray-800 placeholder-gray-400"
                  type="text"
                  name="temperature"
                  placeholder="Temperature (°C)"
                  value={userInput.temperature}
                  onChange={handleInputChange}
                />
              </div>
              <div className="relative">
                <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm text-gray-800 placeholder-gray-400"
                  type="text"
                  name="heartRate"
                  placeholder="Heart Rate (bpm)"
                  value={userInput.heartRate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="relative">
                <Droplets className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm text-gray-800 placeholder-gray-400"
                  type="text"
                  name="spo2"
                  placeholder="SpO2 (%)"
                  value={userInput.spo2}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <button 
                onClick={handleAIPrediction}
                disabled={isLoading}
                className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <span>Get AI Prediction</span>
                )}
              </button>

              <div className="w-full max-w-2xl">
                <div className={`p-4 rounded-lg shadow-lg transition-all duration-500 ${
                  aiPrediction === 'Normal' 
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white'
                    : aiPrediction.includes('Check Required')
                    ? 'bg-gradient-to-r from-amber-500 to-red-500 text-white'
                    : 'bg-gradient-to-r from-gray-700 to-gray-800 text-white'
                }`}>
                  <p className="text-lg font-semibold text-center">
                    {aiPrediction}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <section className="bg-white rounded-2xl shadow-xl overflow-hidden" id="team">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Schedule an Appointment</h2>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div 
                  key={index} 
                  className="group relative overflow-hidden rounded-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-80 object-cover rounded-xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-emerald-400 font-medium">{member.role}</p>
                    <p className="text-gray-300 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{member.education}</p>
                    <button className="mt-4 px-4 py-2 bg-white text-gray-900 rounded-lg font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100">
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <AskAI />
      </div>
    </div>
  );
}

export default App;
