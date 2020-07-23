import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getProfile, getStatus, updateStatus } from "../../redux/profile-reducer";
import { withRouter, Redirect } from "react-router-dom";
import { compose } from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        this.props.getProfile(this.props.match.params.userId ? this.props.match.params.userId : this.props.userId);
        this.props.getStatus(this.props.match.params.userId ? this.props.match.params.userId : this.props.userId);
    }

    render = () => {
        if (!this.props.isAuth && !this.props.match.params.userId) {
            return <Redirect to="/login"/>
        }
        //this.props.getProfile(this.props.match.params.userId);
        return <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        userId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}

export default compose(connect(mapStateToProps, { getProfile, getStatus, updateStatus }), withRouter)(ProfileContainer);
