import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { AlertTriangle, Clock, User, Globe, Shield, Target, Activity } from "lucide-react";

interface Incident {
  id: string;
  severity: "critical" | "high" | "medium";
  eventType: string;
  target: string;
  time: string;
  status: string;
  statusColor: string;
  description?: string;
  sourceIP?: string;
  attackVector?: string;
  affectedSystems?: string[];
  timeline?: Array<{ time: string; event: string; }>;
}

interface IncidentDetailsModalProps {
  incident: Incident | null;
  isOpen: boolean;
  onClose: () => void;
}

export function IncidentDetailsModal({ incident, isOpen, onClose }: IncidentDetailsModalProps) {
  if (!incident) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-[#FF4444]';
      case 'high': return 'bg-[#FA8B17]';
      case 'medium': return 'bg-[#FFA500]';
      default: return 'bg-[#6B7280]';
    }
  };

  const mockDetails = {
    description: "Multiple failed login attempts detected from suspicious IP addresses targeting administrative accounts.",
    sourceIP: "192.168.1.100",
    attackVector: "Brute Force",
    confidence: 95,
    affectedSystems: ["Server-01", "Database-03", "Web-Application"],
    timeline: [
      { time: "14:30", event: "Initial detection - Multiple failed logins" },
      { time: "14:31", event: "IP address identified as suspicious" },
      { time: "14:32", event: "Automatic blocking initiated" },
      { time: "14:33", event: "Security team notified" },
      { time: "14:35", event: "Investigation in progress" }
    ],
    indicators: [
      "Failed authentication attempts: 47",
      "Source country: Unknown/VPN",
      "User agents: Multiple suspicious patterns",
      "Request frequency: 15 attempts/minute"
    ],
    recommendations: [
      "Block source IP immediately",
      "Reset affected user passwords",
      "Enable MFA for admin accounts",
      "Monitor for lateral movement"
    ]
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-[#243447] border border-[#1a2332] text-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full ${getSeverityColor(incident.severity)}`}></div>
              <DialogTitle className="text-white text-xl">
                Incident #{incident.id} - {incident.eventType}
              </DialogTitle>
            </div>
            <Badge variant="outline" className={`${incident.statusColor} border-current`}>
              {incident.status}
            </Badge>
          </div>
          <DialogDescription className="text-[#B0B8C4]">
            Target: {incident.target} • Detected at {incident.time}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-[#1a2332] border border-[#243447]">
            <TabsTrigger value="overview" className="text-[#B0B8C4] data-[state=active]:text-white data-[state=active]:bg-[#FA8B17]">
              Overview
            </TabsTrigger>
            <TabsTrigger value="timeline" className="text-[#B0B8C4] data-[state=active]:text-white data-[state=active]:bg-[#FA8B17]">
              Timeline
            </TabsTrigger>
            <TabsTrigger value="analysis" className="text-[#B0B8C4] data-[state=active]:text-white data-[state=active]:bg-[#FA8B17]">
              Analysis
            </TabsTrigger>
            <TabsTrigger value="response" className="text-[#B0B8C4] data-[state=active]:text-white data-[state=active]:bg-[#FA8B17]">
              Response
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-[#1a2332] border-[#243447] p-4">
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-[#FA8B17]" />
                  Threat Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div><span className="text-[#B0B8C4]">Severity:</span> <span className="text-white capitalize">{incident.severity}</span></div>
                  <div><span className="text-[#B0B8C4]">Source IP:</span> <span className="text-white font-mono">{mockDetails.sourceIP}</span></div>
                  <div><span className="text-[#B0B8C4]">Attack Vector:</span> <span className="text-white">{mockDetails.attackVector}</span></div>
                  <div><span className="text-[#B0B8C4]">Confidence:</span> <span className="text-[#00C851]">{mockDetails.confidence}%</span></div>
                </div>
              </Card>

              <Card className="bg-[#1a2332] border-[#243447] p-4">
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-[#0070C0]" />
                  Affected Systems
                </h3>
                <div className="space-y-2">
                  {mockDetails.affectedSystems.map((system, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#FF4444] rounded-full"></div>
                      <span className="text-white font-mono text-sm">{system}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card className="bg-[#1a2332] border-[#243447] p-4">
              <h3 className="text-white font-semibold mb-3">Description</h3>
              <p className="text-[#B0B8C4] leading-relaxed">{mockDetails.description}</p>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <Card className="bg-[#1a2332] border-[#243447] p-4">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-[#FA8B17]" />
                Event Timeline
              </h3>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {mockDetails.timeline.map((event, index) => (
                    <div key={index} className="flex items-start space-x-3 pb-3 border-b border-[#243447] last:border-b-0">
                      <div className="w-2 h-2 bg-[#FA8B17] rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-[#B0B8C4] font-mono text-sm">{event.time}</span>
                        </div>
                        <p className="text-white text-sm">{event.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <Card className="bg-[#1a2332] border-[#243447] p-4">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-[#0070C0]" />
                Threat Indicators
              </h3>
              <div className="space-y-2">
                {mockDetails.indicators.map((indicator, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#FFA500] rounded-full"></div>
                    <span className="text-[#B0B8C4] text-sm">{indicator}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="response" className="space-y-4">
            <Card className="bg-[#1a2332] border-[#243447] p-4">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-[#00C851]" />
                Recommended Actions
              </h3>
              <div className="space-y-3">
                {mockDetails.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[#243447] rounded border border-[#1a2332]">
                    <span className="text-white text-sm">{recommendation}</span>
                    <Button size="sm" className="bg-[#FA8B17] hover:bg-[#e07b0f] text-white">
                      Execute
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between pt-4 border-t border-[#1a2332]">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-[#B0B8C4]" />
            <span className="text-[#B0B8C4] text-sm">Assigned to: Security Team Alpha</span>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose} className="border-[#243447] text-[#B0B8C4] hover:bg-[#243447] hover:text-white">
              Close
            </Button>
            <Button className="bg-[#FA8B17] hover:bg-[#e07b0f] text-white">
              Take Action
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}