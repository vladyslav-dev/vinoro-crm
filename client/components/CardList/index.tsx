import React from 'react';
import dynamic from 'next/dynamic'
import styles from './CardList.module.scss'
import { IProduct } from '@/interfaces/product'

const Card = dynamic(() => import('@/components/Card'), { ssr: true })

export interface CardListProps {
    products?: Array<IProduct>;
}

const CardList = ({ products }: CardListProps) => (
    <div className={`${styles.cardList}`}>
        {products?.map(product => <Card product={product} key={product?.id} />)}
    </div>
)


export default CardList;