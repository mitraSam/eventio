import {Component} from 'react';
import PropTypes from 'prop-types';
import {validateEmail, isDateFuture} from '../Utils';

/* FormClass is extended by SignUp, Login and EventsModal components and provides field validation functionality */
class FormClass extends Component {
    handleText = ({target}) => {
        const {value, name, placeholder} = target;
        /* if value is empty set the error property of the field to default message */
        if (!value) return this.setEmptyField(name, placeholder);
        /* if field has value update state and set error to empty string */
        this.setField(name, target.value, '');
    };

    handleDate = ({target}) => {
        const {value} = target;
        const startsAt = target.valueAsDate;
        /* if date is empty set it's error field to default message */
        if (!value) return this.setEmptyField('date', 'Date');

        /*if date is in the future set startsAt property
          call isTimePast to check if time field is set and if date+time don't form a past date*/
        if (isDateFuture(startsAt)) {
            this.setState({startsAt}, () => this.isTimePast());
            return this.setField('date', target.value, '');
        }
        /* if date takes place  in past set it's  error prop */
        return this.setField('date', target.value, 'Date has to be set in the future');
    };

    isTimePast = targetValue => {
        const {time, startsAt} = this.state;
        /* if function is called from handleDate() there is no target value but the state time prop might hold a value  */
        const minSec = targetValue || time.value;

        if (minSec) {
            /* split time string prop to array holding [minutes][seconds] */
            const t = minSec.split(':');
            startsAt.setHours(t[0]);
            startsAt.setMinutes(t[1]);

            /* add time to date and check if date happens in the future */
            if (!isDateFuture(startsAt)) {
                /* set time error field if event is taking place in the past*/
                this.setField('time', minSec.value, 'Event has to be set in the future');
                return true;
            }
        }
    };

    handleCapacity = ({target}) => {
        const {value, placeholder} = target;
        /* if date is empty set it's error field to default message */

        if (!value) return this.setEmptyField('capacity', placeholder);
        if (Number(value) && Number(value) > 0) return this.setField('capacity', target.value, '');

        /* if field value is not positive number set it's error prop */
        this.setField('capacity', target.value, 'Capacity has to be a positive nr');
    };

    handleTime = ({target}) => {
        const {value, placeholder} = target;
        const {startsAt} = this.state;

        /* if date is empty set it's error field to default message */
        if (!value) return this.setEmptyField(name, placeholder);
        if (startsAt) {
            /* if date prop has already been set check if time+date don't/didn't happen in the past */
            if (this.isTimePast(target.value)) return;
        }

        /* update time value prop with input value*/
        this.setField('time', target.value, '');
    };

    handleEmail = ({target}) => {
        /* if email is empty set it's error field to default message */
        if (!target.value) return this.setEmptyField('email', 'Email');

        /* update email value prop & check if email is valid, if not set it's error prop  */
        if (validateEmail(target.value)) return this.setField('email', target.value, '');
        this.setField('email', target.value, 'Email pattern [a-z](\\w*)+@strv.com');
    };

    checkForEmptyInputs(inputs) {
        /* remove button field */
        inputs.pop();

        let emptyInputs = false;

        /* if state[field][error] prop is not empty  || if input holds no value set emptyInputs to true  */
        inputs.forEach(input => {
            const error = this.checkError(this.state[input.name]);
            if (error) emptyInputs = true;
            if (!input.value) {
                this.setEmptyField(input.name, input.placeholder);
                emptyInputs = true;
            }
        });

        /* if field is empty || has error emptyInputs === true */
        return emptyInputs;
    }

    checkError = val => !!val.error;

    handleRepeatPassword = ({target}) => {
        const {password} = this.state;
        const {value} = target;
        /* if email is empty set it's error field to default message */
        if (!value) return this.setEmptyField('repeatPassword', 'Repeat password');

        /* if state[password][value] holds a value compare it with the target value
         * if the target value  matches with already set password, set repeatPassword error to empty str
         * */
        if (password.value === value) return this.setField('repeatPassword', value, '');

        /* update field & set it's error value to error  */
        this.setField('repeatPassword', value, 'Passwords do not match');
    };

    handlePassword = ({target}) => {
        const {value} = target;
        const {repeatPassword} = this.state;

        /* if pasword is empty set it's error field to default message */
        if (!value) return this.setEmptyField('password', 'Password');
        if (repeatPassword.value) {
            /* if state[repeatPassword][value] holds a value compare it with the target value
             * if the target value  matches with already set repeatPassword, set repeatPassword error to empty str
                else set repeatPassword error value
             * */
            if (repeatPassword.value !== value)
                this.setField('repeatPassword', repeatPassword.value, 'Passwords do not match');
            else this.setField('repeatPassword', repeatPassword.value, '');
        }
        this.setField('password', target.value, '');
    };

    setEmptyField = (field, placeholder) =>
        /* set the state[field][error] prop to default message if field is empty */
        this.setState({
            [field]: {value: '', error: `${placeholder} cannot be empty`},
        });
    setField = (field, value, error) => this.setState({[field]: {value, error}});
}

FormClass.propTypes = {
    setUser: PropTypes.func.isRequired,
};

export default FormClass;
