import React from 'react';
import styles from './Textarea.module.scss';
import { Path, UseFormRegister } from 'react-hook-form';

interface TextareaProps {
    registerPath: Path<any>;
    register: UseFormRegister<any>;
    label?: string;
}

const Textarea: React.FC<TextareaProps> = ({
    label = 'Default label',
    registerPath,
    register,
}) => {

    const focusHandler = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        const element = event.target;
        element.style.height = element.scrollHeight + 4 + "px";
        element.style.zIndex = '8';
    }

    const blurHandler = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        event.target.style.height = "170px";
        setTimeout(() => event.target.style.zIndex = "0", 400)
    }

    return (
        <div className={styles.textareaWrapper}>
            <label className={styles.label}>{label}</label>
            <div className={styles.textareaRelative}>
                <textarea
                    className={styles.textarea}
                    data-gramm="false"
                    data-gramm_editor="false"
                    data-enable-grammarly="false"
                    {...register(registerPath)}
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                />
            </div>
        </div>
    )
}

export default Textarea;