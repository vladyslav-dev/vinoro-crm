import React, { useEffect, useRef } from 'react';
import styles from './Section.module.scss';
import Toolbar from '@/components/Toolbar';

interface SectionProps {
    title?: string;
    toolbar?: boolean;
    children?: React.ReactNode;
    showBackground?: boolean;
    hideScrollbar?: boolean;
}

const Section: React.FC<SectionProps> = ({
    title,
    toolbar = true,
    showBackground = true,
    hideScrollbar = false,
    children,
}) => {

    const wrapperRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const shadowTopRef = useRef<HTMLDivElement>(null);
    const shadowBottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const wrapper = wrapperRef.current;
        const content = contentRef.current;

        if (content!.scrollHeight === content?.offsetHeight) {
            shadowTopRef!.current!.style.opacity = '0';
            shadowBottomRef!.current!.style.opacity = '0'
            return
        }

        function setShadow () {

            const contentScrollHeight = content!.scrollHeight - wrapper!.offsetHeight;

            const currentScroll = content!.scrollTop / (contentScrollHeight);

            shadowTopRef!.current!.style.opacity = String(currentScroll);
            shadowBottomRef!.current!.style.opacity = String((1 - currentScroll));
        }

        content!.addEventListener('scroll', setShadow);

        return () => {
            content!.removeEventListener('scroll', setShadow);
        }

    }, [])

    return (
        <div className={styles.section}>
            <div className={styles.sectionRow}>
                <h1 className={styles.sectionTitle}>{title}</h1>
                {toolbar && <Toolbar />}
            </div>
            <div className={styles.contentWrapper} ref={wrapperRef}>
                <div className={`${styles.shadow} ${styles.top}`} ref={shadowTopRef} />
                <div className={`${styles.shadow} ${styles.bottom}`} ref={shadowBottomRef} />
                <div
                    className={`
                        ${styles.sectionContent}
                        ${showBackground ? styles.background : ''}
                        ${hideScrollbar ? styles.hideScrollbar : ''}
                    `}
                    ref={contentRef}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Section;