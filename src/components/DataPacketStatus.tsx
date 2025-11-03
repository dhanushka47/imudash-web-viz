import { Card } from "@/components/ui/card";
import { Activity, Clock, Database } from "lucide-react";

interface DataPacketStatusProps {
  packetsReceived: number;
  dataRate: number;
  lastPacketTime: string;
  latestData: {
    accel: { x: number; y: number; z: number };
    gyro: { x: number; y: number; z: number };
  };
}

export const DataPacketStatus = ({ 
  packetsReceived, 
  dataRate, 
  lastPacketTime, 
  latestData 
}: DataPacketStatusProps) => {
  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm px-4 py-3">
      <div className="flex items-center justify-between gap-6 text-sm">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Packets:</span>
          <span className="font-mono font-semibold text-foreground">{packetsReceived}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-accent" />
          <span className="text-muted-foreground">Rate:</span>
          <span className="font-mono font-semibold text-foreground">{dataRate.toFixed(1)} Hz</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-chart-2" />
          <span className="text-muted-foreground">Last:</span>
          <span className="font-mono text-foreground">{lastPacketTime}</span>
        </div>
        
        <div className="flex items-center gap-4 ml-auto">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Accel:</span>
            <span className="font-mono text-xs text-foreground">
              [{latestData.accel.x.toFixed(2)}, {latestData.accel.y.toFixed(2)}, {latestData.accel.z.toFixed(2)}]
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Gyro:</span>
            <span className="font-mono text-xs text-foreground">
              [{latestData.gyro.x.toFixed(2)}, {latestData.gyro.y.toFixed(2)}, {latestData.gyro.z.toFixed(2)}]
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
