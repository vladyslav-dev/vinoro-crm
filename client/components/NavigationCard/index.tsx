import React from 'react';
import Link from 'next/link';
import styles from './NavigationCard.module.scss';
import Title from '@/components/UI/Title';
import { TLIGHT_COLORS } from '@/interfaces/general';
import { LIGHT_COLORS } from '@/constants/colors'

type TCard = 'standard' | 'multi' | 'row';

interface IMultiCard {
    title?: string;
    link?: string;
    renderIcon: () => React.ReactNode;
    info?: {
        infoTitle?: string;
        infoNumber?: string;
    }[];
}

interface NavigationCardProps {
    type?: TCard;
    color?: TLIGHT_COLORS;
    title?: string;
    link?: string;
    renderIcon?: (props: any) => React.ReactNode;
    numberInfo?: string;
    multiCardData?: IMultiCard[];
}

const NavigationCard: React.FC<NavigationCardProps> = ({
    type = 'standard',
    ...props
}) => {

    const cards = {
        'standard': <StandardCard {...props} />,
        'multi': <MultiCard {...props} />,
        'row': <RowCard {...props} />
    }

    return (
        <div className={`${styles.card} ${type !== 'multi' ? styles.cardShadow : ''}`}>
            {cards[type]}
        </div>
    )
}

const StandardCard: React.FC<NavigationCardProps> = ({
    title,
    link,
    numberInfo,
    renderIcon,
    color
}) => {
    return (
        <div className={styles.standardCard}>
            <Link href={link!}>
                <a>
                    <Title rectColor={color} titleText={title || 'Default title'} styleType='CARD' />
                    <div className={styles.standardCardRow}>
                        <span className={styles.standardCardNumber}>{numberInfo}</span>
                        <span className={styles.standardCardImage}>
                            {renderIcon!({color: LIGHT_COLORS[color!]})}
                        </span>
                    </div>
                </a>
            </Link>
        </div>
    )
}

const RowCard: React.FC<NavigationCardProps> = ({
    title,
    link,
    renderIcon,
    color
}) => {

    return (
        <div className={styles.rowCard}>
            <Link href={link!}>
                <a>
                    <Title rectColor={color} titleText={title || 'Default title'} styleType='CARD' />
                    <span className={styles.rowCardImage}>
                        {renderIcon!({color: LIGHT_COLORS[color!]})}
                    </span>
                </a>
            </Link>
        </div>
    )
}

const MultiCard: React.FC<NavigationCardProps> = ({
    title,
    multiCardData,
    color
}) => {

    return (
        <div className={styles.multiCard}>
            <div className={styles.multiCardTitle}>
                <Title rectColor={color}  titleText={title || 'Default title'} />
            </div>
            <div className={styles.multiCardBox}>
                {multiCardData && multiCardData.map((item: IMultiCard) => (
                    <MultiCardItem key={item.title} {...item} />
                ))}
            </div>
        </div>
    )
}

const MultiCardItem: React.FC<IMultiCard> = ({
    title,
    info,
    link,
    renderIcon
}) => {
    return (
        <div className={styles.item}>
            <Link href={link!}>
                <a>
                    <div className={styles.itemRow}>
                        <h3 className={styles.itemTitle}>{title}</h3>
                    </div>
                    <div className={styles.itemRow}>
                        {info && info.map(item => (
                            <div className={styles.itemCol} key={item.infoTitle}>
                                <span className={styles.itemColTitle}>{item.infoTitle}</span>
                                <span className={styles.itemColNumber}>{item.infoNumber}</span>
                            </div>
                        ))}
                        <div className={styles.itemImage}>
                            {renderIcon!()}
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default NavigationCard;