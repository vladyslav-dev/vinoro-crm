import React, { useState } from 'react';
import styles from './Switch.module.scss';

interface SwitchProps {
    label?: {
        positive: string;
        negative: string;
    }
}

const Switch: React.FC<SwitchProps> = ({
    label
}) => {


    const [active, setActive] = useState(true)

    const toggleHandler = () => {
        setActive(!active)
    }

    return (
        <div className={styles.toggleWrapper}>
            <label className={styles.label} >
                {active ? label?.positive : label?.negative}
            </label>
            <button
                className={`${styles.toggle} ${active ? styles.active : ''}`}
                onClick={toggleHandler}
            />

        </div>
    )
}

export default Switch;