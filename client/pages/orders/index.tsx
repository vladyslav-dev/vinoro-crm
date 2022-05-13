import React from 'react';
import { NextPage } from 'next';
import Section from '@/layouts/Section';
import EmptyList from '@/components/EmptyList';
import Head from 'next/head';
import useSWR from 'swr';
import OrderService from '@/services/OrderService';
import Orders from '@/components/Orders';
import Loader from '@/components/UI/Loader';

const OrderPage: NextPage = () => {

    const { data: orderList } = useSWR('ORDERS-GET-ALL', async () => await OrderService.getAll());
    if (!orderList) {
        return null
    }

    return (
        <>
            <Head>
                <title>Vinoro — Заказы</title>
            </Head>
            <Section title={'Заказы'} orderController>
                {!orderList ? (
                    <Loader type='bubbles' />
                ) : (
                    <>
                        {orderList.length ? (
                            <Orders orders={orderList} />
                        ) : (
                            <EmptyList />
                        )}
                    </>
                )}
            </Section>
        </>
    )
}

export default OrderPage
