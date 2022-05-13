import React from 'react';
import styles from './FormController.module.scss';
import Button from '@/components/UI/Button';

interface FormControllerProps {
    labels?: {
        resetLabel?: string;
        applyLabel?: string;
    };
    resetChanges: () => void;
    applyChanges: () => void;
    isDisabledSubmitButton?: boolean;
}

const FormController: React.FC<FormControllerProps> = ({
    labels,
    resetChanges,
    applyChanges,
    isDisabledSubmitButton = false
}) => (
    <div className={styles.formController}>
        <div className={styles.formControllerButton}>
            <Button
                innerText={labels?.resetLabel || 'Сбросить'}
                clickHandler={resetChanges}
                variant='outlined'
            />
        </div>
        <div className={styles.formControllerButton}>
            <Button
                innerText={labels?.applyLabel || 'Сохранить'}
                clickHandler={applyChanges}
                variant={isDisabledSubmitButton ? 'disabled' : 'default'}
            />
        </div>
    </div>
)

export default FormController;