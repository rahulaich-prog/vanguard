import { Bell, Clock, User, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function NavigationBar() {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit',
    hour12: false 
  });
  
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <nav className="h-20 bg-[#1a2332] border-b border-[#243447] flex items-center justify-between px-6">
      {/* Left Section - Logo */}
      <div className="flex items-center space-x-3">
        <Shield className="h-8 w-8 text-[#FA8B17]" />
        <div>
          <h1 className="text-white font-bold text-xl">VANGUARD</h1>
          <p className="text-[#B0B8C4] text-sm">Cyber Defence Hub</p>
        </div>
      </div>

      {/* Center Section - Navigation */}
      <div className="flex items-center space-x-8">
        <Button variant="ghost" className="text-[#FA8B17] border-b-2 border-[#FA8B17] rounded-none px-4 py-2 bg-transparent hover:bg-[#243447]">
          Home
        </Button>
        <Button variant="ghost" className="text-[#B0B8C4] hover:text-white hover:bg-[#243447] px-4 py-2">
          Incident Details
        </Button>
        <Button variant="ghost" className="text-[#B0B8C4] hover:text-white hover:bg-[#243447] px-4 py-2">
          SOP Reference
        </Button>
        <Button variant="ghost" className="text-[#B0B8C4] hover:text-white hover:bg-[#243447] px-4 py-2">
          Threat Analytics
        </Button>
        <Button variant="ghost" className="text-[#B0B8C4] hover:text-white hover:bg-[#243447] px-4 py-2">
          System Configuration
        </Button>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center space-x-4">
        <div className="text-right text-sm">
          <div className="text-white font-mono">{currentTime}</div>
          <div className="text-[#B0B8C4]">{currentDate}</div>
        </div>
        <div className="relative">
          <Bell className="h-6 w-6 text-[#B0B8C4] cursor-pointer hover:text-white" />
          <Badge className="absolute -top-2 -right-2 bg-[#FF4444] text-white border-0 h-5 w-5 p-0 flex items-center justify-center text-xs">
            3
          </Badge>
        </div>
        <div className="w-8 h-8 bg-[#FA8B17] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#e07b0f]">
          <User className="h-5 w-5 text-white" />
        </div>
      </div>
    </nav>
  );
}