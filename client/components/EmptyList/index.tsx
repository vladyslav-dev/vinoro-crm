/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './EmptyList.module.scss';
import frowningFaceIcon from '@/images/emoji/frowning-face.svg';

interface EmptyListProps {
    text?: string;
}

const EmptyList: React.FC<EmptyListProps> = ({ text = 'Тут еще нет добавленных товаров' }) => (
    <div className={styles.empty}>
        <img src={frowningFaceIcon.src} alt='frowning face' />
        <span>{text}</span>
    </div>
)

export default EmptyList;