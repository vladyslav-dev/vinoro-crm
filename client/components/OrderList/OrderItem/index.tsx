import styles from './OrderItem.module.scss';
import { IOrder, TOrderColor } from '@/interfaces/order';
import { ORDER_COLORS } from '@/constants/colors';
import Link from 'next/link';

interface OrderItemProps {
    order: IOrder;
    color: TOrderColor;
}

const OrderItem: React.FC<OrderItemProps> = ({
    color,
    order
}) => (
    <Link href={`/order/[id]`} as={`/order/${order.id}`}>
        <a className={styles.order}>
            <span className={styles.borderLeft} style={{ background: ORDER_COLORS[color] }} />
            <div className={styles.orderRow}>
                <span className={styles.orderCol}>Заказ:</span>
                <span className={styles.orderCol}>№{order.order_id}</span>
            </div>
            <div className={styles.orderRow}>
                <span className={styles.orderCol}>На кого:</span>
                <span className={styles.orderCol}>{order.surname} {order.name}</span>
            </div>
            <div className={styles.orderRow}>
                <span className={styles.orderCol}>Дата/Время заказа:</span>
                <span className={styles.orderCol} style={{ color: ORDER_COLORS[color] }}>{order.created_at}</span>
            </div>
        </a>
    </Link>
)

export default OrderItem;