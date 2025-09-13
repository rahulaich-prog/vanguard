import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { 
  Search, 
  Filter, 
  AlertTriangle, 
  Shield, 
  Network, 
  Monitor, 
  Target, 
  Activity, 
  FileText, 
  Play, 
  Edit, 
  Eye, 
  Clock, 
  CheckCircle, 
  Pause, 
  Plus,
  BarChart3,
  Settings,
  Users,
  Database,
  Wifi,
  Smartphone,
  Globe,
  Zap,
  Server
} from "lucide-react";

interface SOP {
  id: string;
  title: string;
  sopId: string;
  category: string;
  priority: "critical" | "high" | "medium" | "low";
  status: "active" | "under-review" | "draft";
  lastUpdated: string;
  estimatedTime: string;
  owner: string;
  steps: Array<{
    phase: string;
    timeframe: string;
    steps: Array<{
      id: number;
      description: string;
      completed: boolean;
      inProgress: boolean;
    }>;
  }>;
}

interface ActiveExecution {
  sopId: string;
  title: string;
  status: "in-progress" | "completed" | "paused";
  currentStep: string;
  startTime: string;
  progress: number;
}

export function SOPReferencePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedSOP, setSelectedSOP] = useState<SOP | null>(null);

  const featuredSOPs: SOP[] = [
    {
      id: "1",
      title: "Critical Network Breach Response",
      sopId: "SOP-001-CRITICAL",
      category: "Critical Incident Response",
      priority: "critical",
      status: "active",
      lastUpdated: "Sept 10, 2025",
      estimatedTime: "45-60 minutes",
      owner: "SOC Team Alpha",
      steps: [
        {
          phase: "IMMEDIATE RESPONSE",
          timeframe: "0-15 mins",
          steps: [
            { id: 1, description: "Validate threat indicators and scope", completed: true, inProgress: false },
            { id: 2, description: "Isolate affected systems from network", completed: false, inProgress: true },
            { id: 3, description: "Preserve forensic evidence", completed: false, inProgress: false },
            { id: 4, description: "Notify incident commander", completed: false, inProgress: false }
          ]
        }
      ]
    },
    {
      id: "2",
      title: "Automated Malware Isolation Protocol",
      sopId: "SOP-015-HIGH",
      category: "Endpoint Protection",
      priority: "high",
      status: "under-review",
      lastUpdated: "Sept 8, 2025",
      estimatedTime: "30-45 minutes",
      owner: "Security Team Beta",
      steps: []
    },
    {
      id: "3",
      title: "Sensitive Data Exfiltration Response",
      sopId: "SOP-032-CRITICAL",
      category: "Data Protection",
      priority: "critical",
      status: "active",
      lastUpdated: "Sept 5, 2025",
      estimatedTime: "60-90 minutes",
      owner: "Data Security Team",
      steps: []
    }
  ];

  const sopCategories = [
    {
      name: "CRITICAL INCIDENT RESPONSE",
      color: "text-[#FF4444]",
      icon: AlertTriangle,
      sops: [
        "Advanced Persistent Threat (APT) Response",
        "Zero-Day Exploit Containment",
        "Data Breach Emergency Protocol",
        "System Compromise Recovery",
        "Command & Control Communication Disruption"
      ]
    },
    {
      name: "NETWORK SECURITY",
      color: "text-[#FA8B17]",
      icon: Network,
      sops: [
        "DDoS Attack Mitigation",
        "Firewall Rule Emergency Updates",
        "Network Segmentation Protocols",
        "VPN Security Breach Response",
        "DNS Poisoning Countermeasures"
      ]
    },
    {
      name: "ENDPOINT PROTECTION",
      color: "text-[#FFA500]",
      icon: Monitor,
      sops: [
        "Malware Detection & Removal",
        "Ransomware Response Procedures",
        "USB Device Security Protocols",
        "Workstation Compromise Isolation",
        "Mobile Device Security Response"
      ]
    },
    {
      name: "THREAT INTELLIGENCE",
      color: "text-[#0070C0]",
      icon: Target,
      sops: [
        "IOC Integration Procedures",
        "Threat Feed Analysis Protocol",
        "Attribution Analysis Guidelines",
        "Threat Hunting Methodologies",
        "Intelligence Sharing Protocols"
      ]
    }
  ];

  const activeExecutions: ActiveExecution[] = [
    {
      sopId: "SOP-001",
      title: "Network Breach Response",
      status: "in-progress",
      currentStep: "Step 4/12",
      startTime: "09:15",
      progress: 33
    },
    {
      sopId: "SOP-027",
      title: "Malware Containment",
      status: "completed",
      currentStep: "Completed Successfully",
      startTime: "08:42",
      progress: 100
    },
    {
      sopId: "SOP-045",
      title: "User Account Review",
      status: "paused",
      currentStep: "Paused (Awaiting Input)",
      startTime: "07:30",
      progress: 67
    }
  ];

  const recentActivity = [
    { time: "10:15", action: "SOP-032 executed by analyst.smith" },
    { time: "09:45", action: "SOP-018 completed successfully" },
    { time: "09:30", action: "SOP-001 initiated (auto-trigger from incident)" },
    { time: "08:55", action: "SOP-027 updated with new IOCs" },
    { time: "08:20", action: "SOP-067 approved by security manager" }
  ];

  const integrationStatus = [
    { system: "SIEM Platform (Splunk)", status: "connected", icon: Database },
    { system: "EDR Solution (CrowdStrike)", status: "connected", icon: Shield },
    { system: "Ticketing System (ServiceNow)", status: "connected", icon: FileText },
    { system: "Vulnerability Scanner (Nessus)", status: "limited", icon: Search },
    { system: "Network Monitoring (SolarWinds)", status: "offline", icon: Wifi }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-[#00C851] border-[#00C851]';
      case 'under-review': return 'bg-[#FFA500] border-[#FFA500]';
      case 'draft': return 'bg-[#6B7280] border-[#6B7280]';
      default: return 'bg-[#6B7280] border-[#6B7280]';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-[#FF4444]';
      case 'high': return 'text-[#FA8B17]';
      case 'medium': return 'text-[#FFA500]';
      default: return 'text-[#B0B8C4]';
    }
  };

  const getExecutionStatusIcon = (status: string) => {
    switch (status) {
      case 'in-progress': return <Clock className="h-4 w-4 text-[#FA8B17]" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-[#00C851]" />;
      case 'paused': return <Pause className="h-4 w-4 text-[#FFA500]" />;
      default: return <Activity className="h-4 w-4 text-[#B0B8C4]" />;
    }
  };

  const getIntegrationStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4 text-[#00C851]" />;
      case 'limited': return <AlertTriangle className="h-4 w-4 text-[#FFA500]" />;
      case 'offline': return <AlertTriangle className="h-4 w-4 text-[#FF4444]" />;
      default: return <Activity className="h-4 w-4 text-[#B0B8C4]" />;
    }
  };

  const filters = [
    { id: "all", label: "All SOPs" },
    { id: "critical", label: "Critical" },
    { id: "high", label: "High Priority" },
    { id: "medium", label: "Medium" },
    { id: "incident", label: "Incident Response" },
    { id: "preventive", label: "Preventive" }
  ];

  return (
    <div className="space-y-6">
      {/* SOP Library Header */}
      <div className="bg-[#243447] border border-[#1a2332] rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-white text-2xl font-semibold mb-2">Standard Operating Procedures</h1>
            <p className="text-[#B0B8C4]">Comprehensive security response protocols and procedures</p>
          </div>
          <div className="text-right">
            <div className="text-[#B0B8C4] text-sm">Quick Stats</div>
            <div className="text-white">142 Total SOPs | 8 Recently Updated | 3 Pending Review</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#B0B8C4]" />
            <Input
              placeholder="Search SOPs by name, category, or threat type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#1a2332] border-[#243447] text-white placeholder-[#B0B8C4]"
            />
          </div>
          <Button variant="outline" className="border-[#243447] text-[#B0B8C4] hover:bg-[#243447] hover:text-white">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter.id)}
              className={
                selectedFilter === filter.id
                  ? "bg-[#FA8B17] hover:bg-[#e07b0f] text-white"
                  : "border-[#243447] text-[#B0B8C4] hover:bg-[#243447] hover:text-white"
              }
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured/Critical SOPs */}
      <div className="grid grid-cols-3 gap-6">
        {featuredSOPs.map((sop) => (
          <Card key={sop.id} className="bg-[#243447] border-[#1a2332] p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">{sop.title}</h3>
                <p className="text-[#B0B8C4] font-mono text-sm">{sop.sopId}</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${sop.priority === 'critical' ? 'bg-[#FF4444]' : 'bg-[#FA8B17]'}`}></div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-[#B0B8C4] text-sm">Status:</span>
                <Badge variant="outline" className={`${getStatusColor(sop.status)} text-white text-xs`}>
                  {sop.status === 'active' ? '✅ Active' : 
                   sop.status === 'under-review' ? '🟡 Under Review' : '📝 Draft'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#B0B8C4] text-sm">Last Updated:</span>
                <span className="text-white text-sm">{sop.lastUpdated}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="flex-1 border-[#243447] text-[#B0B8C4] hover:bg-[#243447] hover:text-white">
                <Eye className="h-3 w-3 mr-1" />
                View
              </Button>
              <Button size="sm" className="flex-1 bg-[#FA8B17] hover:bg-[#e07b0f] text-white">
                <Play className="h-3 w-3 mr-1" />
                Execute
              </Button>
              <Button size="sm" variant="outline" className="border-[#243447] text-[#B0B8C4] hover:bg-[#243447] hover:text-white">
                <Edit className="h-3 w-3" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - SOP Categories */}
        <div className="col-span-8 space-y-6">
          {/* SOP Categories Grid */}
          <Card className="bg-[#243447] border-[#1a2332] p-6">
            <h2 className="text-white text-xl font-semibold mb-6">SOP Categories</h2>
            <div className="grid grid-cols-2 gap-6">
              {sopCategories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <div key={index} className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <IconComponent className={`h-5 w-5 ${category.color}`} />
                      <h3 className={`font-semibold ${category.color}`}>{category.name}</h3>
                    </div>
                    <div className="space-y-2">
                      {category.sops.map((sopName, sopIndex) => (
                        <div
                          key={sopIndex}
                          className="flex items-center justify-between p-3 bg-[#1a2332] rounded border border-[#243447] hover:border-[#FA8B17] transition-colors cursor-pointer"
                          onClick={() => {
                            // Set mock selected SOP data
                            setSelectedSOP({
                              id: `${index}-${sopIndex}`,
                              title: sopName,
                              sopId: `SOP-${String(index * 10 + sopIndex).padStart(3, '0')}`,
                              category: category.name,
                              priority: index === 0 ? 'critical' : index === 1 ? 'high' : 'medium',
                              status: 'active',
                              lastUpdated: 'Sept 10, 2025',
                              estimatedTime: '30-45 minutes',
                              owner: 'SOC Team Alpha',
                              steps: featuredSOPs[0].steps
                            });
                          }}
                        >
                          <span className="text-white text-sm">{sopName}</span>
                          <Button size="sm" variant="outline" className="border-[#243447] text-[#B0B8C4] hover:bg-[#243447] hover:text-white">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Execution Tracking */}
          <Card className="bg-[#243447] border-[#1a2332] p-6">
            <h2 className="text-white text-xl font-semibold mb-6">Active SOP Executions</h2>
            <div className="space-y-4">
              {activeExecutions.map((execution, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#1a2332] rounded border border-[#243447]">
                  <div className="flex items-center space-x-4">
                    {getExecutionStatusIcon(execution.status)}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-mono text-sm">{execution.sopId}</span>
                        <span className="text-[#B0B8C4]">|</span>
                        <span className="text-white text-sm">{execution.title}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-[#B0B8C4] text-xs">{execution.currentStep}</span>
                        <span className="text-[#B0B8C4]">|</span>
                        <span className="text-[#B0B8C4] text-xs">Started: {execution.startTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24">
                      <Progress value={execution.progress} className="h-2" />
                    </div>
                    <span className="text-[#B0B8C4] text-sm">{execution.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* SOP Effectiveness Metrics */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="bg-[#243447] border-[#1a2332] p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00C851] mb-1">94.2%</div>
                <div className="text-[#B0B8C4] text-sm">Success Rate</div>
                <div className="text-[#B0B8C4] text-xs">(last 30 days)</div>
              </div>
            </Card>
            <Card className="bg-[#243447] border-[#1a2332] p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FA8B17] mb-1">38m</div>
                <div className="text-[#B0B8C4] text-sm">Avg Execution</div>
                <div className="text-[#B0B8C4] text-xs">Time</div>
              </div>
            </Card>
            <Card className="bg-[#243447] border-[#1a2332] p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#0070C0] mb-1">12%</div>
                <div className="text-[#B0B8C4] text-sm">Manual</div>
                <div className="text-[#B0B8C4] text-xs">Interventions</div>
              </div>
            </Card>
            <Card className="bg-[#243447] border-[#1a2332] p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FFA500] mb-1">47</div>
                <div className="text-[#B0B8C4] text-sm">Most Used SOP</div>
                <div className="text-[#B0B8C4] text-xs">Executions</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Right Column - SOP Details & Activity */}
        <div className="col-span-4 space-y-6">
          {/* SOP Detail Panel */}
          {selectedSOP ? (
            <Card className="bg-[#243447] border-[#1a2332] p-6">
              <h3 className="text-white font-semibold mb-4">SOP Details</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-[#B0B8C4] text-sm">Full Title</span>
                  <p className="text-white font-medium">{selectedSOP.title}</p>
                </div>
                <div>
                  <span className="text-[#B0B8C4] text-sm">Classification</span>
                  <p className="text-white">CONFIDENTIAL - INTERNAL USE</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[#B0B8C4] text-sm">Version</span>
                    <p className="text-white">2.3.1</p>
                  </div>
                  <div>
                    <span className="text-[#B0B8C4] text-sm">Owner</span>
                    <p className="text-white">{selectedSOP.owner}</p>
                  </div>
                </div>
                <div>
                  <span className="text-[#B0B8C4] text-sm">Estimated Time</span>
                  <p className="text-white">{selectedSOP.estimatedTime}</p>
                </div>
                
                {/* Step-by-Step Procedure */}
                <div className="mt-6">
                  <h4 className="text-white font-semibold mb-3">Step-by-Step Procedure</h4>
                  <ScrollArea className="h-64">
                    {selectedSOP.steps.map((phase, phaseIndex) => (
                      <div key={phaseIndex} className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[#FA8B17] font-semibold text-sm">{phase.phase}</span>
                          <span className="text-[#B0B8C4] text-xs">({phase.timeframe})</span>
                        </div>
                        <div className="space-y-2">
                          {phase.steps.map((step) => (
                            <div key={step.id} className="flex items-center space-x-3 p-2 rounded bg-[#1a2332]">
                              <div className="flex-shrink-0">
                                {step.completed ? (
                                  <CheckCircle className="h-4 w-4 text-[#00C851]" />
                                ) : step.inProgress ? (
                                  <Clock className="h-4 w-4 text-[#FA8B17]" />
                                ) : (
                                  <div className="h-4 w-4 rounded-full border-2 border-[#B0B8C4]"></div>
                                )}
                              </div>
                              <span className={`text-sm ${step.completed ? 'text-[#00C851]' : step.inProgress ? 'text-[#FA8B17]' : 'text-[#B0B8C4]'}`}>
                                {step.id}. {step.description}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="bg-[#243447] border-[#1a2332] p-6">
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-[#B0B8C4] mx-auto mb-3" />
                <p className="text-[#B0B8C4]">Select a SOP to view details</p>
              </div>
            </Card>
          )}

          {/* Integration Status */}
          <Card className="bg-[#243447] border-[#1a2332] p-6">
            <h3 className="text-white font-semibold mb-4">Integration Status</h3>
            <div className="space-y-3">
              {integrationStatus.map((integration, index) => {
                const IconComponent = integration.icon;
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-4 w-4 text-[#B0B8C4]" />
                      <span className="text-white text-sm">{integration.system}</span>
                    </div>
                    {getIntegrationStatusIcon(integration.status)}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Recent Activity Log */}
          <Card className="bg-[#243447] border-[#1a2332] p-6">
            <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
            <ScrollArea className="h-48">
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="text-[#FA8B17] font-mono text-xs mt-1">{activity.time}</span>
                    <span className="text-[#B0B8C4] text-sm">{activity.action}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>

      {/* Quick Action Buttons - Floating Panel */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
        <Button className="bg-[#FF4444] hover:bg-[#e03d3d] text-white rounded-full w-14 h-14 shadow-lg">
          <AlertTriangle className="h-6 w-6" />
        </Button>
        <Button className="bg-[#0070C0] hover:bg-[#005a9e] text-white rounded-full w-14 h-14 shadow-lg">
          <Plus className="h-6 w-6" />
        </Button>
        <Button className="bg-[#6B7280] hover:bg-[#5a5a6b] text-white rounded-full w-14 h-14 shadow-lg">
          <BarChart3 className="h-6 w-6" />
        </Button>
        <Button className="bg-[#6B7280] hover:bg-[#5a5a6b] text-white rounded-full w-14 h-14 shadow-lg">
          <Settings className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}