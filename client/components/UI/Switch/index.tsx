import React, { useState } from 'react';
import styles from './Switch.module.scss';

interface SwitchProps {
    label?: {
        positive?: string;
        negative?: string;
    },
    isActive?: boolean;
    toggleActive?: () => void;
}

const Switch: React.FC<SwitchProps> = ({
    label,
    isActive = true,
    toggleActive,
}) => (
    <div className={styles.toggleWrapper}>
        <label className={styles.label}>
            {isActive ? label?.positive : label?.negative}
        </label>
        <input
            type='checkbox'
            checked={isActive}
            onChange={toggleActive}
            className={`${styles.toggle} ${isActive ? styles.active : ''}`}
        />
    </div>
)

export default Switch;