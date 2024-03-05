import { useContext } from "react";
import ProductsContext from "../context/ProductsProvider";
import { UseProductsContextType } from "../context/ProductsProvider";

//untuk mengambil logic dan seluruh komponen yang ada di file ProductProvider
const useProducts = (): UseProductsContextType => {
  return useContext(ProductsContext);
};

export default useProducts;
