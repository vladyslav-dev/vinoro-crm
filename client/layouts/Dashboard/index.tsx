import React, { ReactNode, useState } from 'react';
import styles from './Dashboard.module.scss';

// @components
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import { ViewOffIcon } from '@/components/Icons/ViewOffIcon';

// @store
import { setViewMode } from '@/store/slices/viewMode';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/index';

interface DashboardProps {
    children?: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({
    children
}) => {

    const dispatch = useDispatch();
    const view = useSelector((state: RootState) => state.viewReducer);

    return (
        <div className={`${styles.layout} ${view.viewMode ? styles.hide : ''}`}>
            <div className={styles.layout__header}>
                <Header />
            </div>
            <div className={styles.layout__group}>
                <div className={styles.layout__navbar}>
                    <Navbar />
                </div>
                <div className={styles.layout__content}>
                    {children}
                </div>
            </div>
            <div className={`${styles.viewMode} ${view.viewMode ? styles.active : ''}`} onClick={() => dispatch(setViewMode(false))}>
                <ViewOffIcon />
                <span>Выйти из режима просмотра</span>
            </div>
        </div>
    )
}

export default Dashboard;