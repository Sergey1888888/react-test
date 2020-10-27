import React, { useState } from "react";
import defaultUserPhoto from "./../../../assets/images/user.gif";
import Preloader from "../../common/Preloader/Preloader";
import ProfileData from "./ProfileData";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = (props) => {
    const [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader />;
    }

    const onPhotoChange = (e) => {
        if (e.target.files.length) {
            props.updatePhoto(e.target.files[0]);
        }
    };

    const onEditMode = () => {
        setEditMode(!editMode);
    };

    const onSubmit = (data) => {
        props.setProfileData(data).then(res => {
            if (res) {
                onEditMode();
            }
        });
    }

    return (
        <div>
            <div>
                <img
                    src={
                        props.profile.photos.large
                            ? props.profile.photos.large
                            : defaultUserPhoto
                    }
                ></img>
                {props.isOwner && (
                    <span>
                        Изменить фото:{" "}
                        <input
                            type="file"
                            id="photo"
                            onChange={onPhotoChange}
                        />
                    </span>
                )}
            </div>
            {editMode ? (
                <ProfileDataForm
                    initialValues={props.profile}
                    profile={props.profile}
                    updateStatus={props.updateStatus}
                    status={props.status}
                    onSubmit={onSubmit}
                />
            ) : (
                <ProfileData
                    profile={props.profile}
                    updateStatus={props.updateStatus}
                    status={props.status}
                    isOwner={props.isOwner}
                    onEditMode={onEditMode}
                />
            )}
        </div>
    );
};

export default ProfileInfo;
