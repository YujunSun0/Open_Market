import { Link } from 'react-router-dom'
import styles from "./login.module.css"
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const navigate = useNavigate();

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
                <p className={styles.p}>
                    계정이 없으신가요? <span className={styles.span} onClick={() => navigate("/signup")}>회원가입</span>
                </p>
            </div>
    </div>
    )
}