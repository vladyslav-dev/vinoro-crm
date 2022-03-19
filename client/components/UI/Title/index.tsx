import React from 'react';
import styles from './Title.module.scss';
import { TLIGHT_COLORS } from '@/interfaces/general';
import { LIGHT_COLORS } from '@/constants/colors';

type StyleType = 'CARD' | 'FORM';

interface TitleProps {
    styleType?: StyleType;
    rectColor?: TLIGHT_COLORS;
    classNames?: string;
    titleText?: string;
}

const Title: React.FC<TitleProps> = ({
    styleType = 'CARD',
    rectColor,
    classNames,
    titleText
}) => {

    const title = {
        'CARD': styles.cardTitle,
        'FORM': styles.formTitle,
    }
    console.log(rectColor)
    return (
        <div className={`${title[styleType]} ${classNames}`}>
            {rectColor && <span
                            className={styles.rectColor}
                            style={{background: LIGHT_COLORS[rectColor]}}
                        />}
            <span className={styles.titleText}>{titleText}</span>
        </div>
    )
}

export default Title;