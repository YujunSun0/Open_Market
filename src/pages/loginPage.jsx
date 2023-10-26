import React from 'react';
import { Login } from '../components/login/login';

const LoginPage = ({userData ,setUserData}) => {
    return (
        <Login userData={userData} setUserData={setUserData} />
    )
}

export default LoginPage ;