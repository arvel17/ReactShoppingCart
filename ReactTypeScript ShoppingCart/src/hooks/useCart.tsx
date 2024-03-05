import { useContext } from "react";
import CartContext from "../context/CartProvider";
import { useCartContextType } from "../context/CartProvider";

//untuk mengambil logic dan seluruh komponen yang ada di file CartProvider
const useCart = (): useCartContextType => {
  return useContext(CartContext);
};

export default useCart;
