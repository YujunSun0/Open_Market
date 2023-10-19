import styles from "./main.module.css";
import { EventBanner } from "../eventBanner/eventBanner";
import { Product } from "../products/product";
import { useEffect } from 'react';
import { getProducts } from '../../api/fetcher';


export const Main = ({ products, setProducts, convertPrice }) => {
  useEffect(() => {
    getProducts().then(res => {
      setProducts(res.data.products)
    })
  }, [setProducts])
  
  


  return (
    <>
      <EventBanner />
      <div className={styles.filter}> 
        <p>최신순</p>
        <p>낮은 가격</p>
        <p>높은 가격</p>
      </div>
      <main className={styles.flex_wrap}>
        <Product products={products} convertPrice={convertPrice} />
      </main>
    </>
  );
};
