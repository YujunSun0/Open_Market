import styles from "./signup.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { authService } from '../../Firebase';
import { useNavigate } from 'react-router-dom';
import { checkDuplicateEmailWithFirebase } from '../../Firebase';

export const SignUp = () => {
    const [isActive, setIsActive] = useState(false); // 비밀번호 표시 아이콘의 상태
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false); // 이메일 유효성 검사 => false일 때 중복검사 버튼 비활성화, true일 때 활성화
    const [isDuplicated, setIsDuplicated] = useState([null, null, null]); // 이메일과 비밀번호 중복 및 유효성 검사 상태 (null은 아무것도 입력 x, true는 통과, false는 통과 안됨)
    const [message, setMessage] = useState(""); // 이메일 중복, 유효성 검사 메시지

    const navigate = useNavigate();

    const isValidEmailCheck = (val) => { // 이메일 유효성 검사
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return regex.test(val);
    }

    const isValidPasswordCheck = (val) => { //비밀번호 유효성 검사
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$/;
        if (passwordRegex.test(val)) {
            const copyArr = [...isDuplicated];
            copyArr[1] = true;
            setIsDuplicated(copyArr)
        } else {
            const copyArr = [...isDuplicated];
            copyArr[1] = false;
            setIsDuplicated(copyArr)
        }
    }

    const onClickEyeSlash = () => { // 비밀번호 보이기, 감추기 아이콘 클릭 시
        setIsActive(!isActive)
    }

    const onClickSighUpBtn = async() => { // 회원가입 버튼 클릭 시
        try {
            const createdUser = await createUserWithEmailAndPassword(authService, email, password)
            createdUser.user.displayName = displayName;
            console.log(createdUser.user);
            // navigate("/login");
        }
        catch(err) {
            console.log(err)
        }
    }
    const onClickDupBtn = async() => { // firebase userdata에 중복된 아이디가 있는지 확인
        const duplicated = await checkDuplicateEmailWithFirebase(email);
        if (duplicated) {
            // 중복된 이메일 처리
            const copyArr = [...isDuplicated];
            copyArr[0] = false;
            setIsDuplicated(copyArr);
            setMessage("이미 존재하는 이메일입니다")
        } else {
           const copyArr = [...isDuplicated];
            copyArr[0] = true;
            setIsDuplicated(copyArr);
            setMessage("사용할 수 있는 이메일입니다")
        }
    }

    return (
        <div className={styles.container}>
            <Link to={"/"}>
                <img className={styles.img} src='/images/logo.png' alt='로고' />
            </Link>
            <div className={styles.box}>
                <p className={styles.signUpText}>회원가입</p>
                <p className={styles.aboutText}>회원가입을 완료하고 필요한 물건을 골라보세요!</p>
                <p className={styles.formText}>이메일 <span className=
                {
                  isDuplicated[0] === null ? styles.none : isDuplicated[0] ? styles.validText : styles.invalidText
                }>
                {
                 message
                }
                </span></p>
                <div className={styles.inputForm}>
                    <input className={styles.input} type="email" placeholder='이메일 입력' value={email} onChange={(e) => {
                        setEmail(e.target.value)
                        setIsValidEmail(isValidEmailCheck(e.target.value))
                        setMessage("")
                        if(isDuplicated[0] !== null) isDuplicated.splice(0,1,null) // 중복검사 후 이메일 입력창을 수정했을 때, 인증완료 상태를 제거
                    }} />
                    <button className={styles.dupBtn} onClick={() => onClickDupBtn()} disabled={!isValidEmail}>중복 확인</button>
                </div>
                <p className={styles.formText}>비밀번호<span className={isDuplicated[1] === null ? styles.none : isDuplicated[1] ? styles.validText : styles.invalidText}>
                    {!isDuplicated[1] ? "올바른 비밀번호를 입력하세요" : "올바른 비밀번호입니다"}</span></p>
                <div className={styles.inputForm}>
                    <input className={styles.input} type={isActive ? "text" : "password"} placeholder='비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)' value={password} onChange={((e) => {
                        setPassword(e.target.value)
                        isValidPasswordCheck(e.target.value)
                    })} />
                    {
                        isActive
                            ? <FontAwesomeIcon icon={faEye} className={styles.eyeSlash} onClick={() => onClickEyeSlash()} />
                            : <FontAwesomeIcon icon={faEyeSlash} className={styles.eyeSlash} onClick={() => onClickEyeSlash()} />
                    }
                </div>
                <p className={styles.formText}>사용자명</p>
                 <div className={styles.inputForm}>
                    <input className={styles.input} type="text" placeholder='사용자 이름을 입력해주세요' value={displayName} onChange={(e) => {
                        setDisplayName(e.target.value)
                        e.target.value.length >= 1 ? isDuplicated[2] = true : isDuplicated[2] = false
                    }} />
                </div>
                <button className={styles.signUpBtn} onClick={() => onClickSighUpBtn()} disabled={isDuplicated.some(el => el !== true)}>회원가입</button>
            </div>
        </div>
    )
}