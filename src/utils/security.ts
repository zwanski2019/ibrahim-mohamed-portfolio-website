// Security utilities and configurations

export interface CSPDirectives {
  'default-src': string[];
  'script-src': string[];
  'style-src': string[];
  'img-src': string[];
  'font-src': string[];
  'connect-src': string[];
  'frame-src': string[];
  'object-src': string[];
  'media-src': string[];
  'worker-src': string[];
  'child-src': string[];
  'frame-ancestors': string[];
  'form-action': string[];
  'base-uri': string[];
  'upgrade-insecure-requests'?: boolean;
  'block-all-mixed-content'?: boolean;
}

// Content Security Policy configuration
export const CSP_DIRECTIVES: CSPDirectives = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'", // Required for Vite in development
    "'unsafe-eval'", // Required for some third-party libraries
    "https://ceihcnfngpmrtqunhaey.supabase.co",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://challenges.cloudflare.com"
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'", // Required for styled-components and CSS-in-JS
    "https://fonts.googleapis.com"
  ],
  'img-src': [
    "'self'",
    "data:",
    "blob:",
    "https://ceihcnfngpmrtqunhaey.supabase.co",
    "https://www.google-analytics.com",
    "https://via.placeholder.com"
  ],
  'font-src': [
    "'self'",
    "https://fonts.gstatic.com"
  ],
  'connect-src': [
    "'self'",
    "https://ceihcnfngpmrtqunhaey.supabase.co",
    "wss://ceihcnfngpmrtqunhaey.supabase.co",
    "https://www.google-analytics.com",
    "https://api.cloudflare.com"
  ],
  'frame-src': [
    "'self'",
    "https://challenges.cloudflare.com",
    "https://www.youtube.com",
    "https://www.youtube-nocookie.com"
  ],
  'object-src': ["'none'"],
  'media-src': ["'self'", "https://ceihcnfngpmrtqunhaey.supabase.co"],
  'worker-src': ["'self'", "blob:"],
  'child-src': ["'self'"],
  'frame-ancestors': ["'none'"],
  'form-action': ["'self'"],
  'base-uri': ["'self'"],
  'upgrade-insecure-requests': true,
  'block-all-mixed-content': true
};

// Generate CSP string
export function generateCSPString(directives: CSPDirectives): string {
  return Object.entries(directives)
    .map(([directive, values]) => {
      if (typeof values === 'boolean') {
        return values ? directive : '';
      }
      return `${directive} ${values.join(' ')}`;
    })
    .filter(Boolean)
    .join('; ');
}

// Security headers configuration
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
};

// Input sanitization
export function sanitizeInput(input: string): string {
  // Basic HTML escape
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Email validation with security considerations
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  // Check basic format
  if (!emailRegex.test(email)) return false;
  
  // Check length limits
  if (email.length > 254) return false;
  
  // Check for dangerous patterns
  const dangerousPatterns = [
    /javascript:/i,
    /data:/i,
    /vbscript:/i,
    /<script/i,
    /on\w+=/i
  ];
  
  return !dangerousPatterns.some(pattern => pattern.test(email));
}

// URL validation
export function validateURL(url: string): boolean {
  try {
    const urlObj = new URL(url);
    
    // Only allow HTTP/HTTPS protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return false;
    }
    
    // Prevent localhost and private IP access in production
    if (process.env.NODE_ENV === 'production') {
      const hostname = urlObj.hostname.toLowerCase();
      
      // Block localhost
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return false;
      }
      
      // Block private IP ranges
      const privateIPRegex = /^(10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.)/;
      if (privateIPRegex.test(hostname)) {
        return false;
      }
    }
    
    return true;
  } catch {
    return false;
  }
}

// Rate limiting utilities
interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  constructor(private config: RateLimitConfig) {}
  
  public isAllowed(identifier: string): boolean {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;
    
    // Get existing requests for this identifier
    const existingRequests = this.requests.get(identifier) || [];
    
    // Filter out old requests
    const recentRequests = existingRequests.filter(time => time > windowStart);
    
    // Check if under limit
    if (recentRequests.length >= this.config.maxRequests) {
      return false;
    }
    
    // Add this request
    recentRequests.push(now);
    this.requests.set(identifier, recentRequests);
    
    return true;
  }
  
  public getRemainingRequests(identifier: string): number {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;
    const existingRequests = this.requests.get(identifier) || [];
    const recentRequests = existingRequests.filter(time => time > windowStart);
    
    return Math.max(0, this.config.maxRequests - recentRequests.length);
  }
  
  public reset(identifier: string): void {
    this.requests.delete(identifier);
  }
  
  public cleanup(): void {
    const now = Date.now();
    
    for (const [identifier, requests] of this.requests.entries()) {
      const windowStart = now - this.config.windowMs;
      const recentRequests = requests.filter(time => time > windowStart);
      
      if (recentRequests.length === 0) {
        this.requests.delete(identifier);
      } else {
        this.requests.set(identifier, recentRequests);
      }
    }
  }
}

// Create rate limiters for different endpoints
export const apiRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100
});

export const contactFormRateLimiter = new RateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 5
});

// Cleanup rate limiters periodically
setInterval(() => {
  apiRateLimiter.cleanup();
  contactFormRateLimiter.cleanup();
}, 5 * 60 * 1000); // Every 5 minutes

// Detect potential XSS attempts
export function detectXSS(input: string): boolean {
  const xssPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
    /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
    /<embed\b[^>]*>/gi,
    /<link\b[^>]*>/gi,
    /<meta\b[^>]*>/gi,
    /expression\s*\(/gi,
    /vbscript:/gi,
    /data:text\/html/gi
  ];
  
  return xssPatterns.some(pattern => pattern.test(input));
}

// Generate secure random tokens
export function generateSecureToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
  } else {
    // Fallback for environments without crypto.getRandomValues
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
  }
  
  return result;
}

// CSRF token management
class CSRFTokenManager {
  private static instance: CSRFTokenManager;
  private token: string | null = null;
  
  public static getInstance(): CSRFTokenManager {
    if (!CSRFTokenManager.instance) {
      CSRFTokenManager.instance = new CSRFTokenManager();
    }
    return CSRFTokenManager.instance;
  }
  
  public getToken(): string {
    if (!this.token) {
      this.token = generateSecureToken();
      sessionStorage.setItem('csrfToken', this.token);
    }
    return this.token;
  }
  
  public validateToken(token: string): boolean {
    return token === this.getToken();
  }
  
  public refreshToken(): string {
    this.token = generateSecureToken();
    sessionStorage.setItem('csrfToken', this.token);
    return this.token;
  }
}

export const csrfTokenManager = CSRFTokenManager.getInstance();