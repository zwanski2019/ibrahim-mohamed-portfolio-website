import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const JSONFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (err) {
      setError("Invalid JSON");
      setOutput("");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>JSON Formatter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste JSON here"
          rows={5}
        />
        <Button type="button" onClick={format}>
          Format
        </Button>
        {error && <p className="text-destructive text-sm">{error}</p>}
        {output && <Textarea readOnly value={output} rows={5} className="font-mono" />}
      </CardContent>
    </Card>
  );
};

export default JSONFormatter;
