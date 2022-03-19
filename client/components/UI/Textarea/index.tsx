import React from 'react';
import styles from './Textarea.module.scss';

interface TextareaProps {
    value?: string;
    name?: string;
    label?: string;
    changeHandler?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    classNames?: string;
}

const Textarea: React.FC<TextareaProps> = ({
    value,
    changeHandler,
    classNames,
    name,
    label
}) => {

    const focusHandler = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        const element = event.target;
        element.style.height = element.scrollHeight + 4 + "px";
    }

    const blurHandler = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        event.target.style.height = "170px";
    }

    return (
        <div className={styles.textareaWrapper}>
            <label className={styles.label} htmlFor={name}>{label}</label>
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={changeHandler}
                onFocus={focusHandler}
                onBlur={blurHandler}
                className={`${styles.textarea} ${classNames}`}
                data-gramm="false"
                data-gramm_editor="false"
                data-enable-grammarly="false"
            />
        </div>
    )
}

export default Textarea;