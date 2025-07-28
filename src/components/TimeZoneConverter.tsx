import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const zones = ["UTC", "America/New_York", "Europe/London", "Asia/Tokyo"];

export default function TimeZoneConverter() {
  const [datetime, setDatetime] = useState("");
  const [fromZone, setFromZone] = useState("UTC");
  const [toZone, setToZone] = useState("America/New_York");
  const [result, setResult] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!datetime) return;
    const date = new Date(datetime);
    const utc = new Date(date.toLocaleString("en-US", { timeZone: fromZone }));
    const converted = utc.toLocaleString("en-US", { timeZone: toZone });
    setResult(converted);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Time Zone Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="datetime" className="block mb-1 text-sm font-medium">
              Date & Time
            </label>
            <Input
              id="datetime"
              type="datetime-local"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label htmlFor="from" className="block mb-1 text-sm font-medium">
                From
              </label>
              <select
                id="from"
                value={fromZone}
                onChange={(e) => setFromZone(e.target.value)}
                className="w-full border rounded p-2 bg-background"
              >
                {zones.map((z) => (
                  <option key={z}>{z}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label htmlFor="to" className="block mb-1 text-sm font-medium">
                To
              </label>
              <select
                id="to"
                value={toZone}
                onChange={(e) => setToZone(e.target.value)}
                className="w-full border rounded p-2 bg-background"
              >
                {zones.map((z) => (
                  <option key={z}>{z}</option>
                ))}
              </select>
            </div>
          </div>
          <Button type="submit">Convert</Button>
        </form>
        {result && (
          <div className="p-4 bg-muted/50 rounded" aria-live="polite">
            {result}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
