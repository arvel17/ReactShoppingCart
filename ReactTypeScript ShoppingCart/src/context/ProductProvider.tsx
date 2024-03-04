//import library
import { ReactElement, createContext, useState, useEffect } from "react";

//object definition
//menyediakan format data produk
export type ProductType = {
  sku: string;
  name: string;
  price: number;
};

//array kosong untuk menampung produk
const initState: ProductType[] = [];

//Context type definition
//Membuat daftar barang yang tersedia di toko
export type UseProductsContextType = { products: ProductType[] };

//initial context state
//menyediakan rak kosong untuk menampung barang
const initContextState: UseProductsContextType = { products: [] };

//CreateContext
//membuat meja informasi di toko
//menyimpan dan menyediakan data produk kepada komponen dalam aplikasi
//initContextState sebagai nilai awal.
const ProductsContext = createContext<UseProductsContextType>(initContextState);

//children type
//menyediakan tiket masuk kedalam toko
//mendefinisikan tipe data yang digunakan untuk props children.
//properti children bisa berisi satu atau lebih elemen react
type ChildrenType = { children?: ReactElement | ReactElement[] };

//keranjang belanjanya supaya pembeli bisa pakai
//menyediakan data produk kepada komponen dalam aplikasi react
//children: ChildrenType -> ketika pelanggan datang ke supermarket menerima keranjang kosong
export const ProductProvider = ({ children }: ChildrenType): ReactElement => {
  //useState hook, untuk menyimpan dan mengubah state produk
  //supermarket punya gudang untuk penyimpanan barang
  //fungsinya untuk menyimpan stok produk seperti init state
  //setProduct untuk memperbarui stok produk
  const [products, setProducts] = useState<ProductType[]>(initState);

  //react hook useEffect untuk mengambil data dari api
  useEffect(() => {
    //React Hook untuk mnangani side effects pada komponen fungsional
    const fetchProduct = async (): Promise<ProductType[]> => {
      const data = await fetch("http://localhost:3500/products")
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          if (err instanceof Error) console.log(err.message);
        });
      return data;
    };
    fetchProduct().then((products) => setProducts(products));
  }, []);

  return (
    //menawarkan produk kepada pelanggan
    //ProductsContext.Provider dari ReactContext API, kita menyediakan product
    //kedalam context, yang memungkinkan komponen yang ada didalam ProductContext.Provider
    //bisa untuk mengakses dan menggunakan data produk yang disediakan
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
    //children merupakan orang yang sedang bawa keranjang belanja untuk mengambil barang di supermarket
    //children didalam ProductsContext.Provider yaitu meletakkan barang yang dipilih kedalam keranjang belanja
  );
};

//papan sebagai petunjuk letak barang tertentu
//komponen di app bisa import dengan menggunakan konteks ProductsContext untuk mengakses data produk yang disediakan
export default ProductsContext;
