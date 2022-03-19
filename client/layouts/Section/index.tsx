import React from 'react';
import styles from './Section.module.scss';
import Toolbar from '@/components/Toolbar';

interface SectionProps {
    title?: string;
    toolbar?: boolean;
    children?: React.ReactNode;
    showBackground?: boolean;
}

const Section: React.FC<SectionProps> = ({
    title,
    toolbar = true,
    showBackground = true,
    children,
}) => {

    return (
        <div className={styles.section}>
            <div className={styles.sectionRow}>
                <h1 className={styles.sectionTitle}>{title}</h1>
                {toolbar && <Toolbar />}
            </div>
            <div className={`${styles.sectionContent} ${showBackground ? styles.background : ''}`}>
                {children}
            </div>
        </div>
    )
}

export default Section;