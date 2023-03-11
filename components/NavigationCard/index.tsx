/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import styles from './NavigationCard.module.scss';
import Title from '@/components/UI/Title';
import { TLIGHT_COLORS } from '@/interfaces/general';
import { LIGHT_COLORS } from '@/constants/colors';
import { ICatalogInfo } from '@/interfaces/dashboard';

// catalog icons

import foodIcon from '@/images/catalog/food-icon.svg';
import alcoholIcon from '@/images/catalog/alcohol-icon.svg';
import detergentIcon from '@/images/catalog/detergent-icon.svg';

const catalogIcons = [foodIcon, alcoholIcon, detergentIcon, detergentIcon];

type TCard = 'standard' | 'multi' | 'row';

interface NavigationCardProps {
    type?: TCard;
    color?: TLIGHT_COLORS;
    title?: string;
    link?: string;
    numberInfo?: string;
    multiCardData?: ICatalogInfo[];
    renderIcon?: (props: any) => React.ReactNode;
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
                {multiCardData && multiCardData.map((item: ICatalogInfo, index: number) => (
                    <MultiCardItem key={item.catalogId} {...item} icon={catalogIcons[index]} />
                ))}
            </div>
        </div>
    )
}

const MultiCardItem: React.FC<ICatalogInfo> = ({
    catalogName,
    icon,
    totalCategory,
    totalProducts,
    linkName,
}) => {
    return (
        <div className={styles.item}>
            <Link href={`/catalog#${linkName}`}>
                <a>
                    <div className={styles.itemRow}>
                        <h3 className={styles.itemTitle}>{catalogName.uk}</h3>
                    </div>
                    <div className={styles.itemRow}>
                        <div className={styles.itemCol}>
                            <span className={styles.itemColTitle}>Всего товаров</span>
                            <span className={styles.itemColNumber}>{totalProducts}</span>
                        </div>
                        <div className={styles.itemCol}>
                            <span className={styles.itemColTitle}>Категорий</span>
                            <span className={styles.itemColNumber}>{totalCategory}</span>
                        </div>
                        <div className={styles.itemImage}>
                            <img src={icon.src} alt="icon" />
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default NavigationCard;