export interface Category {
  _id: string;
  name: string;
}
export interface Data {
  _id: string;
  category: {
    categoryId: string;
    categoryName: string;
    _id?: string;
  };
  description: string;
  hot: number;
  img: string;
  img2: string;
  img3: string;
  img4: string;
  name: string;
  price: number;
  price2: number;
  quantity: number;
}

export type Product = {
  currentPage?: number;
  data: Data[];
  totalPages?: number;
  totalProducts?: number;
};

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  confirm_password: string;
  email: string;
  full_name: string;
}

export interface LoginForm extends LoginRequest {
  remember: boolean;
}

export interface AuthData {
  username: string;
  email: string;
  fullName: string;
  roles: string[];
  accessToken: string;
}

export interface AuthResponse {
  status: number;
  data: {
    accessToken: string;
    roles: ["user", "admin"]; // Role có thể là 'customer' hoặc 'admin'
  };
  message: string;
}

export interface EditProductProps {
  params: { id: string };
}

export interface FormData {
  name: string;
  price: number;
  description: string;
  categoryId: string;
  img?: FileList;
}
