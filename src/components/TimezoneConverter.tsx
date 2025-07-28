import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const zones = [
  "UTC",
  "America/New_York",
  "Europe/London",
  "Asia/Tokyo",
];

const TimezoneConverter = () => {
  const [date, setDate] = useState("");
  const [zone, setZone] = useState(zones[0]);
  const [result, setResult] = useState("");

  const convert = () => {
    if (!date) return;
    const d = new Date(date);
    const formatted = d.toLocaleString("en-US", { timeZone: zone });
    setResult(formatted);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Time Zone Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
        <select value={zone} onChange={(e) => setZone(e.target.value)} className="border rounded p-2 w-full">
          {zones.map((z) => (
            <option key={z} value={z}>{z}</option>
          ))}
        </select>
        <Button type="button" onClick={convert}>Convert</Button>
        {result && <Input readOnly value={result} className="font-mono" />}
      </CardContent>
    </Card>
  );
};

export default TimezoneConverter;
