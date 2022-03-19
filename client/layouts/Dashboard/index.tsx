import React, { ReactNode } from 'react';
import styles from './Dashboard.module.scss';

// @components
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';

interface DashboardProps {
    children?: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({
    children
}) => {

    return (
        <div className={styles.layout}>
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
        </div>
    )
}

export default Dashboard;