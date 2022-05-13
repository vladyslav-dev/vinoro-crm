import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';

// @components
import Logo from '@/components/UI/Logo';
import Search from '../Search';

// @store
import { setViewMode } from '@/store/slices/viewMode';
import { useDispatch } from 'react-redux';

const Header: React.FC = () => {

    const dispatch = useDispatch();

    const [activeSearch, setActiveSearch] = useState<boolean>(false);

    const hideLogo = () => setActiveSearch(true);
    const showLogo = () => setActiveSearch(false)

    return (
        <div className={`${styles.header} ${activeSearch ? styles.active : ''}`}>
            <div className={styles.header__logo} onClick={() => dispatch(setViewMode(true))}>
                <Logo />
            </div>
            <div className={styles.header__search}>
                <Search hideLogo={hideLogo} showLogo={showLogo} />
            </div>
            <div className={`${activeSearch ? styles.showBackground : styles.hideBackground}`} />
        </div>
    )
};

export default Header;