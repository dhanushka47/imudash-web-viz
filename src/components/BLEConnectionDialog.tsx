import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bluetooth, Loader2 } from "lucide-react";
import { useState } from "react";

interface BLEConnectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: (deviceName: string) => void;
}

// Mock BLE devices
const mockDevices = [
  { id: 1, name: "IMU-BLE-001", rssi: -45 },
  { id: 2, name: "IMU-BLE-002", rssi: -52 },
  { id: 3, name: "IMU-BLE-003", rssi: -68 },
  { id: 4, name: "IMU-BLE-004", rssi: -71 },
  { id: 5, name: "IMU-BLE-005", rssi: -80 },
];

export const BLEConnectionDialog = ({ open, onOpenChange, onConnect }: BLEConnectionDialogProps) => {
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState(mockDevices);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setDevices(mockDevices);
      setScanning(false);
    }, 1500);
  };

  const handleConnect = (deviceName: string) => {
    onConnect(deviceName);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Available BLE Devices</DialogTitle>
          <DialogDescription>
            Select an IMU device to connect
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 py-4">
          <Button 
            onClick={handleScan} 
            disabled={scanning}
            className="w-full gap-2"
            variant="outline"
          >
            {scanning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Bluetooth className="w-4 h-4" />
                Scan for Devices
              </>
            )}
          </Button>

          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {devices.map((device) => (
              <Button
                key={device.id}
                variant="outline"
                className="w-full justify-between"
                onClick={() => handleConnect(device.name)}
              >
                <div className="flex items-center gap-2">
                  <Bluetooth className="w-4 h-4" />
                  <span>{device.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {device.rssi} dBm
                </span>
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
