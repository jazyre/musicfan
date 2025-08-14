interface RetryOptions {
  maxRetries?: number;
  delay?: number;
  exponentialBackoff?: boolean;
}

export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    delay = 1000,
    exponentialBackoff = true
  } = options;

  let lastError: Error | null = null;

  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      // If this was the last attempt, throw the error
      if (i === maxRetries) {
        throw lastError;
      }
      
      // Calculate delay
      const currentDelay = exponentialBackoff 
        ? delay * Math.pow(2, i) 
        : delay;
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, currentDelay));
    }
  }
  
  // This should never be reached, but TypeScript needs it
  throw lastError || new Error('Unknown error occurred');
}

export async function fetchWithRetry(
  input: RequestInfo,
  init?: RequestInit,
  options?: RetryOptions
): Promise<Response> {
  return retry(async () => {
    const response = await fetch(input, init);
    
    // Throw error for HTTP error statuses
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response;
  }, options);
}