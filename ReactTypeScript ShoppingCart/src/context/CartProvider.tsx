import { ReactElement, createContext, useMemo, useReducer } from "react";

export type CartItemType = {
  sku: string;
  name: string;
  price: number;
  qty: number;
};

//status cart
type CartStateType = { cart: CartItemType[] };

//initialize nilai awal cart array kosong
const initCartState: CartStateType = { cart: [] };

//action yang bisa dilakukan pada cart
const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: CartItemType;
};

//cart context reducer
const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error("action.payload missing in ADD actions");
      }
      const { sku, name, price } = action.payload;
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku //mengambil item yang memiliki sku tidak sama
        //dengan yang sudah ada
      );
      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku //mencari barang dengan sku yang sama dengan yang diambil
        //sebelumnya, jika ada masuk ke itemExists, kalau tidak ada jadi undefined
      );
      //kalau barang sudah ada, plus 1 quantity
      const qty: number = itemExists ? itemExists.qty + 1 : 1;
      return { ...state, cart: [...filteredCart, { sku, name, price, qty }] };
    }

    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error("action.payload missing in REMOVE actions");
      }
      const { sku } = action.payload;
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku //mencari data yang mau dihapus
      );
      return { ...state, cart: [...filteredCart] }; //membuat state baru dengan card yang
      // sudah di filter
    }

    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error("action.payload missing in QUANTITY actions");
      }
      const { sku, qty } = action.payload;
      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku //mencari item dengan sku yang sama
      );
      if (!itemExists) {
        throw new Error("Item must exist in order to update quantity");
      }
      const updatedItem: CartItemType = { ...itemExists, qty }; //update cart dan mengganti qty
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku //filter lagi data yang tidak berubah
      );
      return { ...state, cart: [...filteredCart, updatedItem] }; //gabungkan kembali data
    }

    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] }; //saat submit, cart akan kosong
    }
    default:
      throw new Error("Unidentified reducer action type");
  }
};

//useCartContext
const useCartContext = (initCartState: CartStateType) => {
  //state saat ini dari cart, dispatch untuk mengirim action memperbarui state
  const [state, dispatch] = useReducer(reducer, initCartState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const totalItems = state.cart.reduce((previousValue, cartItem) => {
    return previousValue + cartItem.qty; //menghitung total item dalam cart
  }, 0);

  const totalPrice = new Intl.NumberFormat("id-ID", {
    //menghitung total harga item dlm cart
    style: "currency",
    currency: "IDR",
  }).format(
    state.cart.reduce((previousValue, cartItem) => {
      return previousValue + cartItem.qty * cartItem.price;
    }, 0)
  );

  const cart = state.cart.sort((a, b) => {
    //mengurutkan item cart berdasarkan sku
    const itemA = Number(a.sku.slice(-1)); //Diecast1 ambil angka 1 saja
    const itemB = Number(b.sku.slice(-1));
    return itemA - itemB; //pakai selisih
  });

  return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart };
};

export type useCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: useCartContextType = {
  //declare nilai awal
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: "",
  cart: [],
};

export const CartContext =
  createContext<useCartContextType>(initCartContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

//menyediakan nilai context ke komponen di bawahnya
export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initCartState)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
