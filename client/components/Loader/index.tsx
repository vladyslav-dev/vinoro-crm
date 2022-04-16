import React from 'react';
import styles from './Loader.module.scss';

interface LoaderProps {
    isFormLoader?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isFormLoader = false }) => (
    <div className={`${styles.loading} ${isFormLoader ? styles.form : ''}`}>
        <div className={styles.loadingText}>
            <span className={styles.loadingTextWords}>L</span>
            <span className={styles.loadingTextWords}>O</span>
            <span className={styles.loadingTextWords}>A</span>
            <span className={styles.loadingTextWords}>D</span>
            <span className={styles.loadingTextWords}>I</span>
            <span className={styles.loadingTextWords}>N</span>
            <span className={styles.loadingTextWords}>G</span>
        </div>
    </div>
)

export default Loader;