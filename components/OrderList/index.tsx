import styles from './OrderList.module.scss';
import { CompletedSvg } from '../Icons/CompletedIcon';
import { ProcessingSvg } from '../Icons/ProcessingIcon';
import { NotConfirmedSvg } from '../Icons/NotConfirmedIcon';
import { IOrder, IOrderStatus, TOrderStatus } from '@/interfaces/order';
import OrderItem from './OrderItem';
import { ORDER_COLORS } from '@/constants/colors';
import EmptyList from '@/components/EmptyList';

interface OrderListProps {
    status: TOrderStatus;
    orders: IOrder[];
}

const OrderStatus: { [key in TOrderStatus]: IOrderStatus } = {
    pending: {
        icon: <NotConfirmedSvg />,
        title: 'Не обработанные',
        color: 'COLOR_DANGER'
    },
    processing: {
        icon: <ProcessingSvg />,
        title: 'В процессе',
        color: 'COLOR_GOLD'
    },
    completed: {
        icon: <CompletedSvg />,
        title: 'Доставлено',
        color: 'COLOR_SUCCESS'
    }
}

const OrderList: React.FC<OrderListProps> = ({
    status,
    orders
}) => {

    return (
        <div className={styles.orderListWrapper}>
            <div className={styles.orderTitle}>
                {OrderStatus[status].icon}
                <h3 style={{ color: ORDER_COLORS[OrderStatus[status].color] }}>{OrderStatus[status].title}</h3>
            </div>
            <div className={styles.orderList}>
                {!orders.length ? (
                    <div className={styles.emptyList}>
                        <EmptyList text={'Заказы с таким статусом отсутствуют'} />
                    </div>
                ) : (
                    <>
                        {orders.map(order => (
                            <OrderItem key={order.id} order={order} color={OrderStatus[status].color} />
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default OrderList;