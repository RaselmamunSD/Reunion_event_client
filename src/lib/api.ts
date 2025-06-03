const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ApiConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers: {
    'Content-Type': string;
    'Accept': string;
  };
  credentials?: 'include';
  body?: string;
}

export const apiRequest = async (endpoint: string, config: ApiConfig) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...config,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...config.headers,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Example usage functions
export const api = {
  // GET request
  get: (endpoint: string) =>
    apiRequest(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }),

  // POST request
  post: (endpoint: string, data: any) =>
    apiRequest(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data)
    }),

  // PUT request
  put: (endpoint: string, data: any) =>
    apiRequest(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data)
    }),

  // DELETE request
  delete: (endpoint: string) =>
    apiRequest(endpoint, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
};

const fetchData = async () => {
  try {
    const response = await fetch('https://reunion-backend-server.onrender.com/api/your-endpoint', {
      method: 'POST', // or 'GET', 'PUT', etc.
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include', // if you're using cookies
      // body: JSON.stringify(yourData) // Commented out as yourData is not defined
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
