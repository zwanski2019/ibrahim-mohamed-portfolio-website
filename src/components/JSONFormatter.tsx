import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const JSONFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e) {
      setError('Invalid JSON');
      setOutput('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>JSON Formatter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} />
        <Button onClick={formatJson}>Format</Button>
        {output && <pre data-testid="result">{output}</pre>}
        {error && <p role="alert">{error}</p>}
      </CardContent>
    </Card>
  );
};

export default JSONFormatter;
