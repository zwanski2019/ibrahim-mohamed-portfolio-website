# check-imei Edge Function

This Supabase Edge Function queries the ifreeicloud IMEI API. A simple in-memory rate limiter prevents abuse by tracking requests per user or IP address.

## Adjusting rate limits

Rate limits are defined in [`index.ts`](./index.ts). Update `MAX_REQUESTS_PER_WINDOW` to change how many requests are allowed per window and `RATE_LIMIT_WINDOW_MS` to change the length of the window (in milliseconds).
