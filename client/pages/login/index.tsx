/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IUserLogin } from '@/interfaces/auth';
import { setUser, setAuth } from '@/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import AuthService from '@/services/AuthService';
import { RootState } from '@/store/index';
import styles from '@/styles/pages/login.module.scss';
import logo from '@/images/login-logo.svg';

import InputText from '@/components/UI/InputText';
import Button from '@/components/UI/Button';

const Login: NextPage = () => {

    const router = useRouter();
    const disptach = useDispatch();
    const { isAuth } = useSelector((state: RootState) => state.authReducer);

    const [userData, setUserData] = useState<IUserLogin>({
        login: '',
        password: '',
    });
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if (isAuth) {
            router.push('/home')
        }

        return () => {
            setUserData({ login: '', password: '' })
        }

    }, [isAuth])

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUserData(prevState => ({
            ...prevState, [event.target.name]: event.target.value
        }))
    }

    const submitHandler = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log('login request started')

        AuthService.login(userData)
          .then((result: any) => {
            disptach(setUser(result.data.user));
            disptach(setAuth(true));
            localStorage.setItem("user:token", result.data.accessToken)
          })
          .catch((err: any) => {
              console.dir(err)
            setError(true);
            disptach(setAuth(false));
            setTimeout(() => setError(false), 4000);
          })
          .finally(() => {
            setUserData({ login: '', password: '' })
          })
    }

    if (isAuth) {
        return <div>Authorized!</div>
    } else {
        return (
            <div className={styles.login}>
                <div className={styles.loginContainer}>
                    <div className={styles.loginTitleWrapper}>
                        <div className={styles.loginLogo}>
                            <Image src={logo} alt='Vinoro' />
                        </div>
                        <p className={styles.loginSubtitle}>Admin panel</p>
                        <p className={`${styles.loginError} ${error ? styles.loginErrorVisible : ''}`}>Wrong login or password</p>
                    </div>
                    <form className={styles.form} onSubmit={submitHandler}>
                        <div className={styles.formRow}>
                            <InputText
                                name='login'
                                value={userData.login}
                                changeHandler={changeHandler}
                                label='Login'
                                authStyleType={true}
                            />
                        </div>
                        <div className={styles.formRow}>
                            <InputText
                                name='password'
                                value={userData.password}
                                changeHandler={changeHandler}
                                label='Password'
                                authStyleType={true}
                                type='password'
                            />
                        </div>
                        <div className={styles.formRow}>
                            <Button
                                innerText='Enter'
                                type='submit'
                                variant={userData.login && userData.password ? 'default' : 'disabled'}
                                classNames={styles.formButton}
                                clickHandler={submitHandler}
                            />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


export default Login
