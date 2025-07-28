import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ColorPicker = () => {
  const [color, setColor] = useState("#ff0000");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Color Picker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <div className="flex items-center space-x-2">
          <Input readOnly value={color} className="w-32 font-mono" />
          <Button type="button" onClick={copy}>{copied ? "Copied" : "Copy"}</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorPicker;
