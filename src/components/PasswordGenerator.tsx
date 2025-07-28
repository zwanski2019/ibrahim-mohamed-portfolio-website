import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState("");

  function generate(len: number) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let pass = "";
    for (let i = 0; i < len; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pass;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPassword(generate(length));
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Password Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="pass-length" className="block mb-1 text-sm font-medium">
              Length
            </label>
            <Input
              id="pass-length"
              type="number"
              min={4}
              max={64}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>
          <Button type="submit">Generate</Button>
        </form>
        {password && (
          <div className="p-4 bg-muted/50 rounded font-mono break-all" aria-live="polite">
            {password}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
