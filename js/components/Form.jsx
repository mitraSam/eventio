/* eslint react/prop-types: 0 */
import React from 'react';
import {Formik} from 'formik';

import Input from './Input';

const Form = ({schema, title, authError, clearErrors, handleFormSubmit, extraLink}) => (
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
                            {authError && <span>{authError}</span>}
                            <p>
                                <legend>{title}</legend>
                                <sub>enter your details bellow</sub>
                            </p>
                            {Object.keys(values).map(fieldName => (
                                <Input
                                    key={fieldName}
                                    value={values[fieldName]}
                                    fieldName={fieldName}
                                    errors={errors}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    touched={touched}
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
