import React from 'react';
import classes from './Input.module.css';

function isValidate({valid, shouldValidate, touched}) {
    return !valid && shouldValidate && touched
}


const Input = props => {
    const cls = [classes.Input];
    const inputType = props.type || 'text';
    const htmlFor = `${inputType}-${Math.random()}`;

    if (isValidate(props)) {
        cls.push(classes.invalid);
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />
            {isValidate(props) ? <span> {props.errorMessage || 'Введите верное значение'}</span> : null}

        </div>
    )
};

export default Input;