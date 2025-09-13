import { Card } from "./ui/card";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";

const severityData = [
  { name: 'Critical', value: 12, color: '#FF4444' },
  { name: 'High', value: 21, color: '#FA8B17' },
  { name: 'Medium', value: 34, color: '#FFA500' },
  { name: 'Low', value: 18, color: '#00C851' }
];

const timelineData = [
  { time: '10:00', attacks: 5, blocked: 8 },
  { time: '11:00', attacks: 8, blocked: 12 },
  { time: '12:00', attacks: 12, blocked: 15 },
  { time: '13:00', attacks: 15, blocked: 18 },
  { time: '14:00', attacks: 22, blocked: 25 },
  { time: '15:00', attacks: 18, blocked: 20 }
];

const responseData = [
  { type: 'Auto Block', time: 0.5 },
  { type: 'Manual Review', time: 15.2 },
  { type: 'Investigation', time: 45.8 },
  { type: 'Remediation', time: 120.5 }
];

const geographicData = [
  { country: 'China', threats: 45 },
  { country: 'Russia', threats: 32 },
  { country: 'USA', threats: 28 },
  { country: 'Brazil', threats: 15 },
  { country: 'India', threats: 12 }
];

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-4 gap-6">
      {/* Threats by Severity */}
      <Card className="bg-[#243447] border-[#1a2332] p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Threats by Severity</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={severityData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
              >
                {severityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-1 mt-2">
          {severityData.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-[#B0B8C4]">{item.name}</span>
              </div>
              <span className="text-white font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Attack Vectors Timeline */}
      <Card className="bg-[#243447] border-[#1a2332] p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Attack Timeline</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2332" />
              <XAxis dataKey="time" stroke="#B0B8C4" fontSize={12} />
              <YAxis stroke="#B0B8C4" fontSize={12} />
              <Line 
                type="monotone" 
                dataKey="attacks" 
                stroke="#FF4444" 
                strokeWidth={2}
                dot={{ fill: '#FF4444', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="blocked" 
                stroke="#00C851" 
                strokeWidth={2}
                dot={{ fill: '#00C851', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center space-x-4 mt-2 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#FF4444]"></div>
            <span className="text-[#B0B8C4]">Attacks</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#00C851]"></div>
            <span className="text-[#B0B8C4]">Blocked</span>
          </div>
        </div>
      </Card>

      {/* Response Time Metrics */}
      <Card className="bg-[#243447] border-[#1a2332] p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Response Times</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={responseData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2332" />
              <XAxis type="number" stroke="#B0B8C4" fontSize={12} />
              <YAxis dataKey="type" type="category" stroke="#B0B8C4" fontSize={10} width={80} />
              <Bar dataKey="time" fill="#FA8B17" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center mt-2">
          <span className="text-[#B0B8C4] text-xs">Average Response Time (minutes)</span>
        </div>
      </Card>

      {/* Geographic Threat Map */}
      <Card className="bg-[#243447] border-[#1a2332] p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Geographic Threats</h3>
        <div className="h-48 relative">
          {/* Simplified world map representation */}
          <div className="w-full h-32 bg-[#1a2332] rounded-lg border border-[#243447] relative overflow-hidden mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-[#6B7280] text-sm">🌍 Global Threat Map</div>
            </div>
            {/* Threat indicators */}
            <div className="absolute top-4 left-8 w-3 h-3 bg-[#FF4444] rounded-full animate-pulse"></div>
            <div className="absolute top-6 left-16 w-2 h-2 bg-[#FA8B17] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-8 right-12 w-2 h-2 bg-[#FFA500] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-6 left-12 w-2 h-2 bg-[#0070C0] rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute bottom-4 right-8 w-2 h-2 bg-[#FA8B17] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          <div className="space-y-1">
            {geographicData.slice(0, 4).map((item) => (
              <div key={item.country} className="flex items-center justify-between text-sm">
                <span className="text-[#B0B8C4]">{item.country}</span>
                <span className="text-white font-medium">{item.threats}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}