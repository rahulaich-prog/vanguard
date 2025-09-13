import { useState } from "react";
import { InteractiveNavigationBar } from "./InteractiveNavigationBar";
import { ThreatSummaryCards } from "./ThreatSummaryCards";
import { EnhancedLiveIncidentsTable } from "./EnhancedLiveIncidentsTable";
import { SystemStatusPanel } from "./SystemStatusPanel";
import { NotificationsPanel } from "./NotificationsPanel";
import { QuickActionsPanel } from "./QuickActionsPanel";
import { ThreatCorrelationGraph } from "./ThreatCorrelationGraph";
import { AnalyticsCharts } from "./AnalyticsCharts";
import { ComprehensiveIncidentDetails } from "./ComprehensiveIncidentDetails";
import { SOPReferencePage } from "./SOPReferencePage";
import { SystemConfigurationPage } from "./SystemConfigurationPage";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Bell, AlertTriangle, Info, CheckCircle, Search, Clock, FileText } from "lucide-react";

interface Incident {
  id: string;
  severity: "critical" | "high" | "medium" | "low";
  eventType: string;
  target: string;
  time: string;
  status: string;
  statusColor: string;
  description?: string;
  sourceIP?: string;
  attackVector?: string;
}

interface Notification {
  id: string;
  type: 'critical' | 'high' | 'medium' | 'success';
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "critical",
    message: "APT group signature detected - Server Farm Alpha",
    time: "14:35",
    read: false
  },
  {
    id: "2",
    type: "high",
    message: "Unusual network traffic pattern - DMZ segment",
    time: "14:33",
    read: false
  },
  {
    id: "3",
    type: "success",
    message: "Automated response successful - Blocked 15 IPs",
    time: "14:28",
    read: true
  }
];

