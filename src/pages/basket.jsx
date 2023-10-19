import { Cart } from "../components/cart/cart";

const Basket = ({cart,setCart,convertPrice,checkList,setCheckList}) => {
  return <Cart cart={cart} setCart={setCart} convertPrice={convertPrice} checkList={checkList} setCheckList={setCheckList} />;
};

export default Basket;
