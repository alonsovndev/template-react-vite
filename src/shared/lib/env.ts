const DEV_API_BASE_URL = "http://localhost:8080";

function resolveApiBaseUrl(): string {
  const configured = import.meta.env.VITE_API_BASE_URL;
  if (configured) {
    return configured.replace(/\/+$/, "");
  }
  // A production build without this variable would silently call localhost, so fail instead.
  if (!import.meta.env.DEV) {
    throw new Error("VITE_API_BASE_URL must be set when building for production");
  }
  return DEV_API_BASE_URL;
}

// VITE_ variables are bundled into client code and are public: never put secrets here.
export const env = {
  apiBaseUrl: resolveApiBaseUrl(),
};
