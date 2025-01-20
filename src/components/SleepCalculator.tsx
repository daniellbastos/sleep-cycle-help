import { useState } from "react";
import { TimeInput } from "./TimeInput";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

const calculateSleepTimes = (wakeTime: string): string[] => {
  const [hours, minutes] = wakeTime.split(":").map(Number);
  const wakeDate = new Date();
  wakeDate.setHours(hours, minutes, 0, 0);

  const sleepTimes: string[] = [];
  const SLEEP_CYCLE = 90; // 90 minutes per sleep cycle

  for (let i = 4; i <= 6; i++) {
    const sleepDate = new Date(wakeDate.getTime() - i * SLEEP_CYCLE * 60 * 1000);
    sleepTimes.push(
      sleepDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  }

  return sleepTimes.reverse();
};

export const SleepCalculator = () => {
  const [sleepTimes, setSleepTimes] = useState<string[]>([]);

  const handleTimeChange = (time: string) => {
    if (time) {
      setSleepTimes(calculateSleepTimes(time));
    } else {
      setSleepTimes([]);
    }
  };

  return (
    <div className="space-y-8">
      <TimeInput onChange={handleTimeChange} />
      
      {sleepTimes.length > 0 && (
        <div className="space-y-4 animate-fadeIn">
          <h2 className="text-sleep-primary text-lg font-semibold">
            Recommended bedtimes for optimal sleep:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sleepTimes.map((time, index) => (
              <Card
                key={time}
                className="p-4 border-sleep-accent hover:border-sleep-primary transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Clock className="text-sleep-secondary" />
                  <div>
                    <p className="text-sm text-sleep-primary">
                      {6 - index} sleep cycles
                    </p>
                    <p className="text-xl font-bold text-sleep-secondary">
                      {time}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};