import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

interface NotificationProps {
  time: string;
  type: 'critical' | 'high' | 'medium' | 'success';
  message: string;
}

const notifications: NotificationProps[] = [
  {
    time: "14:35",
    type: "critical",
    message: "APT group signature detected - Server Farm Alpha"
  },
  {
    time: "14:33",
    type: "high",
    message: "Unusual network traffic pattern - DMZ segment"
  },
  {
    time: "14:30",
    type: "medium",
    message: "Threat feed updated - 1,247 new IoCs"
  },
  {
    time: "14:28",
    type: "success",
    message: "Automated response successful - Blocked 15 IPs"
  },
  {
    time: "14:25",
    type: "critical",
    message: "Zero-day exploit attempt - Web Application"
  },
  {
    time: "14:22",
    type: "high",
    message: "Suspicious file execution detected - Endpoint-42"
  },
  {
    time: "14:20",
    type: "medium",
    message: "SSL certificate expiring in 7 days - mail.company.com"
  }
];

function getNotificationIcon(type: string) {
  switch (type) {
    case 'critical':
      return '🔴';
    case 'high':
      return '🟠';
    case 'medium':
      return '🟡';
    case 'success':
      return '✅';
    default:
      return '🔵';
  }
}

function NotificationItem({ time, type, message }: NotificationProps) {
  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-[#1a2332] rounded transition-colors">
      <span className="text-lg">{getNotificationIcon(type)}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-[#B0B8C4] text-xs font-mono">[{time}]</span>
        </div>
        <p className="text-white text-sm leading-relaxed">{message}</p>
      </div>
    </div>
  );
}

export function NotificationsPanel() {
  return (
    <Card className="bg-[#243447] border-[#1a2332] p-6">
      <h3 className="text-white text-lg font-semibold mb-4">Live Notifications</h3>
      <ScrollArea className="h-80">
        <div className="space-y-1">
          {notifications.map((notification, index) => (
            <NotificationItem
              key={index}
              time={notification.time}
              type={notification.type}
              message={notification.message}
            />
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}