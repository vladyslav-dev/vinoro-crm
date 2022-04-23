/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './View.module.scss';
import defaultViewIcon from '@/images/view/default-view.svg';
import rowViewIcon from '@/images/view/row-view.svg';
import { useRouter } from 'next/router';
import { VIEW_ROW_LIST, VIEW_COLUMN_LIST } from '@/constants/index';
import { getViewMode } from '@/utils/toolbar';

const ViewComponent: React.FC = () => {

    const router = useRouter();

    const setRowList = () => {
        router.query.view = VIEW_ROW_LIST;
        router.push(router, undefined, { shallow: true });
    }

    const setColumnList = () => {
        router.query.view = VIEW_COLUMN_LIST;
        router.push(router, undefined, { shallow: true });
    }

    const { isRowView, isColumnView } = getViewMode(router);

    return (
        <div className={styles.view}>
            <span className={`${styles.viewItem} ${isRowView ? styles.row : ''}`} onClick={setRowList}>
                <img src={defaultViewIcon.src} alt='default view' />
            </span>
            <span className={`${styles.viewItem} ${isColumnView ? styles.column : ''}`} onClick={setColumnList}>
                <img src={rowViewIcon.src} alt='default view' />
            </span>
        </div>
    )
}

const View = React.memo(ViewComponent);

export default View;