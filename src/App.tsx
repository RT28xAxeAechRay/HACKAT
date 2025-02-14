import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Thermometer, Droplets, Heart } from 'lucide-react';
import { MetricCard } from './components/MetricCard';
import { DataTable } from './components/DataTable';
import { HealthData } from './types';
import AskAI from './components/AskAI';

function App() {
  const [data, setData] = useState<HealthData[]>([]);
  
  const team = [
    {
      name: 'Harshit Jangra',
      role: 'Cardiologist',
      education: 'M.D in Heart Transplant',
      image: 'data:image/jpeg;base64,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'
    },
    {
      name: 'Rishi Thakur',
      role: 'Neurologist',
      education: 'Ph.D in Brain',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300'
    },
    {
      name: 'Shivam rawat',
      role: 'Dental',
      education: 'MDS/BDS',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300'
    },
    {
      name: 'Aniket',
      role: 'Physiologist',
      education: 'PhD in physiology',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300&h=300'
    }
  ];

  const handleAppointment = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSd2cHWhX0knKThcRiekh1Szf4jRzSiltuGtDOkB59UuUg-NQw/viewform', '_blank');
  };

  // Generate ML prediction based on recent data
  const generateMLPrediction = (recentData: HealthData[]) => {
    if (recentData.length < 5) return 'Gathering Data...';
    
    const lastTemp = recentData[recentData.length - 1].temperature;
    const lastHR = recentData[recentData.length - 1].humidity; // using humidity as heart rate
    const lastSpO2 = recentData[recentData.length - 1].spo2;
    
    // Simple rule-based prediction
    if (lastTemp > 38 || lastTemp < 35) {
      return 'Check Required - Temperature';
    }
    if (lastHR > 100 || lastHR < 60) {
      return 'Check Required - Heart Rate';
    }
    if (lastSpO2 < 95) {
      return 'Check Required - SpO2';
    }
    
    return 'Normal';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newData: HealthData = {
        timestamp: new Date(),
        temperature: 36.5 + Math.random() * 2,
        humidity: 75 + Math.random() * 25, // Simulating heart rate (60-100 bpm)
        spo2: 95 + Math.random() * 3,
        prediction: 'Processing...'
      };
      
      setData(prev => {
        const updatedData = [...prev.slice(-20), newData];
        // Update prediction using ML simulation
        updatedData[updatedData.length - 1].prediction = generateMLPrediction(updatedData);
        return updatedData;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const getLatestMetric = (key: keyof HealthData) => {
    if (data.length === 0) return 0;
    return data[data.length - 1][key] as number;
  };

  const calculateTrend = (key: keyof HealthData) => {
    if (data.length < 2) return 0;
    const current = data[data.length - 1][key] as number;
    const previous = data[data.length - 2][key] as number;
    return ((current - previous) / previous) * 100;
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/uc?export=download&id=1PEvb3f0asH-4_mlpxiBikSx5Wp3_jADy';
    link.download = 'patient_report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Health Monitoring Dashboard</h1>
            <p className="text-gray-600 mt-1">Real-time health metrics with AI predictions</p>
          </div>
    import { useState } from "react";
import { Button, Input, Modal } from "@/components/ui";

export default function UserDetails() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState({ height: "", weight: "" });

  const handleSubmit = () => {
    console.log("User details:", details);
    setOpen(false); // Close modal after submission
  };

  return (
    <div>
      {/* Button to Open Form */}
      <Button onClick={() => setOpen(true)}>Input Your Details</Button>

      {/* Modal for Input Form */}
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <h2 className="text-xl font-bold">Enter Your Details</h2>
          <div className="mt-4">
            <Input
              placeholder="Height (cm)"
              value={details.height}
              onChange={(e) => setDetails({ ...details, height: e.target.value })}
            />
            <Input
              placeholder="Weight (kg)"
              value={details.weight}
              onChange={(e) => setDetails({ ...details, weight: e.target.value })}
            />
            <Button className="mt-4" onClick={handleSubmit}>Submit</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

          <button onClick={handleDownload} className="bg-blue-500 text-white px-4 py-2 rounded-md shadow">
            Download Report
          </button>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Temperature"
            value={Number(getLatestMetric('temperature').toFixed(1))}
            unit="°C"
            icon={<Thermometer className="text-red-500" />}
            trend={Number(calculateTrend('temperature').toFixed(1))}
            prediction={data[data.length - 1]?.prediction || 'Loading...'}
          />
          <MetricCard
            title="Heart Rate"
            value={Number(getLatestMetric('humidity').toFixed(1))}
            unit="bpm"
            icon={<Heart className="text-pink-500" />}
            trend={Number(calculateTrend('humidity').toFixed(1))}
            prediction={data[data.length - 1]?.prediction || 'Loading...'}
          />
          <MetricCard
            title="SpO2"
            value={Number(getLatestMetric('spo2').toFixed(1))}
            unit="%"
            icon={<Droplets className="text-blue-500" />}
            trend={Number(calculateTrend('spo2').toFixed(1))}
            prediction={data[data.length - 1]?.prediction || 'Loading...'}
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Metrics Over Time</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" tickFormatter={(time) => new Date(time).toLocaleTimeString()} />
                <YAxis />
                <Tooltip labelFormatter={(label) => new Date(label).toLocaleTimeString()} />
                <Line type="monotone" dataKey="temperature" stroke="#ef4444" name="Temperature (°C)" />
                <Line type="monotone" dataKey="humidity" stroke="#ec4899" name="Heart Rate (bpm)" />
                <Line type="monotone" dataKey="spo2" stroke="#3b82f6" name="SpO2 (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Measurements</h2>
          <DataTable data={data} />
        </div>

        <section className="py-20 bg-white rounded-xl shadow-lg" id="team">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Schedule an Appointment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div 
                  key={index} 
                  className="bg-gray-600 rounded-xl p-6 text-center shadow-lg hover:shadow-emerald-500/10 transition-all hover:-translate-y-1 cursor-pointer"
                  onClick={handleAppointment}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleAppointment();
                    }
                  }}
                >
                  <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                  <h3 className="text-xl font-semibold mb-1 text-white">{member.name}</h3>
                  <p className="text-emerald-500 mb-2">{member.role}</p>
                  <p className="text-white text-sm">{member.education}</p>
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
