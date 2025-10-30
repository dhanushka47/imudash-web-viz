import { useState } from 'react';
import { Header } from '@/components/Header';
import { OrientationViewer } from '@/components/OrientationViewer';
import { SensorChart } from '@/components/SensorChart';
import { useIMUData } from '@/hooks/useIMUData';
import { toast } from 'sonner';

const Index = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const { accelerometer, gyroscope, magnetometer, rotation } = useIMUData();

  const handleRecord = () => {
    setIsRecording(!isRecording);
    toast(isRecording ? 'Recording stopped' : 'Recording started', {
      description: isRecording ? 'Data saved to memory' : 'Capturing IMU data...'
    });
  };

  const handleExport = () => {
    toast('Export started', {
      description: 'Preparing CSV file for download...'
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        isConnected={isConnected}
        isRecording={isRecording}
        onRecord={handleRecord}
        onExport={handleExport}
      />
      
      <main className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* 3D Orientation Viewer */}
          <div className="lg:col-span-1 h-[500px] lg:h-full min-h-[400px]">
            <OrientationViewer rotation={rotation} />
          </div>
          
          {/* Sensor Charts Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
            <SensorChart
              title="Accelerometer"
              data={accelerometer}
              unit="m/s²"
              color1="hsl(var(--chart-1))"
              color2="hsl(var(--chart-2))"
              color3="hsl(var(--chart-3))"
            />
            
            <SensorChart
              title="Gyroscope"
              data={gyroscope}
              unit="rad/s"
              color1="hsl(var(--chart-4))"
              color2="hsl(var(--chart-5))"
              color3="hsl(var(--chart-6))"
            />
            
            <SensorChart
              title="Magnetometer"
              data={magnetometer}
              unit="µT"
              color1="hsl(var(--chart-1))"
              color2="hsl(var(--chart-2))"
              color3="hsl(var(--chart-3))"
            />
            
            <SensorChart
              title="Orientation (Euler)"
              data={accelerometer.map((_, i) => ({
                time: accelerometer[i]?.time || 0,
                x: rotation.x % (2 * Math.PI),
                y: rotation.y % (2 * Math.PI),
                z: rotation.z % (2 * Math.PI)
              }))}
              unit="rad"
              color1="hsl(var(--chart-4))"
              color2="hsl(var(--chart-5))"
              color3="hsl(var(--chart-6))"
            />
            
            <SensorChart
              title="Linear Acceleration"
              data={accelerometer.map(d => ({
                time: d.time,
                x: d.x,
                y: d.y,
                z: d.z - 9.8
              }))}
              unit="m/s²"
              color1="hsl(var(--chart-1))"
              color2="hsl(var(--chart-2))"
              color3="hsl(var(--chart-3))"
            />
            
            <SensorChart
              title="Angular Velocity"
              data={gyroscope}
              unit="°/s"
              color1="hsl(var(--chart-4))"
              color2="hsl(var(--chart-5))"
              color3="hsl(var(--chart-6))"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
