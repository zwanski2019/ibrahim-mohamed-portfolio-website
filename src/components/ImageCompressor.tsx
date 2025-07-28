import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const ImageCompressor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(80);
  const [result, setResult] = useState<string | null>(null);

  const compress = () => {
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const data = canvas.toDataURL("image/jpeg", quality / 100);
      setResult(data);
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Image Compressor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <div>
          <label className="block text-sm font-medium mb-1">Quality: {quality}%</label>
          <Slider min={10} max={100} step={10} value={[quality]} onValueChange={(v) => setQuality(v[0])} />
        </div>
        <Button type="button" onClick={compress}>Compress</Button>
        {result && <img src={result} alt="compressed" className="max-w-full" />}
      </CardContent>
    </Card>
  );
};

export default ImageCompressor;
