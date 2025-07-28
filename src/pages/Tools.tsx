import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TimeZoneConverter = () => {
  const [fromTime, setFromTime] = useState("");
  const [fromZone, setFromZone] = useState("UTC");
  const [toZone, setToZone] = useState("UTC");
  const [convertedTime, setConvertedTime] = useState("");

  const timeZones = ["UTC", "America/New_York", "Europe/London", "Asia/Tokyo", "Africa/Tunis"];

  const convertTime = () => {
    try {
      // Parse the input as UTC by appending 'Z', then format into the target zone
      const date = new Date(`${fromTime}Z`);
      const options: Intl.DateTimeFormatOptions = {
        timeZone: toZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const converted = new Intl.DateTimeFormat('en-US', options).format(date);
      setConvertedTime(converted);
    } catch {
      setConvertedTime("Invalid time or zone");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Time Zone Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="datetime-local"
          value={fromTime}
          onChange={(e) => setFromTime(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">From Time Zone</label>
            <Select value={fromZone} onValueChange={setFromZone}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {timeZones.map((tz) => (
                  <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">To Time Zone</label>
            <Select value={toZone} onValueChange={setToZone}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {timeZones.map((tz) => (
                  <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="button" onClick={convertTime}>Convert</Button>
        {convertedTime && (
          <div className="p-4 bg-muted/50 rounded font-mono">
            Converted Time: {convertedTime}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TimeZoneConverter;
