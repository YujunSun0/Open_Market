import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TopNavigationBar } from "./components/header/topNavigationBar/topNavigationBar";
import Home from "./pages/home";
import DetailPage from "./pages/datailPage";
import Basket from "./pages/basket";
import { useState, useEffect } from 'react';
import { firestore } from "./Firebase";

function App() {
  const [products, setProducts] = useState([]); // Home -> Main 경로로 해서 products에 데이터를 받아옴(배열) / main페이지의 데이터를 담은 상태
  const [cart, setCart] = useState([]); // 장바구니의 목록 상태
  const [checkList, setCheckList] = useState([]); // 체크된 장바구니 리스트를 담은 배열 ( id가 요소로 담김 )

  const convertPrice = (price) => { // 소수점 3자리마다 ,를 찍어주는 정규표현식 -> 가격을 받아 문자열로 변환 후, 컴마를 추가 후 반환(string 타입)
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // products 페이지에서만 쓰인다면 상태를 해당 페이지에서만 사용할 수도 있을듯
  useEffect(() => {
    const bucket = firestore.collection("products");
    bucket.get().then((docs) => {
      const updatedProducts = []; // 새로운 배열 생성
      docs.forEach((doc) => {
        if(doc.exists){
          updatedProducts.push({ id: doc.id, ...doc.data() }); // 새로운 데이터를 배열에 추가
        }
      });
      setProducts(updatedProducts);
    })
  }, [setProducts]);

  return (
    <BrowserRouter>
      <TopNavigationBar cart={cart} />
      <Routes>
        <Route path="/" element={<Home products={products} setProducts={setProducts} convertPrice={convertPrice} />} />
        <Route path="/product/:id" element={<DetailPage convertPrice={convertPrice} cart={cart} setCart={setCart} />} /> {/* 여기의 DetailPage 컴포넌트는 /pages/DetailPage.jsx 이다. */}
        <Route path="/cart" element={<Basket cart={cart} setCart={setCart} convertPrice={convertPrice} checkList={checkList} setCheckList={setCheckList} />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;