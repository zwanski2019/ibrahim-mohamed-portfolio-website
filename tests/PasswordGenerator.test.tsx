import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PasswordGenerator from '@/components/PasswordGenerator';

describe('PasswordGenerator', () => {
  it('generates a password with specified length', () => {
    render(<PasswordGenerator />);
    const lengthInput = screen.getByRole('spinbutton');
    fireEvent.change(lengthInput, { target: { value: '8' } });
    fireEvent.click(screen.getByText(/generate/i));
    expect(screen.getByTestId('result').textContent).toHaveLength(8);
  });
});
