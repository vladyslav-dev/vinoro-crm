/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './EmptyList.module.scss';
import frowningFaceIcon from '@/images/emoji/frowning-face.svg';

const EmptyList = () => (
    <div className={styles.empty}>
        <img src={frowningFaceIcon.src} alt='frowning face' />
        <span>Тут еще нет добавленных товаров</span>
    </div>
)

export default EmptyList;