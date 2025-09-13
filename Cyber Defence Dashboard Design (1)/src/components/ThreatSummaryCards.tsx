import { AlertTriangle, Shield, Info, CheckCircle } from "lucide-react";
import { Card } from "./ui/card";

interface ThreatCardProps {
  title: string;
  count: number;
  subtitle: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ReactNode;
}

function ThreatCard({ title, count, subtitle, color, bgColor, borderColor, icon }: ThreatCardProps) {
  return (
    <Card className={`${bgColor} ${borderColor} border-l-4 p-6 transition-all duration-200 hover:shadow-lg hover:shadow-${color}/20`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            {icon}
            <h3 className="text-white font-semibold">{title}</h3>
          </div>
          <div className={`text-3xl font-bold ${color} mb-1`}>{count}</div>
          <p className="text-[#B0B8C4] text-sm">{subtitle}</p>
        </div>
      </div>
    </Card>
  );
}

export function ThreatSummaryCards() {
  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      <ThreatCard
        title="Critical Threats"
        count={12}
        subtitle="Immediate Action Required"
        color="text-[#FF4444]"
        bgColor="bg-[#243447]"
        borderColor="border-l-[#FF4444]"
        icon={<Shield className="h-6 w-6 text-[#FF4444]" />}
      />
      <ThreatCard
        title="High Priority"
        count={21}
        subtitle="Under Investigation"
        color="text-[#FA8B17]"
        bgColor="bg-[#243447]"
        borderColor="border-l-[#FA8B17]"
        icon={<AlertTriangle className="h-6 w-6 text-[#FA8B17]" />}
      />
      <ThreatCard
        title="Medium Alerts"
        count={34}
        subtitle="Monitoring"
        color="text-[#FFA500]"
        bgColor="bg-[#243447]"
        borderColor="border-l-[#FFA500]"
        icon={<Info className="h-6 w-6 text-[#FFA500]" />}
      />
      <ThreatCard
        title="Resolved Today"
        count={156}
        subtitle="Auto & Manual"
        color="text-[#00C851]"
        bgColor="bg-[#243447]"
        borderColor="border-l-[#00C851]"
        icon={<CheckCircle className="h-6 w-6 text-[#00C851]" />}
      />
    </div>
  );
}