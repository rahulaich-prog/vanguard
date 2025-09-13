import { Bell, Clock, User, Shield, Settings, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState, useEffect } from "react";

interface NavigationBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  notificationCount: number;
  onNotificationClick: () => void;
}

export function InteractiveNavigationBar({ 
  activeTab, 
  onTabChange, 
  notificationCount,
  onNotificationClick 
}: NavigationBarProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'incidents', label: 'Incident Details' },
    { id: 'sop', label: 'SOP Reference' },
    { id: 'analytics', label: 'Threat Analytics' },
    { id: 'config', label: 'System Configuration' }
  ];

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
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 transition-all duration-200 ${
              activeTab === tab.id
                ? 'text-[#FA8B17] border-b-2 border-[#FA8B17] rounded-none bg-transparent'
                : 'text-[#B0B8C4] hover:text-white hover:bg-[#243447] rounded-md'
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center space-x-4">
        <div className="text-right text-sm">
          <div className="text-white font-mono">
            {currentTime.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              second: '2-digit',
              hour12: false 
            })}
          </div>
          <div className="text-[#B0B8C4]">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
        
        {/* Notification Bell */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onNotificationClick}
            className="p-2 hover:bg-[#243447]"
          >
            <Bell className="h-6 w-6 text-[#B0B8C4] hover:text-white" />
            {notificationCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-[#FF4444] text-white border-0 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {notificationCount}
              </Badge>
            )}
          </Button>
        </div>
        
        {/* User Menu */}
        <Popover open={userMenuOpen} onOpenChange={setUserMenuOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 bg-[#FA8B17] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#e07b0f] p-0"
            >
              <User className="h-5 w-5 text-white" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 bg-[#243447] border border-[#1a2332] p-2" align="end">
            <div className="space-y-1">
              <div className="px-3 py-2 border-b border-[#1a2332]">
                <p className="text-white font-medium">Admin User</p>
                <p className="text-[#B0B8C4] text-sm">admin@vanguard.com</p>
              </div>
              <Button variant="ghost" className="w-full justify-start text-[#B0B8C4] hover:text-white hover:bg-[#1a2332]">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start text-[#B0B8C4] hover:text-white hover:bg-[#1a2332]">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
}