import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string | null>(null);

  function handleFormat(e: React.FormEvent) {
    e.preventDefault();
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj, null, 2));
    } catch {
      setOutput("Invalid JSON");
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>JSON Formatter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleFormat} className="space-y-3">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste JSON here"
            rows={5}
          />
          <Button type="submit">Format</Button>
        </form>
        {output && (
          <Textarea value={output} readOnly rows={5} />
        )}
      </CardContent>
    </Card>
  );
}
