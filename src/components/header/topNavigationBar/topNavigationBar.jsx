import styles from "./topNavigationBar.module.css";
import { Link } from "react-router-dom";

export const TopNavigationBar = ({cart}) => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.a}>
          <h1 className={styles.logo}>
            {/* <img src="/images/logo.png" alt="logo" /> */}
            <div className={styles.img}></div>
          </h1>
        </Link>
        <div className={styles.input_wrap}>
          <input type="text" placeholder="상품을 검색해보세요!" />
          <img src="/images/icon-search.svg" alt="search" />
        </div>
      </div>

      <div className={styles.menu}>
        <Link to="/cart">
          <div className={styles.shopping_cart}>
            <img src="/images/icon-shopping-cart.svg" alt="cart" />
            <span>장바구니</span>
            {
              cart.length >= 1 ? (
              <div className={styles.cart_list}>
                <p>{cart.length}</p>
              </div>
            ) : null
            }
          </div>
        </Link>
        <Link to="">
          <div className={styles.mypage}>
            <img src="/images/icon-user.svg" alt="user" />
            <span>로그인</span>
          </div>
        </Link>
      </div>
    </header>
  );
};
