import React, { useMemo, useState } from 'react';
import styles from './Select.module.scss';
import { ExpandArrow } from '@/components/Icons/Arrow';

interface SelectProps {
    label?: string
}

const Select: React.FC<SelectProps> = ({
    label
}) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [data, setData] = useState([
        {
            value: 'test 1',
            selected: true,
        },
        {
            value: 'test 2',
            selected: false,
        },
        {
            value: 'test 3',
            selected: false,
        },
        {
            value: 'test 4',
            selected: false,
        },
    ]);

    const selectedOption = data.find(item => item.selected)
    console.log(selectedOption)
    return (
        <div className={styles.selectWrapper}>
            {label && <label className={styles.selectLabel}>{label}</label>}
            <div className={styles.selected} onClick={() => setIsOpen(!isOpen)}>
                <span className={styles.selectedValue}>{selectedOption!.value}</span>
                <ExpandArrow />
            </div>
            <ul className={`${styles.options} ${isOpen ? styles.open : ''}`}>
                {data.map(({ selected, value }) => !selected ? (
                    <li key={value} className={styles.optionItem}>{value}</li>
                ) : null)}
            </ul>

        </div>
    )
}

export default Select;