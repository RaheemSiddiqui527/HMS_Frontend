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
  },

  /**
   * Helper to decode current user from token
   */
  getCurrentUser() {
    if (typeof window === 'undefined') return null;
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  },

  async logout() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await fetch(`${API_URL}/auth/logout`, {
          method: "POST",
          headers: { 
            "Authorization": `Bearer ${token}`
          },
        });
      } catch (e) {
        console.error("Failed to revoke session on server", e);
      }
    }
    localStorage.removeItem('token');
  },

  async getSessions() {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/auth/sessions`, {
      headers: { 
        "Authorization": `Bearer ${token}`
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch sessions");
    return data.data;
  },

  async revokeSession(sessionId: string) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/auth/sessions/${sessionId}`, {
      method: "DELETE",
      headers: { 
        "Authorization": `Bearer ${token}`
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to revoke session");
    return data;
  },

  async revokeAllOtherSessions() {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/auth/sessions`, {
      method: "DELETE",
      headers: { 
        "Authorization": `Bearer ${token}`
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to revoke other sessions");
    return data;
  }
};
