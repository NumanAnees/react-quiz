import React, {Component} from 'react';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

export default class Auth extends Component {

    state = {
      formControls: {
          email: {
              value: '',
              type: 'email',
              label: 'Email',
              errorMessage: 'Введите корректный email',
              valid: false,
              touched: false,
              validation: {
                  required: true,
                  email: true
              }
          },
          password: {
              value: '',
              type: 'password',
              label: 'Пароль',
              errorMessage: 'Введите корректный пароль',
              valid: false,
              touched: false,
              validation: {
                  required: true,
                  minLength: 6
              }
          }
      }
    };

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                key={controlName+index}
                type={control.type}
                label={control.label}
                value={control.value}
                valid={control.valid}
                touched={control.touched}
                shouldValidate={!!control.validation}
                errorMessage={control.errorMessage}
                onChange={event => this.onChangeHandler(event, controlName)}
                />
            )

        })
    }

    onChangeHandler = (event, controlName) => {
        console.log(`${controlName}: ${event.target.value}`);
    };

    submitHandler = event => {
        event.preventDefault();
    };

    loginHandler = () => {

    };

    registerHandler = () => {

    };

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        {this.renderInputs()}
                        <Button
                            type="success"
                            onClick={this.loginHandler}>
                            Войти
                        </Button>
                        <Button
                            type="primary"
                            onClick={this.registerHandler}>
                            Зарегистрироваться
                        </Button>
                    </form>
                </div>
            </div>
        )
    }

}