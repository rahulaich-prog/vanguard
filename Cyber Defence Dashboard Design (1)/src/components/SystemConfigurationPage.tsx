import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Slider } from "./ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { 
  CheckCircle, 
  AlertTriangle, 
  Settings, 
  Shield, 
  Network, 
  Database, 
  Brain, 
  Users, 
  Bell, 
  Activity, 
  Server, 
  Lock, 
  Download, 
  Upload, 
  Save, 
  RotateCcw,
  Wifi,
  Globe,
  Smartphone,
  Mail,
  MessageSquare,
  Phone,
  Zap,
  HardDrive,
  Cpu,
  BarChart3,
  FileText,
  Calendar,
  Eye,
  Key,
  Radio,
  PowerOff,
  Clock
} from "lucide-react";

interface SystemStatus {
  status: "operational" | "warning" | "error";
  message: string;
}

interface IntegrationSystem {
  name: string;
  status: "connected" | "limited" | "offline" | "pending";
  icon: any;
  details?: string;
}

interface PerformanceMetric {
  name: string;
  value: string;
  percentage?: number;
  status: "normal" | "warning" | "critical";
}

export function SystemConfigurationPage() {
  const [threatSensitivity, setThreatSensitivity] = useState([85]);
  const [autoIsolate, setAutoIsolate] = useState(true);
  const [autoBlock, setAutoBlock] = useState(true);
  const [autoPatch, setAutoPatch] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [escalationCritical, setEscalationCritical] = useState("immediate");
  const [escalationHigh, setEscalationHigh] = useState("5min");
  const [escalationMedium, setEscalationMedium] = useState("queue");

  const systemStatus: SystemStatus = {
    status: "operational",
    message: "All Systems Operational"
  };

  const integrationSystems: IntegrationSystem[] = [
    { name: "SIEM Platform: Splunk Enterprise", status: "connected", icon: Database, details: "Active" },
    { name: "EDR Solution: CrowdStrike Falcon", status: "connected", icon: Shield, details: "Synced" },
    { name: "Vulnerability Scanner: Nessus Professional", status: "connected", icon: Activity, details: "Connected" },
    { name: "Network Monitor: SolarWinds NPM", status: "limited", icon: Network, details: "Limited Access" },
    { name: "Cloud Security: AWS Security Hub", status: "pending", icon: Globe, details: "Configuration Pending" },
    { name: "Ticketing System: ServiceNow ITSM", status: "connected", icon: FileText, details: "Integrated" }
  ];

  const performanceMetrics: PerformanceMetric[] = [
    { name: "CPU Usage", value: "68%", percentage: 68, status: "normal" },
    { name: "Memory Usage", value: "12.4GB / 32GB", percentage: 39, status: "normal" },
    { name: "Network I/O", value: "2.3 Gbps", status: "normal" },
    { name: "Disk I/O", value: "847 MB/s", status: "normal" },
    { name: "Database Queries", value: "1,247/sec", status: "normal" },
    { name: "API Calls", value: "3,892/min", status: "normal" },
    { name: "Processing Latency", value: "&lt;150ms", status: "normal" },
    { name: "Alert Generation", value: "&lt;5 seconds", status: "normal" }
  ];

  const userRoles = [
    { role: "SOC Analysts", count: 8, permissions: "Read incidents, Execute SOPs, Update status" },
    { role: "Security Managers", count: 3, permissions: "Full incident access, Policy management" },
    { role: "System Administrators", count: 2, permissions: "Configuration access, System maintenance" },
    { role: "Auditors", count: 1, permissions: "Read-only access, Report generation" }
  ];

  const complianceStandards = [
    { name: "ISO 27001 - Information Security Management", status: "compliant" },
    { name: "NIST Cybersecurity Framework", status: "compliant" },
    { name: "Indian IT Act 2000 Compliance", status: "compliant" },
    { name: "Defense Security Guidelines", status: "in-progress", progress: 85 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
      case 'connected':
      case 'compliant':
        return 'text-[#00C851]';
      case 'warning':
      case 'limited':
      case 'in-progress':
        return 'text-[#FFA500]';
      case 'error':
      case 'offline':
      case 'non-compliant':
        return 'text-[#FF4444]';
      case 'pending':
        return 'text-[#0070C0]';
      default:
        return 'text-[#B0B8C4]';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
      case 'connected':
      case 'compliant':
        return <CheckCircle className="h-4 w-4 text-[#00C851]" />;
      case 'warning':
      case 'limited':
      case 'in-progress':
        return <AlertTriangle className="h-4 w-4 text-[#FFA500]" />;
      case 'error':
      case 'offline':
      case 'non-compliant':
        return <AlertTriangle className="h-4 w-4 text-[#FF4444]" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-[#0070C0]" />;
      default:
        return <Activity className="h-4 w-4 text-[#B0B8C4]" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuration Dashboard Header */}
      <div className="bg-[#243447] border border-[#1a2332] rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-white text-2xl font-semibold mb-2">System Configuration & Security Policies</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-[#00C851]" />
                <span className={`font-medium ${getStatusColor(systemStatus.status)}`}>
                  {systemStatus.message}
                </span>
              </div>
              <Separator orientation="vertical" className="h-4 bg-[#1a2332]" />
              <span className="text-[#B0B8C4] text-sm">
                Last Modified: Sept 11, 2025 at 09:45 AM by admin.secure
              </span>
            </div>
          </div>
          
          {/* Emergency Controls */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="border-[#FF4444] text-[#FF4444] hover:bg-[#FF4444] hover:text-white">
              <PowerOff className="h-4 w-4 mr-2" />
              Emergency Shutdown
            </Button>
            <Button variant="outline" className="border-[#FA8B17] text-[#FA8B17] hover:bg-[#FA8B17] hover:text-white">
              <Lock className="h-4 w-4 mr-2" />
              Lockdown Mode
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-3">
          <Button className="bg-[#00C851] hover:bg-[#00a644] text-white">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
          <Button variant="outline" className="border-[#243447] text-[#B0B8C4] hover:bg-[#243447] hover:text-white">
            <RotateCcw className="h-4 w-4 mr-2" />
            Restore Defaults
          </Button>
          <Button variant="outline" className="border-[#243447] text-[#B0B8C4] hover:bg-[#243447] hover:text-white">
            <Download className="h-4 w-4 mr-2" />
            Export Config
          </Button>
          <Button variant="outline" className="border-[#243447] text-[#B0B8C4] hover:bg-[#243447] hover:text-white">
            <Upload className="h-4 w-4 mr-2" />
            Import Config
          </Button>
        </div>
      </div>

      {/* Main Configuration Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Main Configuration */}
        <div className="col-span-8 space-y-6">
          {/* Configuration Categories Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Security Policies */}
            <Card className="bg-[#243447] border-[#1a2332] p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-[#FA8B17]" />
                🔧 SECURITY POLICIES
              </h3>
              
              <div className="space-y-6">
                {/* Threat Detection Sensitivity */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#B0B8C4] text-sm">Threat Detection Sensitivity</span>
                    <span className="text-white font-medium">High ({threatSensitivity[0]}% threshold)</span>
                  </div>
                  <Slider
                    value={threatSensitivity}
                    onValueChange={setThreatSensitivity}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-[#B0B8C4] mt-1">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                    <span>Critical</span>
                  </div>
                </div>

                {/* Auto-Response Settings */}
                <div>
                  <h4 className="text-white font-medium mb-3">Auto-Response Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Auto-isolate critical threats</span>
                      <div className="flex items-center space-x-2">
                        <Switch checked={autoIsolate} onCheckedChange={setAutoIsolate} />
                        <span className="text-[#00C851] text-sm">✅</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Auto-block suspicious IPs</span>
                      <div className="flex items-center space-x-2">
                        <Switch checked={autoBlock} onCheckedChange={setAutoBlock} />
                        <span className="text-[#00C851] text-sm">✅</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Auto-patch vulnerabilities</span>
                      <div className="flex items-center space-x-2">
                        <Switch checked={autoPatch} onCheckedChange={setAutoPatch} />
                        <span className="text-[#FF4444] text-sm">❌</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Auto-update threat signatures</span>
                      <div className="flex items-center space-x-2">
                        <Switch checked={autoUpdate} onCheckedChange={setAutoUpdate} />
                        <span className="text-[#00C851] text-sm">✅</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Incident Escalation Rules */}
                <div>
                  <h4 className="text-white font-medium mb-3">Incident Escalation Rules</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Critical</span>
                      <Select value={escalationCritical} onValueChange={setEscalationCritical}>
                        <SelectTrigger className="w-48 bg-[#1a2332] border-[#243447] text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a2332] border-[#243447]">
                          <SelectItem value="immediate">Immediate notification to SOC Manager</SelectItem>
                          <SelectItem value="1min">Alert within 1 minute</SelectItem>
                          <SelectItem value="5min">Alert within 5 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">High</span>
                      <Select value={escalationHigh} onValueChange={setEscalationHigh}>
                        <SelectTrigger className="w-48 bg-[#1a2332] border-[#243447] text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a2332] border-[#243447]">
                          <SelectItem value="immediate">Immediate notification</SelectItem>
                          <SelectItem value="1min">Alert within 1 minute</SelectItem>
                          <SelectItem value="5min">Alert within 5 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Medium</span>
                      <Select value={escalationMedium} onValueChange={setEscalationMedium}>
                        <SelectTrigger className="w-48 bg-[#1a2332] border-[#243447] text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a2332] border-[#243447]">
                          <SelectItem value="queue">Queue for analyst review</SelectItem>
                          <SelectItem value="5min">Alert within 5 minutes</SelectItem>
                          <SelectItem value="15min">Alert within 15 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Network Monitoring */}
            <Card className="bg-[#243447] border-[#1a2332] p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <Network className="h-5 w-5 mr-2 text-[#FA8B17]" />
                🌐 NETWORK MONITORING
              </h3>
              
              <div className="space-y-6">
                {/* Data Sources Configuration */}
                <div>
                  <h4 className="text-white font-medium mb-3">Data Sources Configuration</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Firewall Logs</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-[#00C851] text-sm">✅</span>
                        <span className="text-white text-sm">(15 sources active)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">SIEM Integration</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-[#00C851] text-sm">✅</span>
                        <span className="text-white text-sm">(Splunk connected)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Endpoint Detection</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-[#00C851] text-sm">✅</span>
                        <span className="text-white text-sm">(CrowdStrike API)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Network Traffic Analysis</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-[#FFA500] text-sm">⚠️</span>
                        <span className="text-white text-sm">(Rate limited)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">DNS Monitoring</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-[#FF4444] text-sm">❌</span>
                        <span className="text-white text-sm">(Maintenance mode)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Monitoring Intervals */}
                <div>
                  <h4 className="text-white font-medium mb-3">Monitoring Intervals</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Critical systems</span>
                      <span className="text-white text-sm">Real-time</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">High-priority assets</span>
                      <span className="text-white text-sm">30 seconds</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Standard monitoring</span>
                      <span className="text-white text-sm">5 minutes</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* AI/ML Processing */}
            <Card className="bg-[#243447] border-[#1a2332] p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <Brain className="h-5 w-5 mr-2 text-[#FA8B17]" />
                🤖 AI/ML PROCESSING
              </h3>
              
              <div className="space-y-6">
                {/* Neo4j Graph Database */}
                <div>
                  <h4 className="text-white font-medium mb-3">Neo4j Graph Database</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Status</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-[#00C851] text-sm">✅</span>
                        <span className="text-white text-sm">Connected (3.2TB data)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Node Count</span>
                      <span className="text-white text-sm">2,847,392 entities</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Relationships</span>
                      <span className="text-white text-sm">8,924,731 connections</span>
                    </div>
                  </div>
                </div>

                {/* LangChain Processing */}
                <div>
                  <h4 className="text-white font-medium mb-3">LangChain Processing</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Model</span>
                      <span className="text-white text-sm">GPT-4 Integration Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Threat Analysis</span>
                      <span className="text-white text-sm">Real-time processing</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Response Generation</span>
                      <span className="text-white text-sm">Automated</span>
                    </div>
                  </div>
                </div>

                {/* Machine Learning Models */}
                <div>
                  <h4 className="text-white font-medium mb-3">Machine Learning Models</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Anomaly Detection</span>
                      <span className="text-white text-sm">94.2% accuracy</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Threat Classification</span>
                      <span className="text-white text-sm">Updated daily</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Pattern Recognition</span>
                      <span className="text-white text-sm">Active learning enabled</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Data Management */}
            <Card className="bg-[#243447] border-[#1a2332] p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <Database className="h-5 w-5 mr-2 text-[#FA8B17]" />
                📊 DATA MANAGEMENT
              </h3>
              
              <div className="space-y-6">
                {/* MongoDB Configuration */}
                <div>
                  <h4 className="text-white font-medium mb-3">MongoDB Configuration</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Status</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-[#00C851] text-sm">✅</span>
                        <span className="text-white text-sm">Healthy (Replica Set)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Storage Used</span>
                      <span className="text-white text-sm">2.1TB / 5TB allocated</span>
                    </div>
                    <div className="w-full">
                      <Progress value={42} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Daily Ingestion</span>
                      <span className="text-white text-sm">~850GB logs</span>
                    </div>
                  </div>
                </div>

                {/* Data Retention Policies */}
                <div>
                  <h4 className="text-white font-medium mb-3">Data Retention Policies</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Critical Incidents</span>
                      <span className="text-white text-sm">7 years</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Security Logs</span>
                      <span className="text-white text-sm">3 years</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">System Metrics</span>
                      <span className="text-white text-sm">1 year</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Temporary Data</span>
                      <span className="text-white text-sm">30 days</span>
                    </div>
                  </div>
                </div>

                {/* Backup Status */}
                <div>
                  <h4 className="text-white font-medium mb-3">Backup Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Last Backup</span>
                      <span className="text-white text-sm">Today, 02:00 AM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Recovery Point</span>
                      <span className="text-white text-sm">&lt; 15 minutes</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* User Access & Permissions */}
          <Card className="bg-[#243447] border-[#1a2332] p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-[#FA8B17]" />
              User Access & Permissions
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-medium mb-3">Role-Based Access Control</h4>
                <div className="space-y-3">
                  {userRoles.map((role, index) => (
                    <div key={index} className="p-3 bg-[#1a2332] rounded border border-[#243447]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-medium">{role.role}</span>
                        <Badge variant="outline" className="bg-[#FA8B17] border-[#FA8B17] text-white">
                          {role.count} users
                        </Badge>
                      </div>
                      <p className="text-[#B0B8C4] text-sm">{role.permissions}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-3">Authentication Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[#B0B8C4] text-sm">Multi-Factor Authentication</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#00C851] text-sm">✅</span>
                      <span className="text-white text-sm">Enforced</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#B0B8C4] text-sm">Session Timeout</span>
                    <span className="text-white text-sm">8 hours (configurable)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#B0B8C4] text-sm">Password Policy</span>
                    <span className="text-white text-sm">Complex, 90-day rotation</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#B0B8C4] text-sm">API Key Management</span>
                    <span className="text-white text-sm">Active token rotation</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Alert & Notification Configuration */}
          <Card className="bg-[#243447] border-[#1a2332] p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Bell className="h-5 w-5 mr-2 text-[#FA8B17]" />
              Alert & Notification Configuration
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-medium mb-3">Notification Channels</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-[#B0B8C4]" />
                      <span className="text-[#B0B8C4] text-sm">Email Alerts</span>
                    </div>
                    <span className="text-white text-sm">Critical/High incidents</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-4 w-4 text-[#B0B8C4]" />
                      <span className="text-[#B0B8C4] text-sm">SMS Notifications</span>
                    </div>
                    <span className="text-white text-sm">Critical incidents only</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4 text-[#B0B8C4]" />
                      <span className="text-[#B0B8C4] text-sm">Slack Integration</span>
                    </div>
                    <span className="text-white text-sm">#security-alerts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4 text-[#B0B8C4]" />
                      <span className="text-[#B0B8C4] text-sm">Dashboard Alerts</span>
                    </div>
                    <span className="text-white text-sm">All severity levels</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-[#B0B8C4]" />
                      <span className="text-[#B0B8C4] text-sm">Phone Escalation</span>
                    </div>
                    <span className="text-white text-sm">After 15 minutes for Critical</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-3">Alert Tuning</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[#B0B8C4] text-sm">Noise Reduction</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#00C851] text-sm">✅</span>
                      <span className="text-white text-sm">37% reduction in false positives</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#B0B8C4] text-sm">Correlation Rules</span>
                    <span className="text-white text-sm">247 active rules</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#B0B8C4] text-sm">Custom Signatures</span>
                    <span className="text-white text-sm">89 organization-specific rules</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#B0B8C4] text-sm">ML Filters</span>
                    <span className="text-white text-sm">Active (continuous improvement)</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* System Performance Metrics */}
          <Card className="bg-[#243447] border-[#1a2332] p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-[#FA8B17]" />
              System Performance Metrics
            </h3>
            
            <div className="grid grid-cols-4 gap-4 mb-6">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="p-3 bg-[#1a2332] rounded border border-[#243447]">
                  <div className="text-center">
                    <div className="text-white font-medium text-sm mb-1">{metric.name}</div>
                    <div className="text-[#FA8B17] font-bold">{metric.value}</div>
                    {metric.percentage && (
                      <div className="mt-2">
                        <Progress value={metric.percentage} className="h-1" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-medium mb-3">Capacity Planning</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#B0B8C4] text-sm">Current Load</span>
                    <span className="text-white text-sm">68% of maximum capacity</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#B0B8C4] text-sm">Projected Growth</span>
                    <span className="text-white text-sm">15% per quarter</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#B0B8C4] text-sm">Scaling Trigger</span>
                    <span className="text-white text-sm">85% sustained load</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#B0B8C4] text-sm">Next Review</span>
                    <span className="text-white text-sm">December 2025</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-white font-medium mb-3">API Health Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#B0B8C4] text-sm">Threat Intelligence Feeds</span>
                    <span className="text-[#00C851] text-sm">98.7% uptime</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#B0B8C4] text-sm">External Correlation Services</span>
                    <span className="text-[#00C851] text-sm">99.2% uptime</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#B0B8C4] text-sm">Authentication Services</span>
                    <span className="text-[#00C851] text-sm">100% uptime</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#B0B8C4] text-sm">Notification Systems</span>
                    <span className="text-[#00C851] text-sm">97.8% uptime</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Integration Status & Compliance */}
        <div className="col-span-4 space-y-6">
          {/* Integration Status Panel */}
          <Card className="bg-[#243447] border-[#1a2332] p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-[#FA8B17]" />
              Integration Status
            </h3>
            
            <div className="space-y-4">
              <h4 className="text-white font-medium">Connected Systems</h4>
              <div className="space-y-3">
                {integrationSystems.map((system, index) => {
                  const IconComponent = system.icon;
                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-[#1a2332] rounded border border-[#243447]">
                      <div className="flex items-center space-x-3">
                        <IconComponent className="h-4 w-4 text-[#B0B8C4]" />
                        <div>
                          <div className="text-white text-sm">{system.name}</div>
                          <div className="text-[#B0B8C4] text-xs">{system.details}</div>
                        </div>
                      </div>
                      {getStatusIcon(system.status)}
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Compliance & Audit Trail */}
          <Card className="bg-[#243447] border-[#1a2332] p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-[#FA8B17]" />
              Compliance & Audit Trail
            </h3>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="compliance" className="border-[#1a2332]">
                <AccordionTrigger className="text-white hover:text-[#FA8B17]">
                  Compliance Standards
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    {complianceStandards.map((standard, index) => (
                      <div key={index} className="flex items-center justify-between p-2">
                        <div className="flex-1">
                          <div className="text-white text-sm">{standard.name}</div>
                          {standard.progress && (
                            <div className="mt-1">
                              <Progress value={standard.progress} className="h-1" />
                              <div className="text-[#B0B8C4] text-xs mt-1">{standard.progress}% complete</div>
                            </div>
                          )}
                        </div>
                        {getStatusIcon(standard.status)}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="audit" className="border-[#1a2332]">
                <AccordionTrigger className="text-white hover:text-[#FA8B17]">
                  Audit Logging
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Configuration Changes</span>
                      <span className="text-white text-sm">All logged with user attribution</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Access Logs</span>
                      <span className="text-white text-sm">90-day retention, tamper-evident</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">System Events</span>
                      <span className="text-white text-sm">Comprehensive logging to SIEM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#B0B8C4] text-sm">Compliance Reports</span>
                      <span className="text-white text-sm">Generated monthly</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>

          {/* Crisis Management Controls */}
          <Card className="bg-[#243447] border-[#1a2332] p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-[#FF4444]" />
              Crisis Management
            </h3>
            
            <div className="space-y-3">
              <Button className="w-full bg-[#FF4444] hover:bg-[#e03d3d] text-white justify-start">
                <Radio className="h-4 w-4 mr-2" />
                🚨 Emergency Shutdown
              </Button>
              <Button className="w-full bg-[#FA8B17] hover:bg-[#e07b0f] text-white justify-start">
                <Lock className="h-4 w-4 mr-2" />
                🔒 Lockdown Mode
              </Button>
              <Button className="w-full bg-[#0070C0] hover:bg-[#005a9e] text-white justify-start">
                <Radio className="h-4 w-4 mr-2" />
                📡 Backup Communication
              </Button>
              <Button className="w-full bg-[#00C851] hover:bg-[#00a644] text-white justify-start">
                <RotateCcw className="h-4 w-4 mr-2" />
                🔄 Disaster Recovery
              </Button>
            </div>
            
            <div className="mt-4 p-3 bg-[#1a2332] rounded border border-[#243447]">
              <div className="text-[#B0B8C4] text-xs">
                <div>RTO: 4 hours</div>
                <div>RPO: 15 minutes</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}