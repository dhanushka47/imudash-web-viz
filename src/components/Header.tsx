import { Button } from "@/components/ui/button";
import { Circle, Download, Radio } from "lucide-react";

interface HeaderProps {
  isConnected: boolean;
  isRecording: boolean;
  onRecord: () => void;
  onExport: () => void;
}

export const Header = ({ isConnected, isRecording, onRecord, onExport }: HeaderProps) => {
  return (
    <header className="border-b border-border bg-card px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
            <Radio className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground">IMU Monitor</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant={isRecording ? "destructive" : "default"}
            size="sm"
            onClick={onRecord}
            className="gap-2"
          >
            <Circle className={`w-4 h-4 ${isRecording ? 'fill-current' : ''}`} />
            {isRecording ? 'Stop' : 'Record'}
          </Button>
          
          <Button variant="outline" size="sm" onClick={onExport} className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-accent animate-pulse' : 'bg-muted-foreground'}`} />
            <span className="text-sm font-medium">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
