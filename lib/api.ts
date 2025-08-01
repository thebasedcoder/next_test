// Define what to do when a 401 is encountered
const handleUnauthorized = async () => {
  // Attempt to refresh the session
  const refreshResponse = await fetch('/api/auth/refresh', {
    method: 'POST',
  });

  if (refreshResponse.ok) {
    // If refresh is successful, return true to indicate a retry is needed
    return true;
  } else {
    // If refresh fails, log the user out by redirecting to login
    // In a real app, you might call a logout function from your auth context
    window.location.href = '/login';
    return false;
  }
};

// Create the intercepted fetch function
export const api = async (url: string, options: RequestInit = {}) => {
  // 1. Make the initial request
  let response = await fetch(url, options);

  // 2. If response is 401, try to refresh and retry
  if (response.status === 401) {
    const shouldRetry = await handleUnauthorized();
    if (shouldRetry) {
      // 3. Retry the request once after successful refresh
      response = await fetch(url, options);
    }
  }

  return response;
};