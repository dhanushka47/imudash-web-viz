import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: {
    samplingRate: number;
    chartDuration: number;
    devicePort: string;
    baudRate: number;
  };
  onSettingsChange: (settings: any) => void;
}

export const SettingsDialog = ({ open, onOpenChange, settings, onSettingsChange }: SettingsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Configure IMU data acquisition and display settings
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Data Acquisition</h3>
            
            <div className="grid gap-2">
              <Label htmlFor="sampling-rate">Sampling Rate (Hz)</Label>
              <Input
                id="sampling-rate"
                type="number"
                value={settings.samplingRate}
                onChange={(e) => onSettingsChange({ ...settings, samplingRate: parseInt(e.target.value) })}
                min="1"
                max="1000"
              />
              <p className="text-xs text-muted-foreground">Number of samples per second (1-1000 Hz)</p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="device-port">Device Port</Label>
              <Input
                id="device-port"
                value={settings.devicePort}
                onChange={(e) => onSettingsChange({ ...settings, devicePort: e.target.value })}
                placeholder="/dev/ttyUSB0"
              />
              <p className="text-xs text-muted-foreground">Serial port for IMU device</p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="baud-rate">Baud Rate</Label>
              <Select
                value={settings.baudRate.toString()}
                onValueChange={(value) => onSettingsChange({ ...settings, baudRate: parseInt(value) })}
              >
                <SelectTrigger id="baud-rate">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9600">9600</SelectItem>
                  <SelectItem value="19200">19200</SelectItem>
                  <SelectItem value="38400">38400</SelectItem>
                  <SelectItem value="57600">57600</SelectItem>
                  <SelectItem value="115200">115200</SelectItem>
                  <SelectItem value="230400">230400</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Serial communication speed</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Display</h3>
            
            <div className="grid gap-2">
              <Label htmlFor="chart-duration">Chart Duration (seconds)</Label>
              <Input
                id="chart-duration"
                type="number"
                value={settings.chartDuration}
                onChange={(e) => onSettingsChange({ ...settings, chartDuration: parseInt(e.target.value) })}
                min="1"
                max="60"
              />
              <p className="text-xs text-muted-foreground">Time window for chart display (1-60 seconds)</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
