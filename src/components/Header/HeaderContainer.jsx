import React from 'react';
import Header from './Header';
import * as axios from 'axios';
import { connect } from 'react-redux'
import { setAuthUserData, setIsFetching } from './../../redux/auth-reducer'

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.setIsFetching(true);
        axios
        .get('https://social-network.samuraijs.com/api/1.0/auth/me', {
            withCredentials: true
        })
        .then((response) => {
            this.props.setIsFetching(false);
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data;
                this.props.setAuthUserData(id, email, login);
            }
        });
    }

    render() {
        return <Header {...this.props} />
    }
}

let mapStateToProps = (state) => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth,
        isFetching: state.auth.isFetching
    }
}

export default connect(mapStateToProps, {setAuthUserData, setIsFetching})(HeaderContainer);