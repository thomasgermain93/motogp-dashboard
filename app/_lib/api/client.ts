const BASE_URL = 'https://api.motogp.pulselive.com/motogp/v1';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit,
  retries = MAX_RETRIES
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'MotoGP-Dashboard/1.0 (Personal Project)',
        ...options?.headers,
      },
      next: {
        revalidate: 300, // 5 minutes default
      },
    });

    if (!response.ok) {
      if (response.status === 429 && retries > 0) {
        await sleep(RETRY_DELAY * (MAX_RETRIES - retries + 1));
        return fetchApi(endpoint, options, retries - 1);
      }
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    if (retries > 0) {
      await sleep(RETRY_DELAY);
      return fetchApi(endpoint, options, retries - 1);
    }
    throw error;
  }
}

export async function fetchWithCache<T>(
  endpoint: string,
  revalidate: number = 300
): Promise<T> {
  return fetchApi<T>(endpoint, {
    next: { revalidate },
  });
}
