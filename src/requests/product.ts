import { Auth } from "@/auth";

class Product {
  readonly apiUrl: string = import.meta.env.VITE_API_SERVER_URL;
  private auth: Auth = new Auth();

  async GetProducts(id: number, page: number = 1) {
    try {
      const url = new URL(`${this.apiUrl}/stores/${id}/products`);
      url.searchParams.append('page', page.toString());

      const token = this.auth.isLoggedIn() ? this.auth.getFallbackToken('token') : null;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": import.meta.env.VITE_API_KEY,
          "Authorization": `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error("Error when searching for the products");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error when searching for the products:", error);
      throw error;
    }
  }

  async GetProduct(idStore: number, idProduct: number) {
    try {
      const url = new URL(`${this.apiUrl}/stores/${idStore}/products/${idProduct}`);
      const token = this.auth.isLoggedIn() ? this.auth.getFallbackToken('token') : null;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": import.meta.env.VITE_API_KEY,
          "Authorization": `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error("Error when searching for the product");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error when searching for the product:", error);
      throw error;
    }
  }

  async CreateProduct(storeId: number, formData: FormData) {
    const token = this.auth.isLoggedIn() ? this.auth.getFallbackToken('token') : null;
    try {
      const response = await fetch(`${this.apiUrl}/stores/${storeId}/products`, {
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

  async UpdateProduct(storeId: number, productId: number, formData: FormData) {
    const token = this.auth.isLoggedIn() ? this.auth.getFallbackToken('token') : null;
    try {
      const response = await fetch(`${this.apiUrl}/stores/${storeId}/products/${productId}`, {
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

  async DeleteProduct(storeId: number, productId: number) {
    const token = this.auth.isLoggedIn() ? this.auth.getFallbackToken('token') : null;
    try {
      const response = await fetch(`${this.apiUrl}/stores/${storeId}/products/${productId}`, {
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

export { Product }


