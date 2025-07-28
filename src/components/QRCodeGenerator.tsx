import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  const generate = () => {
    if (!text) return;
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
    setQrUrl(url);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>QR Code Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Enter text or URL"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="button" onClick={generate}>Generate</Button>
        {qrUrl && (
          <img src={qrUrl} alt="QR Code" className="mx-auto" />
        )}
      </CardContent>
    </Card>
  );
};

export default QRCodeGenerator;
