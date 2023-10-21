import { Link } from 'react-router-dom'
import styles from "./login.module.css"

export const Login = () => {
    return (
    <div className={styles.container}>
            <div className={styles.box}>
            <Link to={"/"}>
                <img className={styles.img} src='/images/logo.png' alt='로고' />
            </Link>
            <div className={styles.login}>
                <input className={styles.input_id} type="email" placeholder="id"/>
                <input className={styles.input_id} type="password" placeholder="password"/>
                    <button className={styles.login_btn}>로그인</button>
            </div>
            </div>
    </div>
    )
}