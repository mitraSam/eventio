/*eslint no-console: off*/
import React, {Component} from 'react';
import 'styles/form';
import WithCurrentUser from '../containers/WithCurrentUser';
import ErrorDisplay from './ErrorDisplay';
import Form from './Form';
import schema from './FormSchemas';

class Login extends Component {
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
                        extraLink={{href: 'signup', text: ["Don't have an account ?", 'Sign up']}}
                        clearErrors={this.props.clearErrors}
                        handleFormSubmit={this.handleSubmit}
                        title="Sign in to eventio"
                        apiError={apiError}
                        schema={schema.login}
                    />
                )}
                {serverError && <ErrorDisplay />}
            </div>
        );
    }
}

export default WithCurrentUser(Login);
