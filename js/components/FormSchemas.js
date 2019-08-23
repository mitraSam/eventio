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
};

export default schemas;
