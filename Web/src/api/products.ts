import { Data, Product } from "../types";
import { baseApi } from "./index";

export const getAllProducts = async (): Promise<Product | null> => {
  try {
    const response = await baseApi.get<Product>("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    return null;
  }
};
export const getProduct = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await baseApi.get(`/products?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

export const getProductHot = async (): Promise<Product | null> => {
  try {
    const response = await baseApi.get<Product>("/products/hot");
    return response.data;
  } catch (error) {
    console.error("Error fetching new products", error);
    return null;
  }
};
export const getProductDetail = async (id: string): Promise<Data | null> => {
  try {
    const response = await baseApi.get<Data>(`/products/detail/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details", error);
    return null;
  }
};
export const relatedProducts = async (id: string): Promise<Data | null> => {
  try {
    // Thay đổi URL để bao gồm productId trong query parameters
    const response = await baseApi.get<Data>(`/products/lienquan/${id}`);

    console.log({ response: typeof response.data });

    return response.data;
  } catch (error) {
    console.error("Error fetching product relatedProducts", error);
    return null;
  }
};

export const addProduct = async (product: Product): Promise<Data | null> => {
  try {
    const response = await baseApi.post<Data, Product>(
      "/products/add",
      product
    );
    return response.data;
  } catch (error) {
    console.error("Error adding new product", error);
    return null;
  }
};

export const updateProduct = async (id: string, formData: FormData) => {
  const res = await fetch(`http://localhost:3000/products/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
};

export const deleteProduct = async (
  id: string
): Promise<{ ProductDelete: Data } | null> => {
  try {
    const response = await baseApi.delete(`/products/${id}`);
    return response.data as { ProductDelete: Data };
  } catch (error) {
    console.error("Error deleting product", error);
    return null;
  }
};
