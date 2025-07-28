import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const upper = letters.toUpperCase();
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()-_=+[]{}";
    let chars = letters + upper;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    let result = "";
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Password Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium" htmlFor="length">Length</label>
          <Input
            id="length"
            type="number"
            min={4}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="numbers" checked={includeNumbers} onCheckedChange={(v) => setIncludeNumbers(!!v)} />
          <label htmlFor="numbers" className="text-sm">Include Numbers</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="symbols" checked={includeSymbols} onCheckedChange={(v) => setIncludeSymbols(!!v)} />
          <label htmlFor="symbols" className="text-sm">Include Symbols</label>
        </div>
        <Button type="button" onClick={generatePassword}>Generate</Button>
        {password && (
          <Input readOnly value={password} className="font-mono" />
        )}
      </CardContent>
    </Card>
  );
};

export default PasswordGenerator;
