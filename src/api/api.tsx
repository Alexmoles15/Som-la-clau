const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export function getApiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_URL}${normalizedPath}`;
}