import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import JSONFormatter from '@/components/JSONFormatter';

describe('JSONFormatter', () => {
  it('formats valid JSON', () => {
    render(<JSONFormatter />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '{"a":1}' } });
    fireEvent.click(screen.getByRole('button', { name: /format/i }));
    const outputs = screen.getAllByRole('textbox');
    expect(outputs[1].value.trim()).toBe('{\n  "a": 1\n}');
  });

  it('shows error on invalid JSON', () => {
    render(<JSONFormatter />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '{a}' } });
    fireEvent.click(screen.getByRole('button', { name: /format/i }));
    expect(screen.getByText('Invalid JSON')).toBeInTheDocument();
  });
});
