import { ReactNode } from "react";

export interface contextProvider {
  children: ReactNode;
}

// ** ================ ADMIN CONTEXT =================== ** //
export interface loginStatesProp {
  isLoginSuccessful: boolean;
  isLoginFailed: boolean;
  user: string;
}

// product category response prop
export interface productCategoryProps {
  category: string;
  code: string;
  productCode: string;
  id: number;
  version: number;
}

// ImageList type
export interface imgListProps {
  id: number;
  version: number;
  delFlag: string;
  createdOn: string;
  modifiedOn: string;
  imageUrl: string;
}

// Product description response prop
export interface productDescriptionProps {
  id: number;
  amount: number;
  description: string;
  currency: string;
  imageUrl: string;
  productCode: string;
  code: string;
  location: string;
  productCategoryCode: string;
  recent: string;
  multipartFile: string;
  productCodeList: string;
  productSize: string;
  price: number;
  multipartFileList: string;
  imagesList: imgListProps[];
}

// Admin customers response props
export interface adminCustomerProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: string;
  userName: string;
  phoneNumber: string;
  id: string;
}

export interface StoreItemProps {
  id: number;
  name: string;
  price: number;
  itemImage: string[];
  description: string;
  stockQuantity: number;
  size: number;
  prevLink: string;
  rating: number;
  productDescription: string;
  keyIngredient: string;
  howToApply: string;
  qty?: number
}

export interface CartItemProps {
  id: number;
  qty: number;
}

// Admin stock response props
export interface stockProps {
  id: number;
  productDescriptionCode: string;
  dateTimeStock: string;
  quantity: number;
  productDescription: string;
  productType: string;
  productCategoryCode: string;
  stockStatus: boolean;
  stockCode: string;
}

export interface PropertyStoreProps {
    id: number;
    title: string;
    location: string;
    price: number;
    roomCount: number;
    toiletCount: number;
    images: string[];
    desc: string;
    is3d: boolean;
    navLink: string;
    listDesc: string[];
}

