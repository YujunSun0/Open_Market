import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./detail.module.css";
import { firestore } from '../../Firebase';

export const Detail = ({convertPrice, cart, setCart}) => {
  const { id } = useParams();
  const [dataObj, setDataObj] = useState({});
  const [count, setCount] = useState(1);
  console.log(dataObj);
  // 해당 코드에서는 새로고침을 하면 상태가 초기화되어 에러가 발생하여서 아래의 코드로 수정
  // useEffect(() => {
  //   setDataObj(products.find(el => el.id === id));
  // }, [dataObj, id, products]);

  useEffect(() => {
    const bucket = firestore.collection("products");
    bucket.get().then((docs) => {
      docs.forEach(doc => {
        if (doc.id === id) setDataObj({ id:doc.id, ...doc.data() })
      })
    })
  },[])
  

  // +, - 이미지를 누르면, 아래 함수가 실행됨 (onClick 이벤트핸들러)
  // const countPlus = () => {
  //   setCount(count + 1);
  // }
  // const countMinus = () => {
  //   count > 0 ?
  //     setCount(count - 1) :
  //     setCount(count)
  // }

  const handleCount = (type) => {  //위의 코드는 함수를 2개 만들어야함
    type === "minus" ? setCount(count - 1) : setCount(count + 1)
  }

  const setQuantity = (id, quantity) => { // 중복된 물건을 넣을 때 사용
    const found = cart.filter(el => el.id === id)[0];  // 원래는 [{},{},...] 이런 형태인데 필터된 값은 어짜피 하나이니 0번째 인덱스를 꺼내줌.
    const idx = cart.indexOf(found);
    const cartItem = {
      id: dataObj.id,
      name: dataObj.name,
      provider: dataObj.provider,
      price: dataObj.price,
      image: dataObj.image,
      quantity: quantity,
    };
    setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx + 1)]);
  }

  const handleCart = () => { //cart에 데이터를 담음 
    const cartItem = {
      id: dataObj.id,
      name: dataObj.name,
      provider: dataObj.provider,
      price: dataObj.price,
      image: dataObj.image,
      quantity: count,
    };
    const found = cart.find(el => el.id === cartItem.id); // 값을 반환한다, 없으면 undefined 반환
    if (found) setQuantity(cartItem.id, found.quantity + count);
    //장바구나 버튼을 눌렀을 때, cartItem의 id가 cart에 있다면, 위의 함수 실행
    else  setCart([...cart, cartItem]) 
  }

  return (
    dataObj && (
    <>
      <main className={styles.main}>
        <section className={styles.product}>
          <div className={styles.product_img}>
            <img src={dataObj.image} alt="product" />
          </div>
        </section>
        <section className={styles.product}>
          <div className={styles.product_info}>
            <p className={styles.seller_store}>{dataObj.provider}</p>
            <p className={styles.product_name}>{dataObj.name}</p>
            <span className={styles.price}>
              {convertPrice(String(dataObj.price))}  {/*데이터의 가격은 number타입이고,  */}
              <span className={styles.unit}>원</span>
            </span>
          </div>

          <div className={styles.delivery}>
            <p>택배배송 / 무료배송</p>
          </div>

          <div className={styles.line}></div>

          <div className={styles.amount}>
            <img
              className={styles.minus}
              src="/images/icon-minus-line.svg"
              alt="minus"
              onClick={() => count !== 1 ? handleCount("minus") : null} // 카운트가 1 아래로 내려가지 않도록 한다
            />

            <div className={styles.count}>
              <span>{count}</span>
            </div>

            <img
              className={styles.plus}
              src="/images/icon-plus-line.svg"
              alt="plus"
              onClick={() => handleCount("plus")}
            />
          </div>

          <div className={styles.line}></div>

          <div className={styles.sum}>
            <div>
              <span className={styles.sum_price}>총 상품 금액</span>
            </div>

            <div className={styles.total_info}>
              <span className={styles.total}>
                총 수량 <span className={styles.total_count}>{`${count}개`}</span>
              </span>
              <span className={styles.total_price}>
                {convertPrice(dataObj.price*count)}
                <span className={styles.total_unit}>원</span>
              </span>
            </div>
          </div>

          <div className={styles.btn}>
            <button className={styles.btn_buy}>바로 구매</button>
              <button className={styles.btn_cart} onClick={handleCart}>장바구니</button>
          </div>
        </section>
        </main>
    </> )
  );
};
