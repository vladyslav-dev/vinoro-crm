import React from 'react';
import styles from './Toolbar.module.scss';

interface ToolbarProps {}

const Toolbar: React.FC<ToolbarProps> = () => {
    return (
        <div className={styles.toolbar}>
            Toolbar
        </div>
    )
}

export default Toolbar;