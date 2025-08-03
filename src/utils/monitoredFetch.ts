import { supabase } from "@/integrations/supabase/client";

type ErrorLog = {
  path: string;
  method: string;
  status_code: number;
  error_message: string;
  client_info?: Record<string, unknown>;
};

export async function logFetchError(log: ErrorLog) {
  try {
    // Use native fetch to avoid infinite recursion with monitoredFetch
    const response = await window.fetch(`https://ceihcnfngpmrtqunhaey.supabase.co/rest/v1/api_error_logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlaWhjbmZuZ3BtcnRxdW5oYWV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMTIwNzMsImV4cCI6MjA2NTY4ODA3M30.I2Yit_peN5PiTq54Y-4hrDowH3wEWa7lZPT0UgKdXSc',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlaWhjbmZuZ3BtcnRxdW5oYWV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMTIwNzMsImV4cCI6MjA2NTY4ODA3M30.I2Yit_peN5PiTq54Y-4hrDowH3wEWa7lZPT0UgKdXSc',
        'Content-Profile': 'public',
        'Prefer': ''
      },
      body: JSON.stringify({
        path: log.path,
        method: log.method,
        status_code: log.status_code,
        error_message: log.error_message,
        client_info: log.client_info ?? { userAgent: navigator.userAgent }
      })
    });
    
    if (!response.ok) {
      // Silently fail to prevent infinite recursion
      console.warn('Failed to log error to Supabase:', response.status);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Failed to log fetch error", e);
  }
}

export async function monitoredFetch(input: RequestInfo | URL, init?: RequestInit) {
  const method = init?.method ?? "GET";
  const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
  try {
    const res = await fetch(input, init);
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      logFetchError({ path: url, method, status_code: res.status, error_message: text });
    }
    return res;
  } catch (error) {
    logFetchError({ path: url, method, status_code: 0, error_message: String(error) });
    throw error;
  }
}
