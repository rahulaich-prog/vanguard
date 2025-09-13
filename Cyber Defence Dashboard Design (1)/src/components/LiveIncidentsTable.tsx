import { Eye, Filter, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";

interface Incident {
  id: string;
  severity: "critical" | "high" | "medium";
  eventType: string;
  target: string;
  time: string;
  status: string;
  statusColor: string;
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
  },
  {
    id: "2",
    severity: "high",
    eventType: "Data Exfiltration",
    target: "Database-03",
    time: "14:28",
    status: "Investigating",
    statusColor: "text-[#FA8B17]",
  },
  {
    id: "3",
    severity: "medium",
    eventType: "Unusual Login",
    target: "Workstation-15",
    time: "14:25",
    status: "Resolved",
    statusColor: "text-[#00C851]",
  },
  {
    id: "4",
    severity: "critical",
    eventType: "Malware Detected",
    target: "Network-DMZ",
    time: "14:20",
    status: "Containment",
    statusColor: "text-[#FF4444]",
  },
  {
    id: "5",
    severity: "high",
    eventType: "DDoS Attempt",
    target: "Web-Server-02",
    time: "14:15",
    status: "Blocked",
    statusColor: "text-[#0070C0]",
  },
];

function getSeverityIndicator(severity: string) {
  switch (severity) {
    case "critical":
      return (
        <div className="w-3 h-3 rounded-full bg-[#FF4444]"></div>
      );
    case "high":
      return (
        <div className="w-3 h-3 rounded-full bg-[#FA8B17]"></div>
      );
    case "medium":
      return (
        <div className="w-3 h-3 rounded-full bg-[#FFA500]"></div>
      );
    default:
      return (
        <div className="w-3 h-3 rounded-full bg-[#6B7280]"></div>
      );
  }
}

export function LiveIncidentsTable() {
  return (
    <Card className="bg-[#243447] border-[#1a2332] p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-xl font-semibold">
          Live Incidents
        </h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#B0B8C4]" />
            <Input
              placeholder="Search incidents..."
              className="pl-10 bg-[#1a2332] border-[#243447] text-white placeholder:text-[#6B7280] w-64"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="bg-[#1a2332] border-[#243447] text-[#B0B8C4] hover:bg-[#243447] hover:text-white"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1a2332]">
              <th className="text-left py-3 px-4 text-[#B0B8C4] font-medium">
                Severity
              </th>
              <th className="text-left py-3 px-4 text-[#B0B8C4] font-medium">
                Event Type
              </th>
              <th className="text-left py-3 px-4 text-[#B0B8C4] font-medium">
                Target
              </th>
              <th className="text-left py-3 px-4 text-[#B0B8C4] font-medium">
                Time
              </th>
              <th className="text-left py-3 px-4 text-[#B0B8C4] font-medium">
                Status
              </th>
              <th className="text-left py-3 px-4 text-[#B0B8C4] font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr
                key={incident.id}
                className="border-b border-[#1a2332] hover:bg-[#1a2332] transition-colors cursor-pointer"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    {getSeverityIndicator(incident.severity)}
                    <span className="text-white capitalize">
                      {incident.severity}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-white">
                  {incident.eventType}
                </td>
                <td className="py-3 px-4 text-white font-mono">
                  {incident.target}
                </td>
                <td className="py-3 px-4 text-[#B0B8C4] font-mono">
                  {incident.time}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`${incident.statusColor} font-medium`}
                  >
                    {incident.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent border-[#FA8B17] text-[#FA8B17] hover:bg-[#FA8B17] hover:text-white"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}