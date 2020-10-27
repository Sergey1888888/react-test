import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo
                status={props.status}
                updateStatus={props.updateStatus}
                profile={props.profile}
                updatePhoto={props.updatePhoto}
                isOwner={props.isOwner}
                setProfileData={props.setProfileData}
            />
            <MyPostsContainer />
        </div>
    );
};

export default Profile;
