import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Thermometer, Droplets, Heart, Stethoscope } from 'lucide-react';
import { MetricCard } from './components/MetricCard';
import { DataTable } from './components/DataTable';
import HealthDataChart from './components/HealthDataChart';
import { HealthData } from './types';
import AskAI from './components/AskAI';
import { useNavigate } from 'react-router-dom';

function App() {
  const [data, setData] = useState<HealthData[]>([]);
  const [userInput, setUserInput] = useState({
    temperature: '',
    heartRate: '',
    spo2: ''
  });
  const [aiPrediction, setAiPrediction] = useState('Awaiting input...');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
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
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          <Stethoscope className="w-10 h-10" />
          <div>
            <h1 className="text-3xl font-bold">Health Monitoring Dashboard</h1>
            <p className="text-blue-100 mt-1">Real-time health metrics with AI predictions</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/about')}
          className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition"
        >
          About Us
        </button>
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
        
        <AskAI />
      </div>
    </div>
  );
}

export default App;
