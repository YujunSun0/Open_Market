import styles from "./topNavigationBar.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export const TopNavigationBar = ({ cart, userData }) => {
  const navigate = useNavigate();

  if (["/login", "/signup"].includes(window.location.pathname)) return null;
    
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
        { userData !== null
          ?<div className={styles.profile}>
            <img src={`${userData.photoURL}`} alt="프로필 사진" className={styles.photo} />
            <p className={styles.name}>{userData.displayName}</p>
          </div>
          : <div className={styles.mypage} onClick={() => navigate("/login")}>
            <img src="/images/icon-user.svg" alt="user" />
            <span>로그인</span>
        </div>
        }
      </div>
    </header>
  );
};
