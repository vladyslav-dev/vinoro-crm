import React from 'react';
import { NextPage } from 'next';
import Section from '@/layouts/Section';
import EmptyList from '@/components/EmptyList';
import Head from 'next/head';

const Orders: NextPage = () => {

    return (
        <>
            <Head>
                <title>Vinoro — Заказы</title>
            </Head>
            <Section title={'Заказы'} toolbar showBackground={false}>
                <EmptyList text='В процессе разработки...' />
            </Section>
        </>
    )
}

export default Orders
