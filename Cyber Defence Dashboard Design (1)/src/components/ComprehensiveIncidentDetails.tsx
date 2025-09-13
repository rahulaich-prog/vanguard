import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  AlertTriangle, 
  Clock, 
  Shield, 
  Target, 
  Activity, 
  Network, 
  MessageSquare, 
  FileText, 
  Power, 
  Search,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Users,
  Globe,
  Server,
  Database,
  Zap
} from "lucide-react";
import { useState } from "react";

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

interface ComprehensiveIncidentDetailsProps {
  incident: Incident | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ComprehensiveIncidentDetails({ incident, isOpen, onClose }: ComprehensiveIncidentDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [analystNotes, setAnalystNotes] = useState("");

  if (!incident) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-[#FF4444]';
      case 'high': return 'bg-[#FA8B17]';
      case 'medium': return 'bg-[#FFA500]';
      default: return 'bg-[#6B7280]';
    }
  };

  const detailedIncidentData = {
    title: "CRITICAL: Unauthorized Network Access Detected",
    incidentId: "INC-2025-0911-001",
    detectedTime: "09:15 AM, Sept 11, 2025",
    affectedSystem: "DMZ Server Cluster Alpha-7",
    riskScore: 9.2,
    threatActor: "Potentially APT-29 (based on TTP matching)",
    
    timeline: [
      { time: "09:15:32", event: "Multiple failed SSH login attempts from IP 192.168.45.12", type: "detection" },
      { time: "09:16:18", event: "Brute force attack pattern detected (Neo4j correlation)", type: "analysis" },
      { time: "09:17:05", event: "Unusual outbound data transfer initiated (2.3GB)", type: "escalation" },
      { time: "09:18:42", event: "Firewall rules triggered, partial traffic blocked", type: "response" },
      { time: "09:19:15", event: "Automated isolation protocol engaged", type: "response" },
      { time: "09:20:33", event: "Security team notified, investigation started", type: "response" }
    ],

    threatIntelligence: {
      attackVector: "Network Intrusion → Lateral Movement",
      primaryAsset: "DMZ-Server-07",
      secondaryAssets: ["Internal Database connections", "User workstations"],
      compromiseIndicators: ["Suspicious processes", "Unusual network traffic", "Failed authentication logs"]
    },

    currentActions: [
      { action: "System isolated from network", status: "completed", type: "success" },
      { action: "Forensic analysis in progress", status: "in-progress", type: "warning" },
      { action: "Malware scan initiated", status: "in-progress", type: "warning" },
      { action: "Full system restoration pending", status: "pending", type: "error" }
    ],

    sopRecommendations: [
      { action: "Isolate affected systems", status: "completed", timeline: "Immediate" },
      { action: "Analyze logs and network traffic", status: "in-progress", timeline: "Short-term" },
      { action: "Patch vulnerabilities and update signatures", status: "pending", timeline: "Medium-term" },
      { action: "Review access controls and monitoring rules", status: "pending", timeline: "Long-term" }
    ],

    relatedIncidents: [
      { id: "INC-2025-0908-003", description: "Similar IP range, resolved", status: "Resolved", similarity: 85 },
      { id: "INC-2025-0905-012", description: "Same attack pattern, escalated", status: "Escalated", similarity: 92 },
      { id: "INC-2025-0902-007", description: "Related threat actor, contained", status: "Contained", similarity: 78 }
    ]
  };

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'detection': return <Eye className="h-4 w-4 text-[#0070C0]" />;
      case 'analysis': return <Search className="h-4 w-4 text-[#FFA500]" />;
      case 'escalation': return <AlertTriangle className="h-4 w-4 text-[#FF4444]" />;
      case 'response': return <Shield className="h-4 w-4 text-[#00C851]" />;
      default: return <Activity className="h-4 w-4 text-[#B0B8C4]" />;
    }
  };

  const getActionStatusIcon = (status: string, type: string) => {
    if (status === 'completed') return <CheckCircle className="h-4 w-4 text-[#00C851]" />;
    if (status === 'in-progress') return <Clock className="h-4 w-4 text-[#FA8B17]" />;
    return <XCircle className="h-4 w-4 text-[#FF4444]" />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] bg-[#243447] border border-[#1a2332] text-white overflow-hidden">
        {/* Incident Header */}
        <DialogHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-6 h-6 rounded-full ${getSeverityColor(incident.severity)} flex items-center justify-center`}>
                <AlertTriangle className="h-4 w-4 text-white" />
              </div>
              <div>
                <DialogTitle className="text-white text-2xl mb-1">
                  {detailedIncidentData.title}
                </DialogTitle>
                <DialogDescription className="flex items-center space-x-4 text-sm text-[#B0B8C4]">
                  <span>ID: {detailedIncidentData.incidentId}</span>
                  <span>•</span>
                  <span>Detected: {detailedIncidentData.detectedTime}</span>
                  <span>•</span>
                  <span>System: {detailedIncidentData.affectedSystem}</span>
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="bg-[#FF4444] border-[#FF4444] text-white">
                ACTIVE
              </Badge>
              <div className="text-right">
                <div className="text-sm text-[#B0B8C4]">Risk Score</div>
                <div className="text-xl font-bold text-[#FF4444]">{detailedIncidentData.riskScore}/10</div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 min-h-0">
          <TabsList className="bg-[#1a2332] border border-[#243447] mb-6">
            <TabsTrigger value="overview" className="text-[#B0B8C4] data-[state=active]:text-white data-[state=active]:bg-[#FA8B17]">
              Overview
            </TabsTrigger>
            <TabsTrigger value="timeline" className="text-[#B0B8C4] data-[state=active]:text-white data-[state=active]:bg-[#FA8B17]">
              Timeline
            </TabsTrigger>
            <TabsTrigger value="intelligence" className="text-[#B0B8C4] data-[state=active]:text-white data-[state=active]:bg-[#FA8B17]">
              Threat Intel
            </TabsTrigger>
            <TabsTrigger value="response" className="text-[#B0B8C4] data-[state=active]:text-white data-[state=active]:bg-[#FA8B17]">
              Response
            </TabsTrigger>
            <TabsTrigger value="collaboration" className="text-[#B0B8C4] data-[state=active]:text-white data-[state=active]:bg-[#FA8B17]">
              Collaboration
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 min-h-0">
            <TabsContent value="overview" className="mt-0 h-full">
              <ScrollArea className="h-[60vh]">
                <div className="grid grid-cols-3 gap-6">
                  {/* Left Column - Main Details */}
                  <div className="col-span-2 space-y-6">
                    {/* Threat Intelligence Panel */}
                    <Card className="bg-[#1a2332] border-[#243447] p-6">
                      <h3 className="text-white font-semibold mb-4 flex items-center">
                        <Target className="h-5 w-5 mr-2 text-[#FF4444]" />
                        Threat Intelligence
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <span className="text-[#B0B8C4] text-sm">Attack Vector</span>
                            <p className="text-white font-medium">{detailedIncidentData.threatIntelligence.attackVector}</p>
                          </div>
                          <div>
                            <span className="text-[#B0B8C4] text-sm">Threat Actor</span>
                            <p className="text-white font-medium">{detailedIncidentData.threatActor}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <span className="text-[#B0B8C4] text-sm">Primary Asset</span>
                            <p className="text-white font-medium flex items-center">
                              <Server className="h-4 w-4 mr-2 text-[#FA8B17]" />
                              {detailedIncidentData.threatIntelligence.primaryAsset}
                            </p>
                          </div>
                          <div>
                            <span className="text-[#B0B8C4] text-sm">Secondary Assets</span>
                            <div className="space-y-1 mt-1">
                              {detailedIncidentData.threatIntelligence.secondaryAssets.map((asset, index) => (
                                <p key={index} className="text-white text-sm flex items-center">
                                  <Database className="h-3 w-3 mr-2 text-[#0070C0]" />
                                  {asset}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Event Correlation Graph */}
                    <Card className="bg-[#1a2332] border-[#243447] p-6">
                      <h3 className="text-white font-semibold mb-4 flex items-center">
                        <Network className="h-5 w-5 mr-2 text-[#0070C0]" />
                        Event Correlation Graph
                      </h3>
                      <div className="bg-[#243447] rounded-lg p-4 h-48 flex items-center justify-center border border-[#1a2332]">
                        <div className="text-center">
                          <Network className="h-12 w-12 text-[#FA8B17] mx-auto mb-2" />
                          <p className="text-[#B0B8C4] text-sm">Interactive Neo4j-style correlation graph</p>
                          <p className="text-[#B0B8C4] text-xs mt-1">Showing relationships between compromised systems</p>
                        </div>
                      </div>
                    </Card>

                    {/* Related Incidents */}
                    <Card className="bg-[#1a2332] border-[#243447] p-6">
                      <h3 className="text-white font-semibold mb-4 flex items-center">
                        <Activity className="h-5 w-5 mr-2 text-[#FFA500]" />
                        Related Incidents
                      </h3>
                      <div className="space-y-3">
                        {detailedIncidentData.relatedIncidents.map((relatedIncident, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-[#243447] rounded border border-[#1a2332]">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3">
                                <span className="text-white font-mono text-sm">{relatedIncident.id}</span>
                                <Badge variant="outline" className={`${
                                  relatedIncident.status === 'Resolved' ? 'bg-[#00C851] border-[#00C851]' :
                                  relatedIncident.status === 'Escalated' ? 'bg-[#FF4444] border-[#FF4444]' :
                                  'bg-[#FA8B17] border-[#FA8B17]'
                                } text-white text-xs`}>
                                  {relatedIncident.status}
                                </Badge>
                                <span className="text-[#B0B8C4] text-sm">Similarity: {relatedIncident.similarity}%</span>
                              </div>
                              <p className="text-[#B0B8C4] text-sm mt-1">{relatedIncident.description}</p>
                            </div>
                            <Button size="sm" variant="outline" className="border-[#243447] text-[#B0B8C4] hover:bg-[#243447] hover:text-white">
                              View
                            </Button>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Right Column - Actions */}
                  <div className="space-y-6">
                    {/* Current Actions */}
                    <Card className="bg-[#1a2332] border-[#243447] p-6">
                      <h3 className="text-white font-semibold mb-4 flex items-center">
                        <Activity className="h-5 w-5 mr-2 text-[#FA8B17]" />
                        Current Actions
                      </h3>
                      <div className="space-y-3">
                        {detailedIncidentData.currentActions.map((action, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            {getActionStatusIcon(action.status, action.type)}
                            <span className="text-white text-sm flex-1">{action.action}</span>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Available Actions */}
                    <Card className="bg-[#1a2332] border-[#243447] p-6">
                      <h3 className="text-white font-semibold mb-4 flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-[#00C851]" />
                        Available Actions
                      </h3>
                      <div className="space-y-2">
                        <Button className="w-full bg-[#FF4444] hover:bg-[#e03d3d] text-white justify-start">
                          <Power className="h-4 w-4 mr-2" />
                          Emergency Shutdown
                        </Button>
                        <Button className="w-full bg-[#FA8B17] hover:bg-[#e07b0f] text-white justify-start">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Escalate to SOC Manager
                        </Button>
                        <Button className="w-full bg-[#0070C0] hover:bg-[#005a9e] text-white justify-start">
                          <Search className="h-4 w-4 mr-2" />
                          Run Deep Scan
                        </Button>
                        <Button className="w-full bg-[#00C851] hover:bg-[#00a644] text-white justify-start">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark as False Positive
                        </Button>
                      </div>
                    </Card>

                    {/* Compromise Indicators */}
                    <Card className="bg-[#1a2332] border-[#243447] p-6">
                      <h3 className="text-white font-semibold mb-4 flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2 text-[#FFA500]" />
                        Compromise Indicators
                      </h3>
                      <div className="space-y-2">
                        {detailedIncidentData.threatIntelligence.compromiseIndicators.map((indicator, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-[#FFA500] rounded-full"></div>
                            <span className="text-[#B0B8C4] text-sm">{indicator}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="timeline" className="mt-0 h-full">
              <ScrollArea className="h-[60vh]">
                <Card className="bg-[#1a2332] border-[#243447] p-6">
                  <h3 className="text-white font-semibold mb-6 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-[#FA8B17]" />
                    Incident Timeline
                  </h3>
                  <div className="space-y-4">
                    {detailedIncidentData.timeline.map((event, index) => (
                      <div key={index} className="flex items-start space-x-4 pb-4 border-b border-[#243447] last:border-b-0">
                        <div className="flex flex-col items-center">
                          <div className="p-2 bg-[#243447] rounded-full border border-[#1a2332]">
                            {getTimelineIcon(event.type)}
                          </div>
                          {index < detailedIncidentData.timeline.length - 1 && (
                            <div className="w-0.5 h-8 bg-[#243447] mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-[#FA8B17] font-mono text-sm font-medium">{event.time}</span>
                            <Badge variant="outline" className={`${
                              event.type === 'detection' ? 'bg-[#0070C0] border-[#0070C0]' :
                              event.type === 'analysis' ? 'bg-[#FFA500] border-[#FFA500]' :
                              event.type === 'escalation' ? 'bg-[#FF4444] border-[#FF4444]' :
                              'bg-[#00C851] border-[#00C851]'
                            } text-white text-xs`}>
                              {event.type.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-white leading-relaxed">{event.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="intelligence" className="mt-0 h-full">
              <ScrollArea className="h-[60vh]">
                <div className="grid grid-cols-2 gap-6">
                  <Card className="bg-[#1a2332] border-[#243447] p-6">
                    <h3 className="text-white font-semibold mb-4 flex items-center">
                      <Globe className="h-5 w-5 mr-2 text-[#0070C0]" />
                      Attack Attribution
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <span className="text-[#B0B8C4] text-sm">Threat Group</span>
                        <p className="text-white font-medium">APT-29 (Cozy Bear)</p>
                      </div>
                      <div>
                        <span className="text-[#B0B8C4] text-sm">Confidence Level</span>
                        <div className="flex items-center space-x-2 mt-1">
                          <Progress value={85} className="flex-1" />
                          <span className="text-white text-sm">85%</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[#B0B8C4] text-sm">TTPs Matched</span>
                        <p className="text-white font-medium">T1110, T1078, T1021</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-[#1a2332] border-[#243447] p-6">
                    <h3 className="text-white font-semibold mb-4 flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-[#FFA500]" />
                      Impact Assessment
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <span className="text-[#B0B8C4] text-sm">Data at Risk</span>
                        <p className="text-white font-medium">2.3 GB (Customer Database)</p>
                      </div>
                      <div>
                        <span className="text-[#B0B8C4] text-sm">Systems Affected</span>
                        <p className="text-white font-medium">3 Servers, 12 Workstations</p>
                      </div>
                      <div>
                        <span className="text-[#B0B8C4] text-sm">Business Impact</span>
                        <p className="text-white font-medium">Service Degradation</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="response" className="mt-0 h-full">
              <ScrollArea className="h-[60vh]">
                <Card className="bg-[#1a2332] border-[#243447] p-6">
                  <h3 className="text-white font-semibold mb-6 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-[#00C851]" />
                    SOP Recommendations
                  </h3>
                  <div className="space-y-4">
                    {detailedIncidentData.sopRecommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-[#243447] rounded border border-[#1a2332]">
                        <div className="flex items-center space-x-3">
                          {getActionStatusIcon(recommendation.status, 'default')}
                          <div>
                            <p className="text-white font-medium">{recommendation.action}</p>
                            <p className="text-[#B0B8C4] text-sm">Timeline: {recommendation.timeline}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="border-[#243447] text-[#B0B8C4] hover:bg-[#243447] hover:text-white">
                            View SOP
                          </Button>
                          {recommendation.status !== 'completed' && (
                            <Button size="sm" className="bg-[#FA8B17] hover:bg-[#e07b0f] text-white">
                              Execute
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="collaboration" className="mt-0 h-full">
              <ScrollArea className="h-[60vh]">
                <div className="grid grid-cols-2 gap-6">
                  <Card className="bg-[#1a2332] border-[#243447] p-6">
                    <h3 className="text-white font-semibold mb-4 flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-[#FA8B17]" />
                      Analyst Notes
                    </h3>
                    <Textarea
                      placeholder="Add your analysis notes and observations..."
                      value={analystNotes}
                      onChange={(e) => setAnalystNotes(e.target.value)}
                      className="bg-[#243447] border-[#1a2332] text-white placeholder-[#B0B8C4] min-h-32"
                    />
                    <Button className="mt-3 bg-[#FA8B17] hover:bg-[#e07b0f] text-white">
                      Save Notes
                    </Button>
                  </Card>

                  <Card className="bg-[#1a2332] border-[#243447] p-6">
                    <h3 className="text-white font-semibold mb-4 flex items-center">
                      <Users className="h-5 w-5 mr-2 text-[#0070C0]" />
                      Team Activity
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-2">
                        <div className="w-8 h-8 bg-[#FA8B17] rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">SA</span>
                        </div>
                        <div>
                          <p className="text-white text-sm">Security Analyst initiated containment</p>
                          <p className="text-[#B0B8C4] text-xs">2 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-2">
                        <div className="w-8 h-8 bg-[#0070C0] rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">IR</span>
                        </div>
                        <div>
                          <p className="text-white text-sm">IR Team assigned to incident</p>
                          <p className="text-[#B0B8C4] text-xs">5 minutes ago</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-[#1a2332]">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-[#B0B8C4]" />
              <span className="text-[#B0B8C4] text-sm">Assigned to: Security Team Alpha</span>
            </div>
            <Separator orientation="vertical" className="h-4 bg-[#243447]" />
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-[#B0B8C4]" />
              <span className="text-[#B0B8C4] text-sm">Last updated: 2 minutes ago</span>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="border-[#243447] text-[#B0B8C4] hover:bg-[#243447] hover:text-white">
              Close
            </Button>
            <Button className="bg-[#FA8B17] hover:bg-[#e07b0f] text-white">
              Update Incident
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}