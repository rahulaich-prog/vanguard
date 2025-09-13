import { Card } from "./ui/card";
import { Shield, Database, Cpu, Activity } from "lucide-react";

interface StatusItemProps {
  title: string;
  status: string;
  color: string;
  icon: React.ReactNode;
  description?: string;
}

function StatusItem({ title, status, color, icon, description }: StatusItemProps) {
  return (
    <Card className="bg-[#1a2332] border-[#243447] p-4 hover:bg-[#243447] transition-colors">
      <div className="flex items-center space-x-3 mb-2">
        {icon}
        <h4 className="text-white font-medium">{title}</h4>
      </div>
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${color}`}></div>
        <span className="text-white text-sm font-medium">{status}</span>
      </div>
      {description && (
        <p className="text-[#B0B8C4] text-xs mt-1">{description}</p>
      )}
    </Card>
  );
}

export function SystemStatusPanel() {
  return (
    <Card className="bg-[#243447] border-[#1a2332] p-6">
      <h3 className="text-white text-lg font-semibold mb-4">System Status</h3>
      <div className="grid grid-cols-2 gap-3">
        <StatusItem
          title="Network Security"
          status="Healthy"
          color="bg-[#00C851]"
          icon={<Shield className="h-5 w-5 text-[#00C851]" />}
        />
        <StatusItem
          title="Data Feeds"
          status="Active"
          color="bg-[#0070C0]"
          icon={<Database className="h-5 w-5 text-[#0070C0]" />}
          description="15 sources"
        />
        <StatusItem
          title="AI Processing"
          status="Operational"
          color="bg-[#00C851]"
          icon={<Cpu className="h-5 w-5 text-[#00C851]" />}
        />
        <StatusItem
          title="Threat Intelligence"
          status="Updating"
          color="bg-[#FFA500]"
          icon={<Activity className="h-5 w-5 text-[#FFA500]" />}
        />
      </div>
    </Card>
  );
}