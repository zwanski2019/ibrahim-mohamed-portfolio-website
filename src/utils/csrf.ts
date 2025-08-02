export function getCsrfToken(): string | undefined {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('csrf-token='))
    ?.split('=')[1];
}
