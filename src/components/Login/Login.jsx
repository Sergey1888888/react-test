import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Login as log } from '../../redux/auth-reducer';
import { Input } from '../common/FormsControls/FormsControls';
import { required, maxLengthCreator } from '../../utils/validators/validators';

const maxLength50 = maxLengthCreator(50);

let LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder="Login" name="login"
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
        console.log(formData);
        props.log(formData.login, formData.password, formData.rememberMe);
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}

let mapStateToProps = (state) => {
    return {
        
    }
}

export default connect(mapStateToProps, { log })(Login);