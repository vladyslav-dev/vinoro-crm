import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Section from '@/layouts/Section';
import Head from 'next/head';
import useSWR from 'swr';
import OrderService from '@/services/OrderService';
import { useRouter } from 'next/router';
import OrderDetail from '@/components/OrderDetail';
import ProductService from '@/services/ProductService';

const Order: NextPage = () => {

    const router = useRouter();

    const [productIds, setProductIds] = useState<string[]>([]);

    const { data: order } = useSWR(`ORDERS-GET-ONE-${router.query.id}`, async () => (
        await OrderService.getById(router.query.id as string)
    ));
    const { data: products } = useSWR(productIds.length ? `GET-PRODUCTS-BY-ORDER-${router.query.id}` : null, async () => (
        await ProductService.getProductsByIdList(productIds)
    ));

    useEffect(() => {
        if (order) {
            setProductIds([...order.products.map(product => product.product_ref)])
        }
    }, [order]);

    if (!order || !products) {
        return null
    }

    return (
        <>
            <Head>
                <title>Vinoro — Заказ {order.order_id}</title>
            </Head>
            <Section title={`Заказ №${order.order_id}`}>
                <OrderDetail order={order} orderProducts={products} />
            </Section>
        </>
    )
}

export default Order
