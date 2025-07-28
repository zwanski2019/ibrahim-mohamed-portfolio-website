import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);

  async function handleCompress() {
    if (!file) return;
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressedUrl(URL.createObjectURL(blob));
          }
        },
        "image/jpeg",
        0.7
      );
    };
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Image Compressor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <Button type="button" onClick={handleCompress} disabled={!file}>
          Compress
        </Button>
        {compressedUrl && (
          <a href={compressedUrl} download="compressed.jpg" className="underline text-primary">
            Download Compressed Image
          </a>
        )}
      </CardContent>
    </Card>
  );
}
