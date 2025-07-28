import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <label>
          Length
          <Input
            type="number"
            value={length}
            min={1}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </label>
        <Button onClick={generatePassword}>Generate</Button>
        {password && <div data-testid="result">{password}</div>}
      </CardContent>
    </Card>
  );
};

export default PasswordGenerator;
