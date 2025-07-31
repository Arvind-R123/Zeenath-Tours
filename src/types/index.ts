export interface User {
  id: number;
  email: string;
  name: string;
  token?: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface SubCategory {
  id: number;
  name: string;
  description: string;
  categoryId: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  subCategoryId: number;
  imageUrl: string;
  stock: number;
}