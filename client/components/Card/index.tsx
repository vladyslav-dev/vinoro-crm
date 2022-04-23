/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import styles from './Card.module.scss';
import newIcon from '@/images/new-icon.svg';

import Img from '@/components/Img';
import { IProduct } from '@/interfaces/product';

interface CardProps {
    product: IProduct;
}

const DefaultCardComponent: React.FC<CardProps> = ({ product }) => (
    <div className={`${styles.defaultCard} ${!product.visibility ? styles.visibilityHidden : ''}`}>
        <Link href={`/edit-product/[id]`} as={`/edit-product/${product?.id}`}>
            <a className={styles.cardLink}>
                <div className={styles.cardImage}>
                    <Img src={product.image} />
                </div>
                <div className={styles.cardInfo}>
                    <div className={styles.cardAvailability}>
                        {product.availability ? <p className={styles.cardAvailabilityGreen}>Есть в наличии	&nbsp;&#10004;</p> : <p className={styles.cardAvailabilityRed}>Нет в наличии &#10008;</p>}
                    </div>
                    <div className={styles.cardName}>
                        <span>{product.name.ru}</span>
                    </div>

                    {product.discount_price ? (
                        <div className={styles.cardDiscountCost}>
                            <span className={styles.cardNewCost}>{product.discount_price} ₴</span>
                            <span className={styles.cardOldCost}>{product.price} ₴</span>
                        </div>
                    ) : (
                        <div className={styles.cardCost}>
                            <span>{product.price} ₴</span>
                        </div>
                    )}
                </div>
                {product.new && (
                    <div className={styles.cardNew}>
                        <img src={newIcon.src} alt='New' width={34} height={34} />
                    </div>
                )}
            </a>
        </Link>
    </div>
)

const DefaultCard = React.memo(DefaultCardComponent);

export default DefaultCard;