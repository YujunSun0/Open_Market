import styles from "./cart.module.css"

export const CartList = ({ obj, convertPrice, handleQuantity, handleDelete, handleCheckList, checkList  }) => {
  
//checkbox를 클릭하면 총 상품금액을 계산하여 화면에 표시한다.
//체크박스 전체 선택을 클릭하면, cart에 담겨있는 모든 리스트들의 총 상품금액을 계산하여 화면에 표시한다.
    return (
      <section className={styles.cart_product_list} key={obj.id}>
        <input type="checkbox" onChange={(e) => handleCheckList(e.target.checked, obj.id)} checked={checkList.includes(obj.id) ? true : false}
        /> 
        {/* checked 속성을 이용하여 id가 checkList에 있다면 true(체크됨), 아니면 false */}
        <div className={styles.cart_product_wrap}>
          <div className={styles.cart_product_image}>
            <img src={obj.image} alt="product-img" />
          </div>

          <div className={styles.cart_product_info}>
            <p className={styles.seller_store}>{obj.provider}</p>
            <p className={styles.product_name}>{obj.name}</p>
            <p className={styles.price}>{`${convertPrice(obj.price)}원`}</p>
            <p className={styles.delivery}>택배배송 / 무료배송</p>
          </div>
        </div>

        <div className={styles.cart_product_count}>
          <img
            className={styles.minus}
            src="/images/icon-minus-line.svg"
                  alt="minus"
                  onClick={() => handleQuantity(obj.id, obj.quantity - 1)}
          />

          <div className={styles.count}>
            <span>{obj.quantity}</span>
          </div>
          <img
            className={styles.plus}
            src="/images/icon-plus-line.svg"
            alt="plus"
            onClick={() => handleQuantity(obj.id, obj.quantity + 1)}
          />
        </div>

        <div className={styles.cart_product_price}>
          <p className={styles.total_price}></p>
          <button className={styles.btn_submit}>주문하기</button>
        </div>

        <div className={styles.product_remove}>
          <img src="/images/icon-delete.svg" alt="delete" onClick={() => handleDelete(obj.id)} />
        </div>
      </section>
    )
}