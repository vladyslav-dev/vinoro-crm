/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import styles from './BulkPrice.module.scss';
import { IFormBulkPrice } from '@/interfaces/product';
import Button from '../UI/Button';
import InputPrice from '../UI/InputPrice';
import { Controller } from 'react-hook-form';
import Image from 'next/image';
import closeIcon from '@/images/close-icon.svg';
import addIcon from '@/images/add-icon.svg';
import clearAllIcon from '@/images/clear-all-icon.svg';

interface BulkPriceProps {
    formControl?: any;
    getData: any;
    trigger: any;
    addRow: () => IFormBulkPrice[];
    deleteRow: (event: React.MouseEvent) => IFormBulkPrice[];
    deleteAllRows: () => IFormBulkPrice[];
}

const BulkPrice: React.FC<BulkPriceProps> = ({
    getData,
    formControl,
    trigger,
    addRow,
    deleteRow,
    deleteAllRows
}) => {

    const [list, setList] = useState<IFormBulkPrice[]>(() => getData());

    const createSetup = () => {
        setList(addRow())
        setList(addRow())
        setList(addRow())
    }

    return (
        <>
            <div className={`${styles.defaultButton} ${list.length ? styles.hide : ''}`}>
                <Button
                    innerText='Добавить оптовые цены'
                    variant='outlined'
                    clickHandler={createSetup}
                />
            </div>
            <div className={`${styles.bulkPrice} ${list.length ? styles.active : ''}`}>
                <div className={styles.listTitle}>
                    <span className={styles.listTitleItem}>Стоимость</span>
                    <span className={styles.listTitleItem}>Покупка от</span>
                </div>
                <ul className={styles.list}>
                    {list.map((item: any, index: number) => (
                        <li key={item.id} className={styles.listItem}>
                            <span className={styles.itemIndex}>{index + 1}.</span>
                            <div className={styles.itemPrice}>
                                <Controller
                                    name={`bulk_price[${index}].price`}
                                    control={formControl}
                                    render={({ field: { onChange, value } } ) => (
                                        <InputPrice
                                            value={value}
                                            onChange={(e) => {
                                                trigger();
                                                onChange(e);
                                            }}
                                        />
                                    )}
                                />
                            </div>
                            <div className={styles.itemFrom}>
                                <Controller
                                    name={`bulk_price[${index}].from`}
                                    control={formControl}
                                    render={({ field: { onChange, value } } ) => (
                                        <InputPrice
                                            value={value}
                                            onChange={(e) => {
                                                trigger();
                                                onChange(e);
                                            }}
                                            showCurrency={false}
                                        />
                                    )}
                                />
                            </div>
                            <span className={styles.itemRemove} id={item.id} onClick={(event) => setList(deleteRow(event))}>
                                <Image
                                    src={closeIcon}
                                    alt="Delete this"
                                    width={26}
                                    height={26}
                                />
                            </span>
                        </li>
                    ))}
                </ul>
                <div className={styles.bulkPriceControl}>
                    <div className={styles.bulkPriceControlItem} onClick={() => setList(addRow())}>
                        <Image
                            src={addIcon}
                            alt="Add"
                            width={18}
                            height={18}
                        />
                        <span>Добавить</span>
                    </div>
                    <div className={styles.bulkPriceControlItem} onClick={() => setList(deleteAllRows())}>
                        <Image
                            src={clearAllIcon}
                            alt="Delete all"
                            width={18}
                            height={18}
                        />
                        <span>Очистить все</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BulkPrice;