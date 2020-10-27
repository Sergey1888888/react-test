import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
    getProfile,
    getStatus,
    updateStatus,
    updatePhoto,
    setProfileData
} from "../../redux/profile-reducer";
import { withRouter, Redirect } from "react-router-dom";
import { compose } from "redux";

class ProfileContainer extends React.Component {
    refreshProfile() {
        this.props.getProfile(
            this.props.match.params.userId
                ? this.props.match.params.userId
                : this.props.userId
        );
        this.props.getStatus(
            this.props.match.params.userId
                ? this.props.match.params.userId
                : this.props.userId
        );
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render = () => {
        if (!this.props.isAuth && !this.props.match.params.userId) {
            return <Redirect to="/login" />;
        }
        //this.props.getProfile(this.props.match.params.userId);
        return (
            <Profile
                {...this.props}
                isOwner={!this.props.match.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                updatePhoto={this.props.updatePhoto}
                setProfileData={this.props.setProfileData}
            />
        );
    };
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        userId: state.auth.userId,
        isAuth: state.auth.isAuth,
    };
};

export default compose(
    connect(mapStateToProps, {
        getProfile,
        getStatus,
        updateStatus,
        updatePhoto,
        setProfileData
    }),
    withRouter
)(ProfileContainer);
