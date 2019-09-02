/* eslint react/prop-types: 0 */
import React from 'react';
import {Formik} from 'formik';

import Input from './Input';

const Form = ({schema, title, apiError, clearErrors, handleFormSubmit, extraLink}) => (
    <div>
        <Formik
            validationSchema={schema.validation}
            initialValues={schema.values}
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(false);
                clearErrors();
                handleFormSubmit(values);
            }}>
            {props => {
                const {values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit} = props;
                return (
                    <div>
                        <form id={`${title + 'Form'}`} className="form-component" onSubmit={handleSubmit}>
                            <p>
                                <legend>{title}</legend>
                                <sub>enter your details bellow</sub>
                            </p>
                            <span className="form-component__apiError">{apiError}</span>
                            {Object.keys(values).map(fieldName => (
                                <Input
                                    key={fieldName}
                                    value={values[fieldName]}
                                    fieldName={fieldName}
                                    errors={errors}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    touched={touched}
                                    placeholder={fieldName === 'passwordConfirmation' ? 'confirm password' : null}
                                    type={
                                        fieldName === 'password' || fieldName === 'passwordConfirmation'
                                            ? 'password'
                                            : 'text'
                                    }
                                />
                            ))}
                            {extraLink && (
                                <a className="form-component__bottomLink" escape="false" href={`/${extraLink.href}`}>
                                    {extraLink.text[0]}
                                    <em> {extraLink.text[1]}</em>
                                </a>
                            )}
                            <button type="submit" className="form-component__submit" disabled={isSubmitting}>
                                Submit
                            </button>{' '}
                        </form>
                    </div>
                );
            }}
        </Formik>
    </div>
);

export default Form;
