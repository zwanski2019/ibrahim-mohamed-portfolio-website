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
    await supabase.from("api_error_logs").insert({
      path: log.path,
      method: log.method,
      status_code: log.status_code,
      error_message: log.error_message,
      client_info: log.client_info ?? { userAgent: navigator.userAgent },
    });
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
