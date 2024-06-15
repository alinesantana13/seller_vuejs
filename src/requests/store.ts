import { Auth } from "@/auth";

class Store {
  readonly apiUrl: string = import.meta.env.VITE_API_SERVER_URL;
  private auth: Auth = new Auth();

  async GetStores(page: number = 1) {
    const token = this.auth.isLoggedIn() ? this.auth.getFallbackToken('token') : null;
    try {
      const url = new URL(`${this.apiUrl}/stores`);
      url.searchParams.append('page', page.toString());
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": import.meta.env.VITE_API_KEY,
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error("Error when searching for the stores");
      }
      const data = await response.json();
      return data;

    } catch (error) {
      console.error("Error when searching for the stores:", error);
      throw error;
    }
  }

  async GetStore(id: number) {
    const token = this.auth.isLoggedIn() ? this.auth.getFallbackToken('token') : null;
    try {
      const response = await fetch(`${this.apiUrl}/stores/${id}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": import.meta.env.VITE_API_KEY,
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error("Error when searching for the store");
      }
      const data = await response.json();
      return data;

    } catch (error) {
      console.error("Error when searching for the store:", error);
      throw error;
    }
  }

  async CreateStore(formData: FormData) {
    const token = this.auth.isLoggedIn() ? this.auth.getFallbackToken('token') : null;
    try {
      const response = await fetch(`${this.apiUrl}/stores`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "X-API-KEY": import.meta.env.VITE_API_KEY,
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error("Error when creating store");
      }
      const data = await response.json();
      return data;

    } catch (error) {
      console.error("Error when creating store:", error);
      throw error;
    }
  }

  async UpdateStore(id: number, formData: FormData) {
    const token = this.auth.isLoggedIn() ? this.auth.getFallbackToken('token') : null;
    try {
      const response = await fetch(`${this.apiUrl}/stores/${id}`, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "X-API-KEY": import.meta.env.VITE_API_KEY,
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error("Error when updating the store");
      }
      const data = await response.json();
      return data;

    } catch (error) {
      console.error("Error when updating the store:", error);
      throw error;
    }
  }

  async DeleteStore(id: number) {
    const token = this.auth.isLoggedIn() ? this.auth.getFallbackToken('token') : null;
    try {
      const response = await fetch(`${this.apiUrl}/stores/${id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": import.meta.env.VITE_API_KEY,
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error("Error when trying to delete the store");
      }

      return;

    } catch (error) {
      console.error("Error when trying to delete the store:", error);
      throw error;
    }
  }

}

export { Store }


