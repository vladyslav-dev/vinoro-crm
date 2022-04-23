import type { NextPage } from 'next'
import styles from '@/styles/pages/home.module.scss'
import NavigationCard from '@/components/NavigationCard';
import Section from '@/layouts/Section';
import { BasketIcon } from '@/components/Icons/BasketIcon';
import { NewIcon } from '@/components/Icons/NewIcon';
import { PackageIcon } from '@/components/Icons/PackageIcon';
import { SaleIcon } from '@/components/Icons/SaleIcon';
import { AddIcon } from '@/components/Icons/AddIcon';


import useSWR from 'swr';
import DashboardService from '@/services/DashboardService';

const Home: NextPage = () => {

  const catalogResponse = useSWR('DASHBOARD-GET-INFO', async () => await DashboardService.getInfo())


  const catalogInfo = catalogResponse.data;

  console.log(catalogInfo)



  if (!catalogInfo) {
    return null;
  }

  return (
    <Section title="Главная" showBackground={false} hideScrollbar>
      <div className={styles.sectionGrid}>
        <div className={styles.sectionGridCol}>
          <div className={styles.sectionGridStandard}>
            <div className={styles.sectionItem}>
              <NavigationCard
                type='standard'
                title='Все товары'
                link='/products'
                color={'COLOR_JORDY_BLUE'}
                numberInfo={String(catalogInfo.totalProducts)}
                renderIcon={(props) => <BasketIcon {...props} />}
              />
            </div>
            <div className={styles.sectionItem}>
              <NavigationCard
                type='standard'
                title='Все заказы'
                link='/orders'
                color={'COLOR_CREAM_BRULEE'}
                numberInfo={String(catalogInfo.totalOrders)}
                renderIcon={(props) => <PackageIcon {...props} />}
              />
            </div>
            <div className={styles.sectionItem}>
              <NavigationCard
                type='standard'
                title='Новые товары'
                link='/new-products'
                color={'COLOR_MADANG'}
                numberInfo={String(catalogInfo.totalNewProducts)}
                renderIcon={(props) => <NewIcon {...props} />}
              />
            </div>
            <div className={styles.sectionItem}>
              <NavigationCard
                type='standard'
                title='Скидки на товары'
                link='/discount-products'
                color={'COLOR_SEA_PINK'}
                numberInfo={String(catalogInfo.totalDiscountPriceProducts)}
                renderIcon={(props) => <SaleIcon {...props} />}
              />
            </div>
          </div>
          <div className={styles.sectionGridRow}>
            <div className={styles.sectionItem}>
              <NavigationCard
                type='row'
                link='/add-product'
                title='Добавить товар'
                color={'COLOR_PERIWINKLE_GRAY'}
                renderIcon={(props) => <AddIcon {...props} />}
              />
            </div>
            <div className={styles.sectionItem}>
              <NavigationCard
                type='row'
                link='/add-category'
                title='Добавить категорию'
                color={'COLOR_BLUE_CHALK'}
                renderIcon={(props) => <AddIcon {...props} />}
              />
            </div>
          </div>
        </div>
        <div className={styles.sectionGridCol}>
          <NavigationCard
            type='multi'
            title='Каталог'
            color={'COLOR_WATER_LEAF'}
            multiCardData={catalogInfo.catalogInfo}
          />
        </div>
      </div>
    </Section>
  )
}

export default Home
