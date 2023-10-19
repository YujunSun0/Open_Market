import { Detail } from "../components/product_detail/detail";

const DetailPage = ({convertPrice, cart, setCart}) => {
  return (
    <Detail convertPrice={convertPrice} cart={cart} setCart={setCart} />
  )
  
};

export default DetailPage;
