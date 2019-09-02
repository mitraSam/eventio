import React, {Component} from 'react';
import 'styles/form';
import WithCurrentUser from '../containers/WithCurrentUser';
import ErrorDisplay from './ErrorDisplay';
import Form from './Form';
import schema from './FormSchemas';

class SignUp extends Component {
    componentDidMount() {
        const {clearErrors} = this.props;
        /* clear server & api errors => triggers reducer action */
        clearErrors();
    }

    handleSubmit = values => {
        const {setUser, clearErrors} = this.props;
        clearErrors();
        /* log user in => triggers reduce action */
        setUser(values);
    };

    render() {
        const {apiError, serverError} = this.props;

        return (
            <div>
                {!serverError && (
                    <Form
                        extraLink={{href: 'login', text: ['Already have an account ?', 'Sign in']}}
                        clearErrors={this.props.clearErrors}
                        handleFormSubmit={this.handleSubmit}
                        title="Sign in to eventio"
                        apiError={apiError}
                        schema={schema.signup}
                    />
                )}
                {serverError && <ErrorDisplay />}
            </div>
        );
    }
}

export default WithCurrentUser(SignUp);
