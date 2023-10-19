import { Link} from "react-router-dom";
import styles from "./product.module.css";

export const Product = ({ products, convertPrice }) => {
  return (
    products.map((obj, i) => {
      return (
        <div className={styles.product} key={i}>
          <Link to={`/product/${products[i].id}`}>
            <div className={styles.product_image}>
              <img src={obj.image} alt="product" />
            </div>
          </Link>
          <div className={styles.store}>
            <span>{obj.provider}</span>
          </div>

          <div className={styles.product_name}>
            <span>{obj.name}</span>
          </div>

          <div className={styles.product_price}>
            <span className={styles.price}>{convertPrice(obj.price)}</span>
            <span className={styles.unit}>원</span>
          </div>
        </div>
      );
    })
  );
};
