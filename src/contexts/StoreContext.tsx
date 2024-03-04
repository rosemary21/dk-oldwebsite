/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import {
  StoreItemProps,
  contextProvider,
  CartItemProps,
} from "../types/contexts";
import useLocalStorage from "../hooks/useLocalStorage";
import { InitializeCardProp } from "../types/Store";

export interface StoreContextProps {
  isNewsLetterSuccess: boolean;
  setIsNewsLetterSuccess: React.Dispatch<React.SetStateAction<boolean>>;

  isOrderSuccess: boolean;
  setIsOrderSuccess: React.Dispatch<React.SetStateAction<boolean>>;

  isMailSuccess: boolean;
  setIsMailSuccess: React.Dispatch<React.SetStateAction<boolean>>;

  getStoreItem: (id: number, store: StoreItemProps[]) => void;

  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;

  activeLoginTab: string;
  setActiveLoginTab: React.Dispatch<React.SetStateAction<string>>;

  activeSignInTab: string;
  setActiveSignInTab: React.Dispatch<React.SetStateAction<string>>;

  unboardStore: any;
  setUnboardStore: any;

  userToken: any;
  setUserToken: any;

  userName: any;
  setUserName: any;

  selectedItem: StoreItemProps;
  setSelectedItem: React.Dispatch<React.SetStateAction<StoreItemProps>>;

  cartQty: number;

  cartItems: CartItemProps[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItemProps[]>>;

  getItemQty: (id: number) => number;

  increaseCartQty: (id: number) => void;

  decreaseCartQty: (id: number) => void;

  removeFromCart: (id: number) => void;

  totalOrderPrice: number;
  setTotalOrderPrice: React.Dispatch<React.SetStateAction<number>>;

  setInitialiseCardStates: React.Dispatch<
    React.SetStateAction<InitializeCardProp>
  >;

  initialiseCardStates: InitializeCardProp;

  isPaymentSuccess: boolean;
  setIsPaymentSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const StoreContext = createContext({} as StoreContextProps);

export function useStoreContext() {
  return useContext(StoreContext);
}

export function StoreContextProvider({ children }: contextProvider) {
  //     // MODALS
  const [isNewsLetterSuccess, setIsNewsLetterSuccess] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [isMailSuccess, setIsMailSuccess] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  // Store State
  const [cartItems, setCartItems] = useLocalStorage<CartItemProps[]>(
    "cartItems",
    []
  );
  const [selectedItem, setSelectedItem] = useLocalStorage<StoreItemProps>(
    "selectedItem",
    {} as StoreItemProps
  );

  // Checkout state
  const [activeTab, setActiveTab] = useState("sign-in");

  // This is the active tab for login/create acc page.
  const [activeLoginTab, setActiveLoginTab] = useState("sign-in");

  // This is the store that the user is unboarding from.
  // It can either be fashion, art-craft, property, etc
  const [unboardStore, setUnboardStore] = useLocalStorage<string>(
    "unboardStore",
    "clothing"
  );

  // Stores user token
  const [userToken, setUserToken] = useLocalStorage<string>("userToken", "");

  // Stores customer username onsignin
  const [userName, setUserName] = useLocalStorage<string>("userName", "");

  // Store signin/create acc active tab
  const [activeSignInTab, setActiveSignInTab] = useState("sign-in");

  // // Get store item for art&craft and fashion as a joint store
  function getStoreItem(id: number, store: StoreItemProps[]) {
    const propObj = store.find((item) => item.id === id);
    if (propObj) return setSelectedItem(propObj);
  }

  // Get Item quantity
  function getItemQty(id: number) {
    return (cartItems && cartItems.find((item) => item.id === id)?.qty) || 0;
  }

  // Increase cart quantity
  function increaseCartQty(id: number) {
    setCartItems((currItems) => {
      if (currItems?.find((item) => item.id === id) == null) {
        return [...currItems, { id, qty: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  // Decrease cart quantity
  function decreaseCartQty(id: number) {
    setCartItems((currItems) => {
      if (currItems?.find((item) => item.id === id)?.qty == 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, qty: item.qty - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  // Store total cart quantity displayed on the navbar
  const cartQty = cartItems.reduce((qty, item) => item.qty + qty, 0);

  // store total order amount
  const [totalOrderPrice, setTotalOrderPrice] = useState<number>(0);

  // Store Initialise Cards states
  const [initialiseCardStates, setInitialiseCardStates] = useState(
    {} as InitializeCardProp
  );

  const contextValues = {
    isNewsLetterSuccess,
    setIsNewsLetterSuccess,
    isOrderSuccess,
    setIsOrderSuccess,
    isMailSuccess,
    setIsMailSuccess,
    getStoreItem,
    activeTab,
    setActiveTab,
    activeLoginTab,
    setActiveLoginTab,
    unboardStore,
    setUnboardStore,
    userToken,
    setUserToken,
    userName,
    setUserName,
    activeSignInTab,
    setActiveSignInTab,
    selectedItem,
    setSelectedItem,
    cartItems,
    setCartItems,
    getItemQty,
    increaseCartQty,
    decreaseCartQty,
    removeFromCart,
    cartQty,
    totalOrderPrice,
    setTotalOrderPrice,
    initialiseCardStates,
    setInitialiseCardStates,
    isPaymentSuccess,
    setIsPaymentSuccess,
  };
  return (
    <StoreContext.Provider value={contextValues}>
      {children}
    </StoreContext.Provider>
  );
}

// Add to cart
// function addToCart(id: number, product: StoreItemProps) {
//   // Find the item in the cartItem [], if the item is found,
//   // increase its quantity else create a  quantity of 1 for it
//   if (cartItems.find(item => item.id === id)) {
//     setCartItems(prev => {
//       return [...prev].map(item => {
//         if (item.id === id) {
//           return {...item, qty: item.qty && item.qty + 1}
//         } else {
//           return item
//         }
//       })
//     })
//   } else {
//     return setCartItems([...cartItems, {...product, qty: 1}])
//   }
// }
