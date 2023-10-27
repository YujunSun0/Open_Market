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
    const [isValidEmail, setIsValidEmail] = useState(true); // 이메일 유효성 검사 => false일 때 중복검사 버튼 비활성화, true일 때 활성화
    const [isDuplicated, setisDuplicated] = useState([null, null, null]); // 이메일과 비밀번호 중복 및 유효성 검사 상태 (null은 아무것도 입력 x, true는 통과, false는 통과 안됨)
    console.log(isDuplicated);

    const navigate = useNavigate();

    const isValidEmailCheck = (val) => { // 이메일 유효성 검사
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return !regex.test(val); // !를 붙여준 이유는 return 값을 이용하여 dupBtn(중복검사 버튼)의 disabled 속성을 변경시길 것이며, 정규식 검사가 false가 나오면 disabled 속성은 true로 하기 위해
    }

    const isValidPasswordCheck = (val) => {
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$/;
        return passwordRegex.test(val);
    }

    const onClickEyeSlash = () => { // 비밀번호 보이기, 감추기 아이콘 클릭 시
        setIsActive(!isActive)
    }

    const onClickSighUpBtn = async() => { // 회원가입 버튼 클릭 시
        try {
            const createdUser = await createUserWithEmailAndPassword(authService, email, password)
            console.log(createdUser.user);
            navigate("/login");
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
            setisDuplicated(copyArr);
        } else {
           const copyArr = [...isDuplicated];
            copyArr[0] = true;
            setisDuplicated(copyArr);
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
                <p className={styles.formText}>이메일 <span className={isDuplicated[0] === null ? styles.none : isDuplicated[0] ? styles.validText : styles.invalidText}>{isDuplicated[0] === null ? "" : isDuplicated[0] ? "사용 가능한 이메일입니다" : "이미 존재하는 이메일입니다."}</span></p>
                <div className={styles.inputForm}>
                    <input className={styles.input} type="email" placeholder='이메일 입력' value={email} onChange={(e) => {
                        setEmail(e.target.value)
                        setIsValidEmail(isValidEmailCheck(e.target.value))
                    }} />
                    <button className={styles.dupBtn} onClick={() => onClickDupBtn()} disabled={isValidEmail}>중복 확인</button>
                </div>
                <p className={styles.formText}>비밀번호</p>
                <div className={styles.inputForm}>
                    <input className={styles.input} type={isActive ? "text" : "password"} placeholder='비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)' value={password} onChange={((e) => setPassword(e.target.value))} />
                    {
                        isActive
                            ? <FontAwesomeIcon icon={faEye} className={styles.eyeSlash} onClick={() => onClickEyeSlash()} />
                            : <FontAwesomeIcon icon={faEyeSlash} className={styles.eyeSlash} onClick={() => onClickEyeSlash()} />
                    }
                </div>
                <p className={styles.formText}>사용자명</p>
                 <div className={styles.inputForm}>
                    <input className={styles.input} type="text" placeholder='사용자 이름을 입력해주세요' value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                </div>
                <button className={styles.signUpBtn} onClick={() => onClickSighUpBtn()} disabled={true}>회원가입</button>
            </div>
        </div>
    )
}