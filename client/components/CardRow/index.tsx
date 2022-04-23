/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import styles from './CardRow.module.scss';
import newIcon from '@/images/new-icon.svg';
import { transformBulkPriceToString } from '@/utils/form';
import Img from '../Img';
import { IProduct } from '@/interfaces/product';

interface CardProps {
    product: IProduct;
}

const RowCardComponent: React.FC<CardProps> = ({ product }) => (
    <div className={`${styles.rowCard} ${!product.visibility ? styles.visibilityHidden : ''}`}>
        <Link href={`/edit-product/[id]`} as={`/edit-product/${product?.id}`}>
            <a className={styles.cardFlex}>
                <div className={styles.cardImage}>
                    <Img src={product.image} />
                    {product.new && (
                    <div className={styles.cardNew}>
                        <img src={newIcon.src} alt='New' width={24} height={24} />
                    </div>
                    )}
                </div>
                <ul className={styles.cardInfo}>
                    <li className={styles.cardInfoItem}>{product.name.ru}</li>
                    <li className={styles.cardInfoItem}>
                        <span className={`${!product.availability ? styles.danger : styles.success}`}>{product.availability ? 'Есть в наличии' : 'Нет в наличии'}</span>
                    </li>
                    <li className={styles.cardInfoItem}>
                        {product.discount_price ? (
                            <>
                                <span className={styles.strikeOut}>{product.price} ₴</span>
                                <span className={styles.danger}>{product.discount_price} ₴</span>
                            </>
                        ) : (
                            <span>{product.price} ₴</span>
                        )}
                    </li>
                    <li className={styles.cardInfoItem}>
                        <span className={styles.bulkPrice}>
                            {transformBulkPriceToString(product.bulk_price)}
                        </span>
                    </li>
                </ul>
            </a>
        </Link>
    </div>
)
const RowCard = React.memo(RowCardComponent)

export default RowCard