export function InteractiveApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleIncidentClick = (incident: Incident) => {
    setSelectedIncident(incident);
    setIsIncidentModalOpen(true);
  };

  const handleNotificationClick = () => {
    setIsNotificationPanelOpen(true);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-[#FF4444]" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-[#FA8B17]" />;
      case 'medium':
        return <Info className="h-4 w-4 text-[#FFA500]" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-[#00C851]" />;
      default:
        return <Info className="h-4 w-4 text-[#0070C0]" />;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            {/* Threat Summary Cards */}
            <ThreatSummaryCards />
            
            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-6">
              {/* Left Column - Main Content */}
              <div className="col-span-8 space-y-6">
                <EnhancedLiveIncidentsTable onIncidentClick={handleIncidentClick} />
                <ThreatCorrelationGraph />
              </div>
              
              {/* Right Column - Status Panels */}
              <div className="col-span-4 space-y-6">
                <SystemStatusPanel />
                <NotificationsPanel />
                <QuickActionsPanel />
              </div>
            </div>
            
            {/* Bottom Analytics Row */}
            <AnalyticsCharts />
          </>
        );
      case 'incidents':
        return (
          <div className="space-y-6">
            {/* Enhanced Live Incidents Table with full functionality */}
            <EnhancedLiveIncidentsTable onIncidentClick={handleIncidentClick} />
            
            {/* Quick Stats Cards */}
            <div className="grid grid-cols-4 gap-4">
              <Card className="bg-[#243447] border border-[#1a2332] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#B0B8C4] text-sm">Critical Incidents</p>
                    <p className="text-white text-2xl font-semibold">3</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-[#FF4444]" />
                </div>
              </Card>
              <Card className="bg-[#243447] border border-[#1a2332] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#B0B8C4] text-sm">Active Investigations</p>
                    <p className="text-white text-2xl font-semibold">7</p>
                  </div>
                  <Search className="h-8 w-8 text-[#FA8B17]" />
                </div>
              </Card>
              <Card className="bg-[#243447] border border-[#1a2332] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#B0B8C4] text-sm">Resolved Today</p>
                    <p className="text-white text-2xl font-semibold">12</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-[#00C851]" />
                </div>
              </Card>
              <Card className="bg-[#243447] border border-[#1a2332] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#B0B8C4] text-sm">Avg Response Time</p>
                    <p className="text-white text-2xl font-semibold">4.2m</p>
                  </div>
                  <Clock className="h-8 w-8 text-[#0070C0]" />
                </div>
              </Card>
            </div>

            {/* Incident Management Actions */}
            <div className="bg-[#243447] border border-[#1a2332] rounded-lg p-6">
              <h2 className="text-white text-xl font-semibold mb-4">Incident Management Actions</h2>
              <div className="grid grid-cols-3 gap-4">
                <Button className="bg-[#FA8B17] hover:bg-[#e07b0f] text-white h-12 justify-start">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Create New Incident
                </Button>
                <Button className="bg-[#0070C0] hover:bg-[#005a9e] text-white h-12 justify-start">
                  <Search className="h-5 w-5 mr-2" />
                  Search Incidents
                </Button>
                <Button className="bg-[#00C851] hover:bg-[#00a644] text-white h-12 justify-start">
                  <FileText className="h-5 w-5 mr-2" />
                  Generate Report
                </Button>
              </div>
              <p className="text-[#B0B8C4] text-sm mt-4">
                Click on any incident in the table above to open the comprehensive incident management interface with detailed timeline, threat intelligence, and response actions.
              </p>
            </div>
          </div>
        );
      case 'sop':
        return <SOPReferencePage />;
      case 'analytics':
        return (
          <div className="space-y-6">
            <AnalyticsCharts />
            <div className="bg-[#243447] border border-[#1a2332] rounded-lg p-8 text-center">
              <h2 className="text-white text-2xl font-semibold mb-2">Advanced Threat Analytics</h2>
              <p className="text-[#B0B8C4] mb-4">Deep dive into threat patterns and security metrics</p>
              <Button className="bg-[#FA8B17] hover:bg-[#e07b0f] text-white">
                Open Advanced Analytics
              </Button>
            </div>
          </div>
        );
      case 'config':
        return <SystemConfigurationPage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#1a2332]">
      <InteractiveNavigationBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        notificationCount={unreadNotifications}
        onNotificationClick={handleNotificationClick}
      />
      
      <main className="p-6 space-y-6">
        {renderTabContent()}
      </main>

      {/* Incident Details Modal */}
      <ComprehensiveIncidentDetails
        incident={selectedIncident}
        isOpen={isIncidentModalOpen}
        onClose={() => {
          setIsIncidentModalOpen(false);
          setSelectedIncident(null);
        }}
      />

      {/* Notifications Panel Modal */}
      <Dialog open={isNotificationPanelOpen} onOpenChange={setIsNotificationPanelOpen}>
        <DialogContent className="max-w-md bg-[#243447] border border-[#1a2332] text-white">
          <DialogHeader>
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-[#FA8B17]" />
              <DialogTitle className="text-white">Notifications</DialogTitle>
              {unreadNotifications > 0 && (
                <Badge className="bg-[#FF4444] text-white border-0">
                  {unreadNotifications}
                </Badge>
              )}
            </div>
            <DialogDescription className="text-[#B0B8C4]">
              Recent security alerts and system updates
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded border transition-colors cursor-pointer ${
                  notification.read 
                    ? 'bg-[#1a2332] border-[#243447] opacity-60' 
                    : 'bg-[#1a2332] border-[#FA8B17] border-l-4'
                }`}
                onClick={() => markNotificationAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-[#B0B8C4] text-xs font-mono">[{notification.time}]</span>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-[#FA8B17] rounded-full"></div>
                      )}
                    </div>
                    <p className="text-white text-sm leading-relaxed">{notification.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-4 border-t border-[#1a2332]">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setNotifications(prev => prev.map(n => ({ ...n, read: true })));
              }}
              className="border-[#243447] text-[#B0B8C4] hover:bg-[#243447] hover:text-white"
            >
              Mark All Read
            </Button>
            <Button
              size="sm"
              onClick={() => setIsNotificationPanelOpen(false)}
              className="bg-[#FA8B17] hover:bg-[#e07b0f] text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}