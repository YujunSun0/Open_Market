import styles from "./cart.module.css";
import { CartHeader } from './cartHeader';
import { CartList } from './cartList';
import { TotalCart } from './totalCart';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const Cart = ({ cart, setCart, convertPrice, checkList, setCheckList }) => {  //cart = Objcet(데이터)를 요소로 갖고있는 Array
  const [total, setTotal] = useState(0);
  
  const handleQuantity = (id, quantity) => { // 장바구니 리스트의 수량을 증가/감소 시키는 함수
    const found = cart.filter(el => el.id === id)[0]; 
    const idx = cart.indexOf(found);
    
    const cartItem = {
      id: found.id,
      image: found.image,
      name: found.name,
      price: found.price,
      quantity: quantity,
      provider: found.provider,
    }
    
    if (quantity === 0) return;
    setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx + 1)]);
  }
  
  const handleDelete = (id) => { // 장바구니 리스트의 아이템을 제거하는 함수 + checkList(배열)의 id가 같은 요소도 지워줌
    const found = cart.filter(el => el.id === id)[0]; //filter메서드는 조건에 맞는 새로운 배열을 반환한다. 여기선 1개의 값만 반환되므로 배열 안 요소를 저장해준다.
    const idx = cart.indexOf(found);
    
    setCart([...cart.slice(0, idx), ...cart.slice(idx + 1)]);
    setCheckList(checkList.filter(check => check !== id));
  }
  
  const handleCheckList = (checked, id) => { // 장바구니 리스트의 체크박스가 체크된 리스트의 아이디를 상태에 추가하는 함수

    if (checked) {
      setCheckList([...checkList, id]) // [1,2,9] / [2]
    } else {
      setCheckList(checkList.filter(el => el !== id)); // checkList의 id와 인자로 받아온 id(필터링 된 id)가 같은것을 제외하고 상태에 반영
    }
  }

  const handleAllCheck = (checked) => { // 헤더의 체크박스를 누르면 리스트가 모두 선택되며, 다시 누르면 모두 선택해제된다
    if (checked) { //cartHeader의 e.target.checked 의 값을 받음
      const checkItems = [];
      cart.map(el => checkItems.push(el.id));
      setCheckList(checkItems);
    } else {
      setCheckList([]);
    }
  }
  
  const isAllChecked = (cart.length === checkList.length) && checkList.length !== 0; // 장바구니가 비어있을 때(checkList의 길이가 0일 때) false 여아 함
  
  const checked = checkList.map((check) => // check는 id값이다. checked는 배열이다.
    cart.filter(el => el.id === check) // 체크된 리스트들을 담는다( cart에 filter 메서드를 사용하니 배열 안 객체 형태로 담아진다 )
  );

  return (
    <>
        <header className={styles.header}>
          <h1>장바구니</h1>
        </header>
        <CartHeader handleAllCheck={handleAllCheck} isAllChecked={isAllChecked} />
        {
          cart.length === 0 ? (
            <div className={styles.not_list}>
              <h2>장바구니에 담긴 상품이 없습니다.</h2>
              <p>원하는 상품을 장바구니에 담아보세요!</p>
              <Link to="/">
                <button>쇼핑 계속하기</button>
                <img src='images/icon-swiper-2.svg' alt='swipe' width="70" height="70" />
              </Link>
            </div>
          ) : cart.map((obj) => {
            return (
              <CartList obj={obj} convertPrice={convertPrice} handleQuantity={handleQuantity} handleDelete={handleDelete}  handleCheckList={handleCheckList} checkList={checkList} />
            )
          })
        
        }

      {cart.length === 0 ? null : <TotalCart cart={cart} convertPrice={convertPrice} total={total} setTotal={setTotal} checked={checked} />}
      </>
    )
  };
