import React from 'react';
import {firstLetterUppercase} from '../Utils';
const Input = ({errors, touched, handleChange, handleBlur, fieldName, value}) => {
    return (
        <div>
            <p>
                <input
                    id={fieldName}
                    placeholder={firstLetterUppercase(fieldName)}
                    type="text"
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                        errors[fieldName] && touched[fieldName]
                            ? 'form-component__input  error'
                            : 'form-component__input'
                    }
                />
            </p>
            <div className="form-component__input-error-container">
                {errors[fieldName] && touched[fieldName] && (
                    <span className="form-component__input-error">{errors[fieldName]}</span>
                )}
            </div>
        </div>
    );
};

export default Input;
