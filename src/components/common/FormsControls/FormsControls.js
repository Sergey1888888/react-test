import React from 'react';
import styles from './FormsControls.module.css';

export const ElementCreator = Element => ({ input, meta, child, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                <Element {...input} {...props} />
            </div>
            { hasError && <span>{ meta.error }</span> }
        </div>
    )
}

export const Textarea = ElementCreator("textarea");

export const Input = ElementCreator("input");