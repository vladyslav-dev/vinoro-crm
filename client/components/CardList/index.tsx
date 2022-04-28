import React from 'react';
import styles from './CardList.module.scss'
import { IProduct } from '@/interfaces/product'
import { getViewMode } from '@/utils/toolbar';
import { useRouter } from 'next/router';
import DefaultCard from '@/components/Card';
import RowCard from '@/components/CardRow';

export interface CardListProps {
    products: Array<IProduct>;
}

const CardList: React.FC<CardListProps> = ({ products }) => {

    const router = useRouter();

    const { isRowView } = getViewMode(router);

    return (
        <>
            {isRowView ? (
                <div className={`${styles.cardList} ${styles.row}`}>
                    {products.map((product) => (
                       <DefaultCard product={product} key={product.id} />
                    ))}
                </div>
            ) : (
                <div className={`${styles.cardList} ${styles.column}`}>
                    {products.map((product, index) => (
                        <div className={styles.cardListItemCol} key={index}>
                            <RowCard product={product} />
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}


export default CardList;