/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";
import {
  adminCustomerProps,
  contextProvider,
  loginStatesProp,
  productCategoryProps,
  productDescriptionProps,
  stockProps,
} from "../types/contexts";
import useLocalStorage from "../hooks/useLocalStorage";


export interface AdminContextProps {
  loginStates: loginStatesProp;
  setLoginStates: React.Dispatch<React.SetStateAction<loginStatesProp>>;

  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;

  productCategories: productCategoryProps[];
  setProductCategories: React.Dispatch<
    React.SetStateAction<productCategoryProps[]>
  >;

  productImgs: string[];
  setProductImgs: React.Dispatch<React.SetStateAction<string[]>>;

  productDescription: productDescriptionProps[];
  setProductDescription: React.Dispatch<
    React.SetStateAction<productDescriptionProps[]>
  >;

  customers: adminCustomerProps[];
  setCustomers: React.Dispatch<React.SetStateAction<adminCustomerProps[]>>;

  stockList: stockProps[];
  setStockList: React.Dispatch<React.SetStateAction<stockProps[]>>;
}

const AdminContext = createContext({} as AdminContextProps);

export function useAdminContext() {
  return useContext(AdminContext);
}

const AdminContextProvider = ({ children }: contextProvider) => {
  // ** States for staff login
  const [loginStates, setLoginStates] = useLocalStorage<loginStatesProp>(
    "loginStates",
    {
      isLoginSuccessful: false,
      isLoginFailed: false,
      user: "",
    }
  );

  const [token, setToken] = useLocalStorage<string>("token", "");

  //   // State for product categories
  const [productCategories, setProductCategories] = useState<
    productCategoryProps[]
  >([]);

    // State for storing product decription images
    const [productImgs, setProductImgs] = useState<string[]>([]);

    // ** State to store list of all description
    const [productDescription, setProductDescription] = useState<productDescriptionProps[]>([]);

  // ** State to store list of admin customers
    const [customers, setCustomers] = useState<adminCustomerProps[]>([]);

    // ** State to store list of all stock
    const [stockList, setStockList] = useState<stockProps[]>([]);
  
  const contextValues = {
    loginStates,
    setLoginStates,
    token,
    setToken,
    productCategories,
    setProductCategories,
    productImgs,
    setProductImgs,
    productDescription,
    setProductDescription,
    customers,
    setCustomers,
    stockList,
    setStockList,
  };

  return (
    <AdminContext.Provider value={contextValues}>
      {children}
    </AdminContext.Provider>
  );
};

export { AdminContext, AdminContextProvider };
