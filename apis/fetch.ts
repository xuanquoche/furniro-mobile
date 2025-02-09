export const customFetch = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: any,
  headers: Record<string, string> = {}
): Promise<any> => {
  try {
    const apiUrl = `${process.env.EXPO_PUBLIC_BACKEND_API_URL}/${url}`;

    console.log("API Request:", method, apiUrl);

    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };
    if (body && method !== "GET") {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(apiUrl, options);
    return response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};
