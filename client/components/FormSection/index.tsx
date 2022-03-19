import React, { useState, useRef, useEffect } from 'react';
import styles from './FormSection.module.scss';
import Title from '@/components/UI/Title';
import { TLIGHT_COLORS } from '@/interfaces/general';
import { ExpandArrow } from '@/components/Icons/Arrow';

interface FormSectionProps {
    title?: string;
    color?: TLIGHT_COLORS;
    children?: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({
    title,
    color,
    children
}) => {

    const sectionFormRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState<boolean>(true);

    useEffect(() => {
        const height = sectionFormRef?.current?.scrollHeight;
        sectionFormRef!.current!.style.maxHeight = isOpen ? `${height}px` : '0';
    })

    const toggleHandler = () => setIsOpen(!isOpen);

    return (
        <div className={`${styles.section} ${isOpen ? styles.open : ''}`}>
            <div
                ref={sectionFormRef}
                className={styles.sectionForm}
            >
                {children}
            </div>
            <div className={styles.sectionTitle} onClick={toggleHandler}>
                <Title
                    rectColor={color}
                    titleText={title}
                    styleType='FORM'
                />
                <ExpandArrow />
            </div>
        </div>
    )
}

export default FormSection;