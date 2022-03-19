import React from 'react';
import CatalogService from '@/services/CatalogService';

import { NextPage, GetServerSideProps } from 'next';
import { ICatalog } from '@/interfaces/catalog';

export const getServerSideProps: GetServerSideProps = async (context) => {

    const catalog = await CatalogService.createCatalog({
        catalog_name: {
            ru: '',
            uk: '',
            en: '',
        },
        catalog_image: '',
        visibility: true
    })

    return {
        props: {
            catalog
        },
      }
}

interface CatalogProps {
    catalog: ICatalog;
}

const Catalog: NextPage<CatalogProps> = ({ catalog }) => {
    console.log('catalog', catalog)
    return (
        <div>
            Catalog
        </div>
    )
}

export default Catalog

