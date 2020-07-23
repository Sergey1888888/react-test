import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Login as log } from '../../redux/auth-reducer';
import { Input } from '../common/FormsControls/FormsControls';
import { required, maxLengthCreator } from '../../utils/validators/validators';
import { Redirect } from 'react-router-dom';

const maxLength50 = maxLengthCreator(50);

let LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder="Email" name="email"
                    validate={[ required ]}
                    component={Input} />
        </div>
        <div>
            <Field type="password" placeholder="Password" name="password"
                    validate={[ required, maxLength50 ]}
                    component={Input} />
        </div>
        <div>
            <Field type="checkbox" name="rememberMe"
                    component={Input} /> Remember me
        </div>
        <div>
            <button>Login</button>
        </div>
    </form>
}

let LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

let Login = (props) => {
    let onSubmit = (formData) => {
        props.log(formData.email, formData.password, formData.rememberMe);
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, { log })(Login);