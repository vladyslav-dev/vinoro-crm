import React from 'react';
import styles from './Loader.module.scss';

const Loader = () => (
    <div className={styles.loading}>
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