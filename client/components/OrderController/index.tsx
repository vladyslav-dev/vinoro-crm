import { RootState } from '@/store/index';
import { decrease, increase } from '@/store/slices/orderController';
import { useDispatch, useSelector } from 'react-redux';
import { OrderControllerArrow } from '../Icons/Arrow';
import styles from './OrderController.module.scss';

const OrderController: React.FC = () => {

    const dispatch = useDispatch();

    const { current } = useSelector((state: RootState) => state.orderReducer);

    return (
        <div className={styles.controller}>
            <button
                onClick={() => dispatch(decrease())}
                className={`${styles.controllerItem} ${current === 0 ? styles.disable : ''}`}
            >
                <OrderControllerArrow />
            </button>
            <span className={styles.controllerDot} />
            <button
                onClick={() => dispatch(increase())}
                className={`${styles.controllerItem} ${current === 2 ? styles.disable : ''}`}
            >
                <OrderControllerArrow />
            </button>
        </div>
    )
}

export default OrderController;