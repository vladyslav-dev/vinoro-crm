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
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import InputText from '@/components/UI/InputText';
import Button from '@/components/UI/Button';
import { authValidationSchema } from '@/utils/validation';
import Head from 'next/head';

const Login: NextPage = () => {

    const router = useRouter();
    const disptach = useDispatch();
    const { isAuth } = useSelector((state: RootState) => state.authReducer);

    const [error, setError] = useState<string>('');

    const { register, handleSubmit, reset, formState: { isValid } } = useForm<IUserLogin>({
        mode: 'onChange',
        defaultValues: {
            login: '',
            password: ''
        },
       resolver: yupResolver(authValidationSchema)
    });

    useEffect(() => {
        router.prefetch('/home')
      }, [])

    useEffect(() => {
        if (isAuth) {
            router.back();
        }
    }, [isAuth])

    const submitHandler = async (data: IUserLogin) => {
        AuthService.login(data)
          .then((result: any) => {
            disptach(setUser(result.data.user));
            disptach(setAuth(true));
            localStorage.setItem("user:token", result.data.accessToken)
          })
          .catch((err: any) => {
            setError(err?.response?.data?.message || 'Network error');
            disptach(setAuth(false));
            setTimeout(() => setError(''), 4000);
          })
          .finally(() => {
            reset();
          })
    }

    if (isAuth) {
        return null
    } else {
        return (
            <>
                <Head>
                    <title>Vinoro — Авторизация</title>
                </Head>
                <div className={styles.login}>
                    <div className={styles.loginContainer}>
                        <div className={styles.loginTitleWrapper}>
                            <div className={styles.loginLogo}>
                                <Image src={logo} alt='Vinoro' />
                            </div>
                            <p className={styles.loginSubtitle}>Admin panel</p>
                            <p className={`${styles.loginError} ${error ? styles.loginErrorVisible : ''}`}>{error}</p>
                        </div>
                        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
                            <div className={styles.formRow}>
                                <InputText
                                    label='Login'
                                    registerPath='login'
                                    register={register}
                                    authStyleType={true}
                                />
                            </div>
                            <div className={styles.formRow}>
                                <InputText
                                    label='Password'
                                    registerPath='password'
                                    register={register}
                                    authStyleType={true}
                                    type='password'
                                />
                            </div>
                            <div className={styles.formRow}>
                                <Button
                                    innerText='Enter'
                                    type='submit'
                                    variant={isValid ? 'default' : 'disabled'}
                                    classNames={styles.formButton}
                                    clickHandler={handleSubmit(submitHandler)}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}


export default Login
