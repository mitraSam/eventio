import * as Yup from 'yup';

const schemas = {
    login: {
        validation: Yup.object().shape({
            email: Yup.string()
                .email()
                .required('Required'),
            password: Yup.string().required('Required'),
        }),
        values: {email: '', password: ''},
    },
    signup: {
        validation: Yup.object().shape({
            email: Yup.string()
                .email()
                .required('Required'),
            password: Yup.string().required('Required'),
            passwordConfirmation: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Required'),
            'first name': Yup.string().required('Required'),
            'last name': Yup.string().required('Required'),
        }),
        values: {'first name': '', 'last name': '', email: '', password: '', passwordConfirmation: ''},
    },
};

export default schemas;
