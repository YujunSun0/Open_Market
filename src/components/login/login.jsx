import { Link } from 'react-router-dom'
import styles from "./login.module.css"
import { useNavigate } from 'react-router-dom'
import { authService } from '../../Firebase'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from 'react';

export const Login = ({ userData, setUserData }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(email);

  const navigate = useNavigate();

  const onClickLoginBtn = async () => {
    try {
      const curUserInfo = await signInWithEmailAndPassword(authService, email, password) // 이메일과 비밀번호가 auth에 존재하는지 확인
      setUserData(curUserInfo.user)
      navigate("/")
    }
    catch(err) {
      console.log(err)
    }
  }

  function handleGoogleLogin(){ // 구글 로그인 관련함수
  const provider = new GoogleAuthProvider(); // provider를 구글로 설정
  
  signInWithPopup(authService, provider) // popup을 이용한 signup
    .then((data) => {
        setUserData(data.user); // user data 설정
        localStorage.setItem('id', data.user.uid)
        localStorage.setItem('token', data.user.accessToken)
        navigate("/");
      console.log(data); // console로 들어온 데이터 표시
    })
    .catch((err) => {
      console.log(err);
    });
};

    return (
    <div className={styles.container}>
            <div className={styles.box}>
            <Link to={"/"}>
                <img className={styles.img} src='/images/logo.png' alt='로고' />
            </Link>
            <div className={styles.login}>
            <input className={styles.input_id} type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className={styles.input_id} type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className={styles.login_btn} onClick={() => onClickLoginBtn()}>로그인</button>
                </div>
                <p className={styles.p}>
                    계정이 없으신가요? <span className={styles.span} onClick={() => navigate("/signup")}>회원가입</span>
                </p>
                <img src='images/web_neutral_sq_SI@1x.png' alt='구글 로그인 버튼' onClick={() => handleGoogleLogin()}></img>
            </div>
    </div>
    )
}