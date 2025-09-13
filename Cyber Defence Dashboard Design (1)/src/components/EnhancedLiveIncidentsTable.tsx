import { Eye, Filter, Search, ChevronDown, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { useState, useMemo } from "react";

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

interface EnhancedLiveIncidentsTableProps {
  onIncidentClick: (incident: Incident) => void;
}

const incidents: Incident[] = [
  {
    id: "1",
    severity: "critical",
    eventType: "Brute Force Attack",
    target: "Server-01",
    time: "14:32",
    status: "Active",
    statusColor: "text-[#FF4444]",
    sourceIP: "192.168.1.100",
    attackVector: "Authentication"
  },
  {
    id: "2",
    severity: "high",
    eventType: "Data Exfiltration",
    target: "Database-03",
    time: "14:28",
    status: "Investigating",
    statusColor: "text-[#FA8B17]",
    sourceIP: "10.0.1.50",
    attackVector: "SQL Injection"
  },
  {
    id: "3",
    severity: "medium",
    eventType: "Unusual Login",
    target: "Workstation-15",
    time: "14:25",
    status: "Resolved",
    statusColor: "text-[#00C851]",
    sourceIP: "172.16.0.25",
    attackVector: "Social Engineering"
  },
  {
    id: "4",
    severity: "critical",
    eventType: "Malware Detected",
    target: "Network-DMZ",
    time: "14:20",
    status: "Containment",
    statusColor: "text-[#FF4444]",
    sourceIP: "External",
    attackVector: "Email Attachment"
  },
  {
    id: "5",
    severity: "high",
    eventType: "DDoS Attempt",
    target: "Web-Server-02",
    time: "14:15",
    status: "Blocked",
    statusColor: "text-[#0070C0]",
    sourceIP: "Multiple",
    attackVector: "Network Flood"
  },
  {
    id: "6",
    severity: "medium",
    eventType: "Suspicious File Access",
    target: "File-Server-01",
    time: "14:10",
    status: "Monitoring",
    statusColor: "text-[#FFA500]",
    sourceIP: "192.168.2.45",
    attackVector: "Privilege Escalation"
  },
  {
    id: "7",
    severity: "low",
    eventType: "Port Scan Detected",
    target: "Gateway-01",
    time: "14:05",
    status: "Logged",
    statusColor: "text-[#6B7280]",
    sourceIP: "203.0.113.12",
    attackVector: "Reconnaissance"
  }
];

function getSeverityIndicator(severity: string) {
  switch (severity) {
    case "critical":
      return <div className="w-3 h-3 rounded-full bg-[#FF4444] animate-pulse"></div>;
    case "high":
      return <div className="w-3 h-3 rounded-full bg-[#FA8B17]"></div>;
    case "medium":
      return <div className="w-3 h-3 rounded-full bg-[#FFA500]"></div>;
    case "low":
      return <div className="w-3 h-3 rounded-full bg-[#6B7280]"></div>;
    default:
      return <div className="w-3 h-3 rounded-full bg-[#6B7280]"></div>;
  }
}

export function EnhancedLiveIncidentsTable({ onIncidentClick }: EnhancedLiveIncidentsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("time");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredAndSortedIncidents = useMemo(() => {
    let filtered = incidents.filter(incident => {
      const matchesSearch = 
        incident.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.sourceIP?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSeverity = severityFilter === "all" || incident.severity === severityFilter;
      const matchesStatus = statusFilter === "all" || incident.status.toLowerCase() === statusFilter.toLowerCase();
      
      return matchesSearch && matchesSeverity && matchesStatus;
    });

    // Simple sorting by time (newest first)
    filtered.sort((a, b) => b.time.localeCompare(a.time));
    
    return filtered;
  }, [searchTerm, severityFilter, statusFilter, sortBy]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const getSeverityCount = (severity: string) => {
    return incidents.filter(inc => inc.severity === severity).length;
  };

  return (
    <Card className="bg-[#243447] border-[#1a2332] p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-white text-xl font-semibold">Live Incidents</h2>
          <Badge variant="outline" className="bg-[#1a2332] text-[#B0B8C4] border-[#243447]">
            {filteredAndSortedIncidents.length} of {incidents.length}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#B0B8C4]" />
            <Input
              placeholder="Search incidents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#1a2332] border-[#243447] text-white placeholder:text-[#6B7280] w-64"
            />
          </div>
          
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-32 bg-[#1a2332] border-[#243447] text-[#B0B8C4]">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent className="bg-[#243447] border-[#1a2332]">
              <SelectItem value="all" className="text-[#B0B8C4] focus:bg-[#1a2332] focus:text-white">All ({incidents.length})</SelectItem>
              <SelectItem value="critical" className="text-[#FF4444] focus:bg-[#1a2332]">Critical ({getSeverityCount('critical')})</SelectItem>
              <SelectItem value="high" className="text-[#FA8B17] focus:bg-[#1a2332]">High ({getSeverityCount('high')})</SelectItem>
              <SelectItem value="medium" className="text-[#FFA500] focus:bg-[#1a2332]">Medium ({getSeverityCount('medium')})</SelectItem>
              <SelectItem value="low" className="text-[#6B7280] focus:bg-[#1a2332]">Low ({getSeverityCount('low')})</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32 bg-[#1a2332] border-[#243447] text-[#B0B8C4]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-[#243447] border-[#1a2332]">
              <SelectItem value="all" className="text-[#B0B8C4] focus:bg-[#1a2332] focus:text-white">All</SelectItem>
              <SelectItem value="active" className="text-[#FF4444] focus:bg-[#1a2332]">Active</SelectItem>
              <SelectItem value="investigating" className="text-[#FA8B17] focus:bg-[#1a2332]">Investigating</SelectItem>
              <SelectItem value="resolved" className="text-[#00C851] focus:bg-[#1a2332]">Resolved</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="bg-[#1a2332] border-[#243447] text-[#B0B8C4] hover:bg-[#243447] hover:text-white"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[#1a2332] rounded-lg p-3 border border-[#243447]">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#FF4444]"></div>
            <span className="text-[#FF4444] font-medium">Critical: {getSeverityCount('critical')}</span>
          </div>
        </div>
        <div className="bg-[#1a2332] rounded-lg p-3 border border-[#243447]">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#FA8B17]"></div>
            <span className="text-[#FA8B17] font-medium">High: {getSeverityCount('high')}</span>
          </div>
        </div>
        <div className="bg-[#1a2332] rounded-lg p-3 border border-[#243447]">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#FFA500]"></div>
            <span className="text-[#FFA500] font-medium">Medium: {getSeverityCount('medium')}</span>
          </div>
        </div>
        <div className="bg-[#1a2332] rounded-lg p-3 border border-[#243447]">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#6B7280]"></div>
            <span className="text-[#6B7280] font-medium">Low: {getSeverityCount('low')}</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1a2332]">
              <th className="text-left py-3 px-4 text-[#B0B8C4] font-medium">Severity</th>
              <th className="text-left py-3 px-4 text-[#B0B8C4] font-medium">Event Type</th>
              <th className="text-left py-3 px-4 text-[#B0B8C4] font-medium">Target</th>
              <th className="text-left py-3 px-4 text-[#B0B8C4] font-medium">Source IP</th>
              <th className="text-left py-3 px-4 text-[#B0B8C4] font-medium">Time</th>
              <th className="text-left py-3 px-4 text-[#B0B8C4] font-medium">Status</th>
              <th className="text-left py-3 px-4 text-[#B0B8C4] font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedIncidents.map((incident) => (
              <tr
                key={incident.id}
                className="border-b border-[#1a2332] hover:bg-[#1a2332] transition-colors cursor-pointer"
                onClick={() => onIncidentClick(incident)}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    {getSeverityIndicator(incident.severity)}
                    <span className="text-white capitalize">{incident.severity}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div>
                    <div className="text-white">{incident.eventType}</div>
                    <div className="text-[#6B7280] text-xs">{incident.attackVector}</div>
                  </div>
                </td>
                <td className="py-3 px-4 text-white font-mono">{incident.target}</td>
                <td className="py-3 px-4 text-[#B0B8C4] font-mono text-sm">{incident.sourceIP}</td>
                <td className="py-3 px-4 text-[#B0B8C4] font-mono">{incident.time}</td>
                <td className="py-3 px-4">
                  <Badge 
                    variant="outline" 
                    className={`${incident.statusColor} border-current text-xs`}
                  >
                    {incident.status}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      onIncidentClick(incident);
                    }}
                    className="bg-transparent border-[#FA8B17] text-[#FA8B17] hover:bg-[#FA8B17] hover:text-white"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredAndSortedIncidents.length === 0 && (
          <div className="text-center py-8">
            <p className="text-[#6B7280]">No incidents match your filters</p>
          </div>
        )}
      </div>
    </Card>
  );
}