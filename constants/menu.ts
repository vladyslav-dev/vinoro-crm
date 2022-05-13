// @images
import homeIcon from '@/images/icons/home-icon.svg';
import basketIcon from '@/images/icons/basket-icon.svg';
import catalogIcon from '@/images/icons/catalog-icon.svg';
import packageIcon from '@/images/icons/package-icon.svg';


export const images = [
    {
        icon: homeIcon,
        tooltip: 'Главная',
        url: '/home',
    },
    {
        icon: basketIcon,
        tooltip: 'Все товары',
        url: '/products',
    },
    {
        icon: catalogIcon,
        tooltip: 'Каталог',
        url: '/catalog',
    },
    {
        icon: packageIcon,
        tooltip: 'Заказы',
        url: '/orders',
    },
]