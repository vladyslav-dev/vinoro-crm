import { ORDER_COLORS } from '@/constants/colors';
import { IOrder } from '@/interfaces/order';
import { IProduct } from '@/interfaces/product';
import OrderService from '@/services/OrderService';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { useSWRConfig } from 'swr';
import { EyeIcon } from '../Icons/EyeIcon';
import Portal from '../Portal';
import Img from '../UI/Img';
import Image from 'next/image';
import closeIcon from '@/images/close-icon.svg';
import styles from './OrderDetail.module.scss'

interface OrderDetailProps {
    order: IOrder;
    orderProducts: IProduct[];
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order, orderProducts }) => {

    const router = useRouter();
    const swr = useSWRConfig();

    const [productDetailId, setProductDetailId] = useState<string>('');

    const productCollection = useMemo(() => Object.assign({}, ...orderProducts.map(product => ({ [product.id]: product }))), [orderProducts]);

    const updateConfirmed = () => {
        swr.mutate(`UPDATE-CONFIRMED${order.id}`, async () => OrderService.update(order.id, { confirmed: true }));
        swr.mutate(`ORDERS-GET-ONE-${router.query.id}`)
    }

    const updateSuccess = () => {
        swr.mutate(`UPDATE-CONFIRMED${order.id}`, async () => OrderService.update(order.id, { success: true }));
        swr.mutate(`ORDERS-GET-ONE-${router.query.id}`)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.section}>
                <div className={styles.sectionTitle}>
                    <h2>Информация</h2>
                </div>
                <div className={styles.sectionContent}>
                    <div className={styles.sectionContentRow}>
                        <span className={styles.sectionCol}>Имя/Фамилия:</span>
                        <span className={styles.sectionCol}>{order.name} {order.surname}</span>
                    </div>
                    <div className={styles.sectionContentRow}>
                        <span className={styles.sectionCol}>Email:</span>
                        <span className={styles.sectionCol}>
                            <a href={`mailto:${order.email}`}>{order.email}</a>
                        </span>
                    </div>
                    <div className={styles.sectionContentRow}>
                        <span className={styles.sectionCol}>Телефон:</span>
                        <span className={styles.sectionCol}>
                            <a href={`tel:${order.phone}`}>{order.phone}</a>
                        </span>
                    </div>
                    <div className={styles.sectionContentRow}>
                        <span className={styles.sectionCol}>Город:</span>
                        <span className={styles.sectionCol}>{order.city}</span>
                    </div>
                    {(!order.post_adress && !order.post_number) && (
                        <div className={styles.sectionContentRow}>
                            <span className={styles.sectionCol}>Адрес доставки:</span>
                            <span className={styles.sectionCol}>{order.local_address ?? 'Не указано'}</span>
                        </div>
                    )}
                    {order.post_adress && order.post_number && (
                        <div className={styles.sectionContentRow}>
                            <span className={styles.sectionCol}>Адрес/номер отделения:</span>
                            <span className={styles.sectionCol}>НоваПошта {order.post_adress}, №{order.post_number}</span>
                        </div>
                    )}
                    <div className={styles.sectionContentRow}>
                        <span className={styles.sectionCol}>Метод оплаты:</span>
                        <span className={styles.sectionCol}>{order.payment}</span>
                    </div>
                    <div className={styles.sectionContentRow}>
                        <span className={styles.sectionCol}>Дата/Время заказа:</span>
                        <span className={styles.sectionCol}>{order.created_at}</span>
                    </div>
                    <div className={styles.sectionContentRow}>
                        <span className={styles.sectionCol}>Статус:</span>
                        <span
                            className={styles.sectionCol}
                            style={{ color: order.confirmed ? ORDER_COLORS['COLOR_SUCCESS'] : ORDER_COLORS['COLOR_DANGER'] }}
                        >{order.confirmed ? 'Обработан' : 'Не обработан'}</span>
                    </div>
                    <div className={styles.sectionContentRow}>
                        <span className={styles.sectionCol}>Товар получен: </span>
                        <span
                            className={styles.sectionCol}
                            style={{ color: order.success ? ORDER_COLORS['COLOR_SUCCESS'] : ORDER_COLORS['COLOR_DANGER'] }}
                        >{order.success ? 'Да' : 'Нет'}</span>
                    </div>
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.sectionTitle}>
                    <h2>Товары</h2>
                </div>
                <div className={styles.sectionContent}>
                    <div className={styles.table}>
                        <div className={styles.tableHead}>
                            <div className={styles.tableRow}>
                                <div className={styles.tableCol}>Товар</div>
                                <div className={styles.tableCol}>Название товара</div>
                                <div className={styles.tableCol}>Стоимость</div>
                                <div className={styles.tableCol}>Количество</div>
                                <div className={styles.tableCol}>Полная стоимость</div>
                            </div>
                        </div>
                        <div className={styles.tableBody}>
                            {order.products.map((product, index) => (
                                <div className={styles.tableRow} key={index}>
                                    <div className={styles.tableCol}>
                                        <span onClick={() => setProductDetailId(product.product_ref)}>
                                            <EyeIcon />
                                        </span>
                                        <Portal>
                                            <div className={`${styles.productDetailBackground} ${productDetailId === product.product_ref ? styles.active : ''}`} onClick={() => setProductDetailId('')}>
                                                <div
                                                    className={`${styles.productDetailModal}`}
                                                    onClick={e => e.stopPropagation()}
                                                >
                                                    <div className={styles.productModel}>
                                                        <div className={styles.productImage}>
                                                            <Img src={product.image} />
                                                        </div>
                                                        <div className={styles.productName}>
                                                            <p>{product.name['uk']}</p>
                                                        </div>
                                                        <div className={styles.productAvailability}>
                                                            {productCollection[product.product_ref].availability ? <p className={styles.cardAvailabilityGreen}>Есть в наличии &nbsp; &#10004;</p> : <p className={styles.cardAvailabilityRed}>Нет в наличии &nbsp; &#10008;</p>}
                                                        </div>
                                                        <div className={styles.productPrice}>
                                                            {product.discount_price ? (
                                                                <div className={styles.productDiscount}>
                                                                    <span className={styles.productNewPrice}>{product.discount_price} ₴</span>
                                                                    {product.price !== 1 && (
                                                                        <span className={styles.productOldPrice}>{product.price} ₴</span>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <div className={styles.productPrice}>
                                                                    {product.price !== 1 && (
                                                                        <span>{product.price} ₴</span>
                                                                    )}

                                                                </div>
                                                            )}
                                                        </div>
                                                        {!!product.bulk_price.length && (
                                                            <div className={styles.bulkPrice}>
                                                                <div className={styles.bulkPriceTitle}>
                                                                    <p>Оптовая цена:</p>
                                                                </div>
                                                                <div className={styles.bulkPriceList}>
                                                                    {product.bulk_price.map((item) => (
                                                                        <div key={item.id} className={styles.bulkPriceItem}>{item.price} ₴ от {item.from}шт.</div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className={styles.closeModal} onClick={() => setProductDetailId('')}>
                                                        <Image
                                                            src={closeIcon}
                                                            alt="Close this"
                                                            width={34}
                                                            height={34}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </Portal>

                                    </div>
                                    <div className={styles.tableCol}>{product.name['uk']}</div>
                                    <div className={styles.tableCol}>{product.current_price}</div>
                                    <div className={styles.tableCol}>{product.quantity}</div>
                                    <div className={styles.tableCol}>{product.total_price}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.totalPrice}>Всего: {order.order_price}</div>
                </div>
            </div>
            <div className={styles.section}>
                {!order.confirmed && (
                    <button
                        className={styles.button}
                        style={{ background: ORDER_COLORS['COLOR_GOLD']}}
                        onClick={updateConfirmed}
                    >Установить как обработан</button>
                )}
                {(order.confirmed && !order.success) && (
                    <button
                        className={styles.button}
                        style={{ background: ORDER_COLORS['COLOR_SUCCESS'] }}
                        onClick={updateSuccess}
                    >Товар доставлен</button>
                )}
            </div>
        </div>
    )
}

export default OrderDetail;