import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Mail, Shield, AlertCircle, CheckCircle, Activity, Clock, Users, DollarSign, Download, Filter } from 'lucide-react';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedCard, setSelectedCard] = useState(null);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    setAnimateCards(true);
  }, []);

  const PALETTE = ["#75B7FF", "#D5A8FF", "#FF9BAD", "#FFD1A3", "#10b981"];

  // Detection distribution data
  const detectionData = [
    { name: 'Legitimate', value: 16300, color: PALETTE[4] },
    { name: 'Temporary', value: 6800, color: PALETTE[2] },
    { name: 'Suspicious', value: 2100, color: PALETTE[3] },
  ];

  // Top domains data
  const topDomainsData = [
    { name: 'tempmail.com', value: 1240, color: PALETTE[2] },
    { name: 'guerrillamail.com', value: 980, color: PALETTE[3] },
    { name: '10minutemail.com', value: 856, color: PALETTE[0] },
    { name: 'throwaway.email', value: 723, color: PALETTE[1] },
    { name: 'fakeinbox.com', value: 654, color: PALETTE[2] },
  ];

  // Request distribution by hour
  const hourlyData = [
    { name: '00-06', value: 2400, color: PALETTE[0] },
    { name: '06-12', value: 5600, color: PALETTE[1] },
    { name: '12-18', value: 8900, color: PALETTE[2] },
    { name: '18-24', value: 6200, color: PALETTE[3] },
  ];

  // API endpoint usage
  const endpointData = [
    { name: 'Single Check', value: 12400, color: PALETTE[0] },
    { name: 'Bulk Validation', value: 8200, color: PALETTE[1] },
    { name: 'Domain Check', value: 2500, color: PALETTE[3] },
  ];

  // Detection methods
  const methodData = [
    { name: 'Blacklist', value: 4200, color: PALETTE[2] },
    { name: 'Pattern Match', value: 1800, color: PALETTE[3] },
    { name: 'DNS Check', value: 800, color: PALETTE[0] },
  ];

  // Response codes
  const responseData = [
    { name: '200 Success', value: 22100, color: PALETTE[4] },
    { name: '429 Rate Limited', value: 800, color: PALETTE[3] },
    { name: '400 Bad Request', value: 200, color: PALETTE[2] },
  ];

  const StatCard = ({ title, value, change, icon: Icon, trend, index, gradient }) => (
    <div 
      onClick={() => setSelectedCard(index === selectedCard ? null : index)}
      className={`rounded-2xl p-6 shadow-lg transition-all duration-300 cursor-pointer ${
        selectedCard === index ? 'scale-105 shadow-2xl' : 'hover:shadow-xl hover:scale-[1.02]'
      }`}
      style={{
        background: gradient || 'white',
        opacity: animateCards ? 1 : 0,
        transform: animateCards ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.5s ease-out ${index * 0.1}s`,
        border: selectedCard === index ? '2px solid rgba(0,0,0,0.1)' : '1px solid rgba(0,0,0,0.05)'
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm mb-1" style={{ color: gradient ? 'rgba(255,255,255,0.9)' : '#6e6e73' }}>
            {title}
          </p>
          <h3 className="text-3xl font-bold" style={{ color: gradient ? 'white' : '#1c1b1b' }}>
            {value}
          </h3>
          <div className="flex items-center mt-2">
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4 mr-1" style={{ color: gradient ? 'rgba(255,255,255,0.9)' : PALETTE[4] }} />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" style={{ color: gradient ? 'rgba(255,255,255,0.9)' : PALETTE[2] }} />
            )}
            <span className="text-sm" style={{ color: gradient ? 'rgba(255,255,255,0.9)' : trend === 'up' ? PALETTE[4] : PALETTE[2] }}>
              {change}
            </span>
            <span className="text-xs ml-1" style={{ color: gradient ? 'rgba(255,255,255,0.7)' : '#6e6e73' }}>
              vs last week
            </span>
          </div>
        </div>
        <div 
          className="p-4 rounded-2xl"
          style={{ 
            background: gradient ? 'rgba(255,255,255,0.2)' : `${PALETTE[index % PALETTE.length]}22`,
            backdropFilter: gradient ? 'blur(10px)' : 'none'
          }}
        >
          <Icon className="w-7 h-7" style={{ color: gradient ? 'white' : PALETTE[index % PALETTE.length] }} />
        </div>
      </div>
    </div>
  );

  const PieChartCard = ({ title, subtitle, data, showLegend = true }) => (
    <div 
      className="rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
      style={{ 
        background: 'white',
        border: '1px solid rgba(0,0,0,0.05)'
      }}
    >
      <h3 className="text-xl font-bold mb-1" style={{ color: '#1c1b1b' }}>{title}</h3>
      <p className="text-sm mb-4" style={{ color: '#6e6e73' }}>{subtitle}</p>
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
            outerRadius={100}
            innerRadius={60}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid rgba(0,0,0,0.1)', 
              borderRadius: '12px',
              padding: '12px'
            }}
          />
          {showLegend && <Legend />}
        </PieChart>
      </ResponsiveContainer>
      
      <div className="mt-4 space-y-2">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ background: entry.color }}
              ></div>
              <span className="text-sm" style={{ color: '#6e6e73' }}>{entry.name}</span>
            </div>
            <span className="text-sm font-semibold" style={{ color: '#1c1b1b' }}>
              {entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const styles = `
    @import url('https://fonts.cdnfonts.com/css/aeonik');
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    * { font-family: 'Aeonik', 'Inter', sans-serif; }

    @keyframes gradient-rotate {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      
      <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #fafafa, #f0fdf4)' }}>
        {/* Header */}
        <div className="bg-white border-b px-8 py-6" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div>
              <h1 
                className="text-4xl font-extrabold mb-1 bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg, #0A84FF, #B45CFF, #FF2D55, #FF9500)"
                }}
              >
                Analytics Dashboard
              </h1>
              <p className="text-base" style={{ color: '#6e6e73' }}>
                Temporary Email Detection Service
              </p>
            </div>
            <div className="flex gap-3">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 rounded-xl font-medium transition-all"
                style={{ 
                  border: '1px solid rgba(0,0,0,0.1)',
                  color: '#1c1b1b',
                  background: 'white'
                }}
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
              <button 
                className="flex items-center gap-2 px-6 py-2 text-white rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition-transform"
                style={{ background: '#1c1b1b' }}
              >
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        <div className="p-8 max-w-7xl mx-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total API Calls"
              value="23,100"
              change="+17.2%"
              icon={Activity}
              trend="up"
              index={0}
            />
            <StatCard 
              title="Temporary Detected"
              value="6,800"
              change="+23.4%"
              icon={AlertCircle}
              trend="up"
              index={1}
            />
            <StatCard 
              title="Detection Rate"
              value="29.4%"
              change="+2.1%"
              icon={Shield}
              trend="up"
              index={2}
              gradient={`linear-gradient(135deg, ${PALETTE[0]}, ${PALETTE[1]})`}
            />
            <StatCard 
              title="Avg Response Time"
              value="40ms"
              change="-5.2%"
              icon={Clock}
              trend="down"
              index={3}
            />
          </div>

          {/* Main Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <PieChartCard 
              title="Email Detection Distribution"
              subtitle="Breakdown of validation results"
              data={detectionData}
            />
            
            <PieChartCard 
              title="Top Blocked Domains"
              subtitle="Most frequent temporary email providers"
              data={topDomainsData}
            />
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <PieChartCard 
              title="Request Distribution"
              subtitle="API calls by time of day"
              data={hourlyData}
              showLegend={false}
            />
            
            <PieChartCard 
              title="API Endpoints"
              subtitle="Usage by endpoint type"
              data={endpointData}
              showLegend={false}
            />
            
            <PieChartCard 
              title="Detection Methods"
              subtitle="How emails are identified"
              data={methodData}
              showLegend={false}
            />
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PieChartCard 
              title="Response Status Codes"
              subtitle="API response distribution"
              data={responseData}
            />
            
            {/* Activity Feed */}
            <div 
              className="rounded-2xl p-6 shadow-lg"
              style={{ 
                background: 'white',
                border: '1px solid rgba(0,0,0,0.05)'
              }}
            >
              <h3 className="text-xl font-bold mb-1" style={{ color: '#1c1b1b' }}>Recent Activity</h3>
              <p className="text-sm mb-4" style={{ color: '#6e6e73' }}>Latest validation events</p>
              
              <div className="space-y-3">
                {[
                  { type: 'Bulk Check', emails: '12,320', time: '2 hours ago', status: 'success' },
                  { type: 'Single Validation', emails: '1', time: '3 hours ago', status: 'blocked' },
                  { type: 'Domain Check', emails: '450', time: '5 hours ago', status: 'success' },
                  { type: 'API Request', emails: '8,900', time: '6 hours ago', status: 'success' },
                ].map((activity, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl p-4 flex items-center gap-3 transition-all hover:shadow-md"
                    style={{
                      background: 'rgba(255,255,255,0.6)',
                      border: '1px solid rgba(0,0,0,0.05)',
                      animation: `fadeIn 0.5s ease-out ${idx * 0.1}s forwards`,
                      opacity: 0
                    }}
                  >
                    <div
                      className="p-2 rounded-xl"
                      style={{ background: `${activity.status === 'success' ? PALETTE[4] : PALETTE[2]}22` }}
                    >
                      {activity.status === 'success' ? (
                        <CheckCircle className="w-5 h-5" style={{ color: PALETTE[4] }} />
                      ) : (
                        <AlertCircle className="w-5 h-5" style={{ color: PALETTE[2] }} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold" style={{ color: '#1c1b1b' }}>{activity.type}</p>
                      <p className="text-xs" style={{ color: '#6e6e73' }}>
                        {activity.emails} emails · {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default Dashboard;