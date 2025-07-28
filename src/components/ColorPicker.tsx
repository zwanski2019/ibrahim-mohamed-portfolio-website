import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function adjustLightness(hex: string, percent: number) {
  const num = parseInt(hex.replace("#", ""), 16);
  let r = (num >> 16) + percent;
  let g = ((num >> 8) & 0x00ff) + percent;
  let b = (num & 0x0000ff) + percent;
  r = Math.max(Math.min(255, r), 0);
  g = Math.max(Math.min(255, g), 0);
  b = Math.max(Math.min(255, b), 0);
  return `#${(b | (g << 8) | (r << 16)).toString(16).padStart(6, "0")}`;
}

const ColorPicker = () => {
  const [color, setColor] = useState("#008cff");
  const [copied, setCopied] = useState(false);

  const palette = [
    adjustLightness(color, -40),
    adjustLightness(color, -20),
    color,
    adjustLightness(color, 20),
    adjustLightness(color, 40),
  ];

  const copy = async () => {
    await navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Color Picker & Palette</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-16 h-16 p-0 border-none"
          />
          <span className="font-mono">{color}</span>
          <Button type="button" onClick={copy}>
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <div className="flex gap-2">
          {palette.map((c) => (
            <div
              key={c}
              className="w-10 h-10 rounded"
              style={{ backgroundColor: c }}
              title={c}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorPicker;
