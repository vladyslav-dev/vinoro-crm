import React from 'react';
import styles from './Modal.module.scss';
import closeIcon from '@/images/close-icon.svg';
import Image from 'next/image';

interface ModalProps {
    isActive: boolean;
    showBackground?: boolean;
    closeModal: () => void;
    children?: React.ReactChild;
    classNames?: string;
}

const Modal: React.FC<ModalProps> = ({
    isActive,
    closeModal,
    children,
    showBackground = false,
    classNames = ''
}) => (
    <div
        className={`
            ${styles.modal}
            ${isActive ? styles.active : ''}
            ${showBackground ? styles.modalBackground : ''}
        `}
        onClick={closeModal}
    >
        <div className={`${styles.modalContent} ${classNames}`} onClick={event => event.stopPropagation()}>
            <>
                <span className={styles.modalClose} onClick={closeModal}>
                    <Image src={closeIcon} alt='Close' />
                </span>
                {children}
            </>
        </div>
    </div>
)

export default Modal;