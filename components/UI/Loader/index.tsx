import React from 'react';
import styles from './Loader.module.scss';
import ReactLoading from 'react-loading';

type LoaderType = 'text' | 'bubbles'

interface LoaderProps {
    isFormLoader?: boolean;
    type?: LoaderType;
}

const Loader: React.FC<LoaderProps> = ({ isFormLoader = false, type = 'text' }) => (
    <>
        {type === 'text' ? (
            <div className={`${styles.loading} ${styles.fullText} ${isFormLoader ? styles.form : ''}`}>
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
        ) : (
            <div className={`${styles.loading}`}>
                <div className={styles.loadingText}>
                    <ReactLoading type={'bubbles'} color="#282B30" width={80} />
                    <span className={styles.loadingWord}>Загрузка</span>
                </div>
            </div>
        )}
    </>
)

export default Loader;