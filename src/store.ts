import { Auth } from "@/auth";

class Store {
  readonly apiUrl: string = import.meta.env.VITE_API_SERVER_URL;
  private auth: Auth = new Auth();

  async GetStores() {
    const token = this.auth.isLoggedIn() ? this.auth.getFallbackToken('token') : null;
    try {
      const response = await fetch(`${this.apiUrl}/stores`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": import.meta.env.VITE_API_KEY,
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar as lojas");
      }
      const data = await response.json();
      return data;

    } catch (error) {
      console.error("Erro ao buscar as lojas:", error);
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
        throw new Error("Erro ao buscar as lojas");
      }
      const data = await response.json();
      return data;

    } catch (error) {
      console.error("Erro ao buscar as lojas:", error);
      throw error;
    }
  }


  async UpdateStore(id: number, name: string) {
    const token = this.auth.isLoggedIn() ? this.auth.getFallbackToken('token') : null;
    try {
      const body = {
        store: {
          name
        }
      }

      const response = await fetch(`${this.apiUrl}/stores/${id}`, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": import.meta.env.VITE_API_KEY,
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar as lojas");
      }
      const data = await response.json();
      return data;

    } catch (error) {
      console.error("Erro ao buscar as lojas:", error);
      throw error;
    }
  }

}

export { Store }


