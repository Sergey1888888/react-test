import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Login as log } from '../../redux/auth-reducer';
import { Input, createField } from '../common/FormsControls/FormsControls';
import { required, maxLengthCreator } from '../../utils/validators/validators';
import { Redirect } from 'react-router-dom';
import s from '../common/FormsControls/FormsControls.module.css';

const maxLength50 = maxLengthCreator(50);

let LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        {createField("Email", "email", [required], Input)}
        {createField("Password", "password", [required, maxLength50], Input, {type: "password"})}
        {createField(null, "rememberMe", [], Input, {type: "checkbox"}, "Remember me")}
        {props.captchaUrl && <div><img src={props.captchaUrl}/>{createField("Enter captcha", "captcha", [required], Input)}</div>}
        { props.error && <div className={s.formSummaryError}>
            {props.error}
        </div> }
        <div>
            <button>Login</button>
        </div>
    </form>
}

let LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

let Login = (props) => {
    let onSubmit = (formData) => {
        props.log(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

export default connect(mapStateToProps, { log })(Login);