import React from 'react';
import Header from './Header';
import { connect } from 'react-redux'
import { Logout } from './../../redux/auth-reducer'

class HeaderContainer extends React.Component {
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

export default connect(mapStateToProps, { Logout })(HeaderContainer);