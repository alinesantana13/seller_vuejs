import { Auth } from "@/auth";

class Order {
  readonly apiUrl: string = import.meta.env.VITE_API_SERVER_URL;
  private auth: Auth = new Auth();

  async GetOrders(state?: string, id?: number | null) {
    const token = this.auth.isLoggedIn() ? this.auth.getFallbackToken('token') : null;
    try {
      const url = new URL(`${this.apiUrl}/buyers/orders?`);

      if (state) {
        url.searchParams.append('state', state);
      }

      if (id) {
        url.searchParams.append('id', id.toString());
      }
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

  async UpdateOrder(id: number, state: string) {
    const token = this.auth.isLoggedIn() ? this.auth.getFallbackToken('token') : null;
    console.log(id)
    console.log(state)
    try {
      const url = new URL(`${this.apiUrl}/buyers/orders/${id}`);
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": import.meta.env.VITE_API_KEY,
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ state: state })
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

}

export { Order }


