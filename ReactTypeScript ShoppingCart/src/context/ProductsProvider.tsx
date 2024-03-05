// //import library
// import { ReactElement, createContext, useState, useEffect } from "react";

// //object definition
// //menyediakan format data produk
// export type ProductType = {
//   sku: string;
//   name: string;
//   price: number;
// };

// //array kosong untuk menampung produk
// //const initState: ProductType[] = [];

// //array yang berisi beberapa object product sebagai data awal
// const initState: ProductType[] = [
//   {
//     sku: "Diecast1",
//     name: "Tomica Premium 40 Sprinter Trueno AE86",
//     price: 150000,
//   },
//   {
//     sku: "Diecast2",
//     name: "Tomica Premium 38 Mazda Savanna RX-7",
//     price: 300000,
//   },
//   {
//     sku: "Diecast3",
//     name: "Tomica Premium 36 Honda NSX-R Special Color ",
//     price: 300000,
//   },
//   {
//     sku: "Diecast4",
//     name: "Tomica Premium 08 Nissan Silvia",
//     price: 80000,
//   },
//   {
//     sku: "Diecast5",
//     name: "Tomica Premium 39 Nissan Silvia S13 180SX",
//     price: 175000,
//   },
// ];

// //Context type definition
// //Membuat daftar barang yang tersedia di toko
// export type UseProductsContextType = { products: ProductType[] };

// //initial context state
// //menyediakan rak kosong untuk menampung barang
// const initContextState: UseProductsContextType = { products: [] };

// //CreateContext
// //membuat meja informasi di toko
// //menyimpan dan menyediakan data produk kepada komponen dalam aplikasi
// //initContextState sebagai nilai awal.
// const ProductsContext = createContext<UseProductsContextType>(initContextState);

// //children type
// //menyediakan tiket masuk kedalam toko
// //mendefinisikan tipe data yang digunakan untuk props children.
// //properti children bisa berisi satu atau lebih elemen react
// type ChildrenType = { children?: ReactElement | ReactElement[] };

// //keranjang belanjanya supaya pembeli bisa pakai
// //menyediakan data produk kepada komponen dalam aplikasi react
// //children: ChildrenType -> ketika pelanggan datang ke supermarket menerima keranjang kosong
// export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
//   //useState hook, untuk menyimpan dan mengubah state produk
//   //supermarket punya gudang untuk penyimpanan barang
//   //fungsinya untuk menyimpan stok produk seperti init state
//   //setProduct untuk memperbarui stok produk
//   const [products, setProducts] = useState<ProductType[]>(initState);

//   //react hook useEffect untuk mengambil data dari api
//   // useEffect(() => {
//   //   //React Hook untuk mnangani side effects pada komponen fungsional
//   //   const fetchProduct = async (): Promise<ProductType[]> => {
//   //     const data = await fetch("http://localhost:3500/products")
//   //       .then((res) => {
//   //         return res.json();
//   //       })
//   //       .catch((err) => {
//   //         if (err instanceof Error) console.log(err.message);
//   //       });
//   //     return data;
//   //   };
//   //   fetchProduct().then((products) => setProducts(products));
//   // }, []);

//   return (
//     //menawarkan produk kepada pelanggan
//     //ProductsContext.Provider dari ReactContext API, kita menyediakan product
//     //kedalam context, yang memungkinkan komponen yang ada didalam ProductContext.Provider
//     //bisa untuk mengakses dan menggunakan data produk yang disediakan
//     <ProductsContext.Provider value={{ products }}>
//       {children}
//     </ProductsContext.Provider>
//     //children merupakan orang yang sedang bawa keranjang belanja untuk mengambil barang di supermarket
//     //children didalam ProductsContext.Provider yaitu meletakkan barang yang dipilih kedalam keranjang belanja
//   );
// };

// //papan sebagai petunjuk letak barang tertentu
// //komponen di app bisa import dengan menggunakan konteks ProductsContext untuk mengakses data produk yang disediakan
// export default ProductsContext;

import { createContext, ReactElement, useState, useEffect } from "react";

export type ProductType = {
  sku: string;
  name: string;
  price: number;
};

//const initState: ProductType[] = []
const initState: ProductType[] = [
  {
    sku: "Diecast1",
    name: "Tomica Premium 40 Sprinter Trueno AE86",
    price: 150000,
  },
  {
    sku: "Diecast2",
    name: "Tomica Premium 38 Mazda Savanna RX-7",
    price: 300000,
  },
  {
    sku: "Diecast3",
    name: "Tomica Premium 36 Honda NSX-R Special Color ",
    price: 300000,
  },
  {
    sku: "Diecast4",
    name: "Tomica Premium 08 Nissan Silvia",
    price: 80000,
  },
  {
    sku: "Diecast5",
    name: "Tomica Premium 39 Nissan Silvia S13 180SX",
    price: 175000,
  },
  {
    sku: "Diecast6",
    name: "Tomica Premium 26 Nissan Skyline GT-R R32",
    price: 200000,
  },
];

export type UseProductsContextType = { products: ProductType[] };

const initContextState: UseProductsContextType = { products: [] };

const ProductsContext = createContext<UseProductsContextType>(initContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(initState);

  // useEffect(() => {
  //     const fetchProducts = async (): Promise<ProductType[]> => {
  //         const data = await fetch('http://localhost:3500/products').then(res => {
  //             return res.json()
  //         }).catch(err => {
  //             if (err instanceof Error) console.log(err.message)
  //         })
  //         return data
  //     }

  //     fetchProducts().then(products => setProducts(products))
  // }, [])

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
