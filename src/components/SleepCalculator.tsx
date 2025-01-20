import { useState, useEffect } from "react";
import { TimeInput } from "./TimeInput";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

const calculateSleepTimes = (sleepTime: string, wakeTime: string): string[] => {
  const [sleepHours, sleepMinutes] = sleepTime.split(":").map(Number);
  const [wakeHours, wakeMinutes] = wakeTime.split(":").map(Number);
  
  const sleepDate = new Date();
  sleepDate.setHours(sleepHours, sleepMinutes, 0, 0);
  
  const wakeDate = new Date();
  wakeDate.setHours(wakeHours, wakeMinutes, 0, 0);
  
  // If wake time is before sleep time, assume it's for the next day
  if (wakeDate < sleepDate) {
    wakeDate.setDate(wakeDate.getDate() + 1);
  }

  const sleepTimes: string[] = [];
  const SLEEP_CYCLE = 90; // 90 minutes per sleep cycle

  let currentCycle = 1;
  let cycleTime = new Date(sleepDate.getTime());

  // Only collect cycles until we reach wake time
  while (cycleTime < wakeDate) {
    cycleTime = new Date(sleepDate.getTime() + currentCycle * SLEEP_CYCLE * 60 * 1000);
    if (cycleTime <= wakeDate) {
      sleepTimes.push(
        cycleTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }
    currentCycle++;
  }

  // Add exactly one more cycle after wake time
  const finalCycleTime = new Date(sleepDate.getTime() + currentCycle * SLEEP_CYCLE * 60 * 1000);
  sleepTimes.push(
    finalCycleTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  return sleepTimes;
};

const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const SleepCalculator = () => {
  const [sleepTime, setSleepTime] = useState<string>(getCurrentTime());
  const [wakeTime, setWakeTime] = useState<string>("");
  const [cycleTimes, setCycleTimes] = useState<string[]>([]);

  useEffect(() => {
    if (sleepTime && wakeTime) {
      setCycleTimes(calculateSleepTimes(sleepTime, wakeTime));
    } else {
      setCycleTimes([]);
    }
  }, [sleepTime, wakeTime]);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <TimeInput
          label="When will you sleep?"
          onChange={setSleepTime}
          defaultValue={getCurrentTime()}
        />
        <TimeInput
          label="When do you want to wake up?"
          onChange={setWakeTime}
        />
      </div>
      
      {cycleTimes.length > 0 && (
        <div className="space-y-4 animate-fadeIn">
          <h2 className="text-sleep-primary text-lg font-semibold">
            Your sleep cycles:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cycleTimes.map((time, index) => (
              <Card
                key={time}
                className="p-4 border-sleep-accent hover:border-sleep-primary transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Clock className="text-sleep-secondary" />
                  <div>
                    <p className="text-sm text-sleep-primary">
                      Cycle {index + 1}
                    </p>
                    <p className="text-xl font-bold text-sleep-secondary">
                      {time}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(index + 1) * 90} minutes of sleep
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