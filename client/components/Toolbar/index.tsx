import React from 'react';
import View from '../UI/View';
import styles from './Toolbar.module.scss';

interface ToolbarProps {

}

const Toolbar: React.FC<ToolbarProps> = () => {
    return (
        <div className={styles.toolbar}>
            <View />
        </div>
    )
}

export default Toolbar;