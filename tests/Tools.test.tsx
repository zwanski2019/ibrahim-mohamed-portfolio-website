import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Tools from '@/pages/Tools';

vi.mock('@/components/Navbar', () => ({ default: () => <div>Navbar</div> }));
vi.mock('@/components/Footer', () => ({ default: () => <div>Footer</div> }));
vi.mock('@/components/IMEIChecker', () => ({ default: () => <div>IMEIChecker</div> }));
vi.mock('@/components/SEOHelmet', () => ({ SEOHelmet: () => <></> }));

import { LanguageProvider } from '@/context/LanguageContext';

describe('Tools page', () => {
  it('displays all tool titles', () => {
    render(
      <LanguageProvider>
        <Tools />
      </LanguageProvider>
    );

    const titles = [
      'Free IMEI Check',
      'Password Generator',
      'QR Code Generator',
      'URL Shortener',
      'Color Picker & Palette Generator',
      'JSON Formatter',
      'Time Zone Converter',
      'Image Compressor',
    ];

    for (const title of titles) {
      expect(screen.getByText(title)).toBeInTheDocument();
    }
  });
});
