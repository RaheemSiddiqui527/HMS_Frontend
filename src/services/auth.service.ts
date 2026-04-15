export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const authService = {
  /**
   * Primary Login handler mapped exactly to the active backend POST route.
   */
  async login(credentials: Record<string, any>) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to login");
    }
    return data;
  },

  /**
   * Unified Registration handler communicating with the backend register POST route.
   */
  async register(registrationData: Record<string, any>) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registrationData),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to register");
    }
    return data;
  }
};
