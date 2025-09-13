import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Lock, RefreshCw, Scan, FileText } from "lucide-react";

export function QuickActionsPanel() {
  return (
    <Card className="bg-[#243447] border-[#1a2332] p-6">
      <h3 className="text-white text-lg font-semibold mb-4">Quick Response</h3>
      <div className="space-y-3">
        <Button 
          className="w-full bg-[#FF4444] hover:bg-[#e63939] text-white border-0"
          size="lg"
        >
          <Lock className="h-4 w-4 mr-2" />
          Initiate Emergency Lockdown
        </Button>
        <Button 
          className="w-full bg-[#0070C0] hover:bg-[#005a9e] text-white border-0"
          size="lg"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Update Threat Feeds
        </Button>
        <Button 
          className="w-full bg-[#FA8B17] hover:bg-[#e07b0f] text-white border-0"
          size="lg"
        >
          <Scan className="h-4 w-4 mr-2" />
          Run System Scan
        </Button>
        <Button 
          className="w-full bg-[#6B7280] hover:bg-[#5a646e] text-white border-0"
          size="lg"
        >
          <FileText className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>
    </Card>
  );
}