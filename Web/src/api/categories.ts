import { baseApi } from "./index";
interface Category {
  Category: [];
}
export const getAllCategory = async (
  response?: Category[] | null
): Promise<Category[] | null> => {
  try {
    const response = await baseApi.get<Category[]>("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching category", error);
    return null;
  }
};
// api/categories.ts

export const fetchCategories = async () => {
  try {
    const response = await fetch("http://localhost:3000/categories");
    if (!response.ok) {
      throw new Error("Không lấy được danh mục");
    }
    const data = await response.json();
    return data; // Trả về dữ liệu
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch('http://localhost:3000/categories');
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};
