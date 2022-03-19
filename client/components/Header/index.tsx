import React from 'react';
import styles from './Header.module.scss';

// @components
import Logo from '@/components/UI/Logo';

interface HeaderProps {

};

const Header: React.FC<HeaderProps> = () => {

    return (
        <div className={styles.header}>
            <div className={styles.header__logo}>
                <Logo />
            </div>
            <div className={styles.header__search}>
                Search
            </div>
        </div>
    )
};

export default Header;