import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Maximize2, Download } from "lucide-react";

export function ThreatCorrelationGraph() {
  return (
    <Card className="bg-[#243447] border-[#1a2332] p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg font-semibold">Event Correlation Analysis</h3>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="bg-transparent border-[#FA8B17] text-[#FA8B17] hover:bg-[#FA8B17] hover:text-white">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button size="sm" variant="outline" className="bg-transparent border-[#FA8B17] text-[#FA8B17] hover:bg-[#FA8B17] hover:text-white">
            <Maximize2 className="h-4 w-4 mr-1" />
            Expand
          </Button>
        </div>
      </div>
      
      {/* Simulated Graph Visualization */}
      <div className="relative h-64 bg-[#1a2332] rounded-lg border border-[#243447] overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#243447" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Graph Nodes and Connections */}
        <div className="absolute inset-0 p-4">
          {/* Central Node */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-[#FF4444] rounded-full flex items-center justify-center border-2 border-[#FF4444] shadow-lg shadow-[#FF4444]/50">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-xs text-white whitespace-nowrap">
              192.168.1.100
            </div>
          </div>
          
          {/* Connected Nodes */}
          <div className="absolute top-8 left-16">
            <div className="w-6 h-6 bg-[#FA8B17] rounded-full border border-[#FA8B17] shadow-md shadow-[#FA8B17]/30"></div>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-xs text-[#B0B8C4] whitespace-nowrap">
              Server-01
            </div>
          </div>
          
          <div className="absolute top-16 right-12">
            <div className="w-6 h-6 bg-[#0070C0] rounded-full border border-[#0070C0] shadow-md shadow-[#0070C0]/30"></div>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-xs text-[#B0B8C4] whitespace-nowrap">
              DB-Server
            </div>
          </div>
          
          <div className="absolute bottom-8 left-20">
            <div className="w-6 h-6 bg-[#FFA500] rounded-full border border-[#FFA500] shadow-md shadow-[#FFA500]/30"></div>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-xs text-[#B0B8C4] whitespace-nowrap">
              DMZ-Host
            </div>
          </div>
          
          <div className="absolute bottom-12 right-16">
            <div className="w-6 h-6 bg-[#00C851] rounded-full border border-[#00C851] shadow-md shadow-[#00C851]/30"></div>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-xs text-[#B0B8C4] whitespace-nowrap">
              Web-Server
            </div>
          </div>
          
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="redGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF4444" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#FF4444" stopOpacity="0.3"/>
              </linearGradient>
            </defs>
            
            {/* Lines connecting nodes */}
            <line x1="50%" y1="50%" x2="64px" y2="44px" stroke="url(#redGlow)" strokeWidth="2" opacity="0.8"/>
            <line x1="50%" y1="50%" x2="calc(100% - 48px)" y2="80px" stroke="#0070C0" strokeWidth="2" opacity="0.6"/>
            <line x1="50%" y1="50%" x2="92px" y2="calc(100% - 44px)" stroke="#FFA500" strokeWidth="2" opacity="0.6"/>
            <line x1="50%" y1="50%" x2="calc(100% - 64px)" y2="calc(100% - 60px)" stroke="#00C851" strokeWidth="2" opacity="0.6"/>
          </svg>
          
          {/* Animated Pulse Effect */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-12 h-12 bg-[#FF4444] rounded-full opacity-20 animate-ping"></div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="absolute bottom-2 left-2 text-xs text-[#B0B8C4]">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-[#FF4444] rounded-full"></div>
              <span>Critical</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-[#FA8B17] rounded-full"></div>
              <span>High</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-[#0070C0] rounded-full"></div>
              <span>Active</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}