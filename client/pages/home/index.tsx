import type { NextPage } from 'next'
import styles from '@/styles/pages/home.module.scss'
import Image from 'next/image';
import NavigationCard from '@/components/NavigationCard';
import Section from '@/layouts/Section';
import { BasketIcon } from '@/components/Icons/BasketIcon';
import { NewIcon } from '@/components/Icons/NewIcon';
import { PackageIcon } from '@/components/Icons/PackageIcon';
import { SaleIcon } from '@/components/Icons/SaleIcon';
import { AddIcon } from '@/components/Icons/AddIcon';

import foodIcon from '@/images/icons/food-icon.svg';
import alcoholIcon from '@/images/icons/alcohol-icon.svg';
import detergentIcon from '@/images/icons/detergent-icon.svg';

const Home: NextPage = () => {

  const data = [
    {
      title: 'Продукты питания',
      link: '/catalog/#foodstuffs',
      renderIcon: () => <Image src={foodIcon} width={80} height={80} alt="Продукты питания" />,
      info: [
        {
          infoTitle: 'Всего товара',
          infoNumber: '92'
        },
        {
          infoTitle: 'Категорий',
          infoNumber: '7'
        }
      ]
    },
    {
      title: 'Алкогольные напитки',
      link: '/catalog/#alcoholic-drinks',
      renderIcon: () => <Image src={alcoholIcon} width={80} height={80} alt="Алкогольные напитки" />,
      info: [
        {
          infoTitle: 'Всего товара',
          infoNumber: '54'
        },
        {
          infoTitle: 'Категорий',
          infoNumber: '9'
        }
      ]
    },
    {
      title: 'Бытовая химия',
      link: '/catalog/#household-chemicals',
      renderIcon: () => <Image src={detergentIcon} width={80} height={80} alt="Бытовая химия" />,
      info: [
        {
          infoTitle: 'Всего товара',
          infoNumber: '124'
        },
        {
          infoTitle: 'Категорий',
          infoNumber: '4'
        }
      ]
    },
  ]

  return (
    <Section title="Главная" showBackground={false} >
      <div className={styles.sectionGrid}>
        <div className={styles.sectionGridCol}>
          <div className={styles.sectionGridStandard}>
            <div className={styles.sectionItem}>
              <NavigationCard
                type='standard'
                title='Все товары'
                link='/products'
                color={'COLOR_JORDY_BLUE'}
                numberInfo='317'
                renderIcon={(props) => <BasketIcon {...props} />}
              />
            </div>
            <div className={styles.sectionItem}>
              <NavigationCard
                type='standard'
                title='Все заказы'
                link='/orders'
                color={'COLOR_CREAM_BRULEE'}
                numberInfo='27'
                renderIcon={(props) => <PackageIcon {...props} />}
              />
            </div>
            <div className={styles.sectionItem}>
              <NavigationCard
                type='standard'
                title='Новые товары'
                link='/new-products'
                color={'COLOR_MADANG'}
                numberInfo='14'
                renderIcon={(props) => <NewIcon {...props} />}
              />
            </div>
            <div className={styles.sectionItem}>
              <NavigationCard
                type='standard'
                title='Скидки на товары'
                link='/discount-products'
                color={'COLOR_SEA_PINK'}
                numberInfo='44'
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
            multiCardData={data}
          />
        </div>
      </div>
    </Section>
  )
}

export default Home
