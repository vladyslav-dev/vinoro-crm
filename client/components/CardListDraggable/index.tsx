/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './CardListDraggable.module.scss'
import { IProduct } from '@/interfaces/product'
import { getViewMode } from '@/utils/toolbar';
import { useRouter } from 'next/router';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Button from '../UI/Button';
import ProductService from '@/services/ProductService';
import { useSWRConfig } from 'swr';
import { compareProductList, reorderProducts } from '@/utils/product';
import DefaultCard from '@/components/Card';
import RowCard from '@/components/CardRow';

export interface CardListDraggableProps {
    products: Array<IProduct>;
}

const CardListDraggable: React.FC<CardListDraggableProps> = ({ products }) => {

    const router = useRouter();

    const { isRowView } = getViewMode(router);

    const [draggingId, setDraggingId] = useState<string>('');

    const swr: any = useSWRConfig();

    const initialProductList = useRef<Array<IProduct>>(products)

    const [productList, setProductList] = useState<Array<IProduct>>(products);

    useEffect(() => {
        // Update state and initial list if products changed
        initialProductList.current = products;

        setProductList(products)

    }, [products])

    const onDragStart = (result: any) => setDraggingId(result.draggableId);

    const onDragEnd = (result: any) => {

        setDraggingId('');

        if (!result.destination) {
          return;
        }
        if (result.destination.index === result.source.index) {
          return;
        }

        const reorderedProductList = reorderProducts(
            productList,
            result.source.index,
            result.destination.index
        ) as Array<IProduct>


        const newProductList = reorderedProductList.map((item, index) => {
            return {
                ...item,
                order_id: index
            }
        })

        setProductList(newProductList);
    }

    const { reorderedProducts, isReordered } = useMemo(() => {
        const reorderedProducts = compareProductList(initialProductList.current, productList);
        const isReordered = !!(reorderedProducts.length);

        return { reorderedProducts, isReordered }
    }, [initialProductList.current, productList])

    const resetOrder = () => {
        setProductList(initialProductList.current)
    }

    const submitOrder = async () => {
        await ProductService.updateProductOrder(reorderedProducts);

        // Refetch products
        swr.mutate(`GET-PRODUCTS-BY-CATEGORY-${router.query.id}`);
    }

    return (
        <>
            {isRowView ? (
                <div className={`${styles.cardList} ${styles.row}`}>
                    {productList.map((product) => (
                       <DefaultCard product={product} key={product.id} />
                    ))}
                </div>
            ) : (
                <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                    <Droppable droppableId="list">
                    {provided => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`${styles.cardList} ${styles.column}`}
                        >
                            {productList.map((product, index) => (
                                <Draggable draggableId={product.id} index={index} key={product.id}>
                                    {provided => (
                                    <div
                                        className={`${styles.cardListItemCol} ${draggingId === product.id ? styles.active : ''}`}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <RowCard product={product} />
                                    </div>
                                    )}
                                </Draggable>
                            ))}
                        {provided.placeholder}
                        </div>
                    )}
                    </Droppable>
                </DragDropContext>
            )}
            {!!isReordered && (
                <div className={styles.orderController}>
                    <div className={styles.orderControllerItem}>
                        <Button
                            innerText='Сбросить порядок'
                            classNames={styles.button}
                            color={{
                                backgroundColor: 'white'
                            }}
                            variant='outlined'
                            clickHandler={resetOrder}
                        />
                    </div>
                    <div className={styles.orderControllerItem}>
                        <Button
                            innerText='Обновить порядок'
                            classNames={styles.button}
                            clickHandler={submitOrder}
                        />
                    </div>
                </div>
            )}
        </>
    )
}


export default CardListDraggable;