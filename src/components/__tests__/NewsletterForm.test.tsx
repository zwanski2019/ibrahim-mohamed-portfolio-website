import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewsletterForm from '../NewsletterForm';
import { toast } from 'sonner';

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('NewsletterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('renders the form fields', () => {
    render(<NewsletterForm />);
    expect(
      screen.getByText(/Subscribe to our Newsletter/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  });

  it('submits the form successfully', async () => {
    render(<NewsletterForm />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Join the Magic/i }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        'Successfully subscribed to the newsletter!',
        expect.any(Object)
      );
    }, { timeout: 1500 });

    expect(screen.getByLabelText(/Name/i)).toHaveValue('');
    expect(screen.getByLabelText(/Email/i)).toHaveValue('');
  });

  it('handles submission errors', async () => {
    (toast.success as jest.Mock).mockImplementation(() => {
      throw new Error('fail');
    });

    render(<NewsletterForm />);
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Join the Magic/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Failed to subscribe',
        expect.any(Object)
      );
    }, { timeout: 1500 });
  });
});
