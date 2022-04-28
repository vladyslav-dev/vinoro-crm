import React, { useState, useRef } from 'react';
import styles from './Select.module.scss';
import { ExpandArrow } from '@/components/Icons/Arrow';

export interface ISelectData {
    id: string;
    value: string;
    selected: boolean;
}
interface SelectProps {
    label?: string;
    data: ISelectData[];
    updateData: (callback: any) => any;
}

const selectedOption = (data: ISelectData[]) => data?.find(item => item.selected)

const Select: React.FC<SelectProps> = ({
    label,
    data,
    updateData
}) => {

    const selectedRef = useRef<any>(null)

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const selectHandler = (event: React.MouseEvent): void => {
        const element = event.target as HTMLLIElement;

        setTimeout(() => updateData(data.map((item: any) => (
            item.id === element.id ? { ...item, selected: true } : { ...item, selected: false }
        ))), 100)

        setIsOpen(false)
    }

    return (
        <div className={`${styles.selectWrapper} ${isOpen ? styles.open : ''}`}>
            {label && <label className={styles.selectLabel}>{label}</label>}
            <div className={styles.selected} onClick={() => setIsOpen(!isOpen)} >
                <span className={styles.selectedValue}>{selectedOption(data)!.value}</span>
                <ExpandArrow />
            </div>
            <div className={styles.optionsBackground} onClick={() => setIsOpen(false)} />
            <div className={styles.optionsWrapper}>
                <ul className={styles.options} ref={selectedRef}>
                    {data.map(({ selected, value, id }) => !selected ? (
                        <li
                            key={id}
                            id={id}
                            className={styles.optionItem}
                            onClick={selectHandler}
                        >{value}</li>
                    ) : null)}
                </ul>
            </div>

        </div>
    )
}

export default Select;