import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TimeInputProps {
  onChange: (time: string) => void;
  label: string;
  defaultValue?: string;
}

export const TimeInput = ({ onChange, label, defaultValue }: TimeInputProps) => {
  const [time, setTime] = useState(defaultValue || "");

  useEffect(() => {
    if (defaultValue) {
      setTime(defaultValue);
      onChange(defaultValue);
    }
  }, [defaultValue, onChange]);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Basic time format validation (HH:mm)
    if (/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value) || value === "") {
      setTime(value);
      onChange(value);
    }
  };

  return (
    <div className="w-full max-w-xs">
      <Label htmlFor="time-input" className="text-sleep-primary mb-2 block">
        {label}
      </Label>
      <Input
        id="time-input"
        type="time"
        value={time}
        onChange={handleTimeChange}
        className="border-sleep-accent focus:border-sleep-primary focus:ring-sleep-primary"
        placeholder="Enter time"
      />
    </div>
  );
};