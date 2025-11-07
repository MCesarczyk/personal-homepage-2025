type FetchOptions = {
  cache?: RequestCache;
  revalidate?: number | false;
  tags?: string[];
};

export async function fetchFromAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const apiUrl = process.env.API_URL;
  const apiPrefix = process.env.API_PREFIX;
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    throw new Error("API_KEY is not configured");
  }

  const url = `${apiUrl}${apiPrefix}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    cache: options.cache,
    next: {
      revalidate: options.revalidate,
      tags: options.tags,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
