import React from 'react';
import styles from './AdminInfo.module.scss';
import Image from 'next/image';
import defaultAvatar from '@/images/default-avatar.svg';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/index';
import AuthService from '@/services/AuthService';
import { setAuth, setUser } from '@/store/slices/auth';

const AdminInfo: React.FC = () => {

    const user: any = useSelector((state: RootState) => state.authReducer.user);
    const dispatch = useDispatch();

    const logout = () => {
        AuthService.logout()
            .then((response: any) => console.log(response))
            .catch((err: any) => console.log(err))
            .finally(() => {
                dispatch(setAuth(false))
                dispatch(setUser(null));
                localStorage.removeItem('user:token')
            })
    }

    if (!user) {
        return null;
    } else {
        return (
            <div className={styles.admin}>
                <div className={styles.adminRow}>
                    <div className={styles.adminCol}>
                        <div className={styles.adminAvatar}>
                            <Image
                                src={user.avatar || defaultAvatar}
                                alt='Avatar'
                                layout='fill'
                            />
                        </div>
                    </div>
                    <div className={styles.adminCol}>
                        <span className={styles.adminUsername}>{user?.username || 'Admin'}</span>
                        <span className={styles.adminLogin}>{user?.login}</span>
                    </div>
                </div>
                <div className={styles.adminRow}>
                    <button className={styles.adminLogout} onClick={logout}>Выйти</button>
                </div>
            </div>
        )
    }


}

export default AdminInfo;