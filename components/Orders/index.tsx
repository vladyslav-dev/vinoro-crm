import { IOrder, TOrderStatus } from '@/interfaces/order';
import { useMemo } from 'react';
import OrderList from '@/components/OrderList';
import styles from './Orders.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';

interface IOrdersProps {
    orders: IOrder[];
}

const Orders: React.FC<IOrdersProps> = ({
    orders
}) => {

    const { current } = useSelector((state: RootState) => state.orderReducer);

    const pendingOrders = useMemo(() => orders.filter(item => !item.confirmed), [orders]);
    const processingOrders = useMemo(() => orders.filter(item => item.confirmed && !item.success), [orders]);
    const completedOrders = useMemo(() => orders.filter(item => item.confirmed && item.success), [orders]);

    const data = [
        {
            status: 'pending',
            orders: pendingOrders
        },
        {
            status: 'processing',
            orders: processingOrders
        },
        {
            status: 'completed',
            orders: completedOrders
        }
    ] as Array<{
        status: TOrderStatus;
        orders: IOrder[];
    }>

    return (
        <div className={styles.wrapper}>
            <ul className={styles.orders}>
                {data.map((item, index) => (
                    <li key={index} className={`${styles.orderList} ${current === index ? styles.active : ''}`}>
                        <OrderList status={item.status} orders={item.orders} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Orders;