import React from "react";
import s from "./ProfileInfo.module.css";
import defaultUserPhoto from "./../../../assets/images/user.gif";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />;
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
            </div>
            <div className={s.description_block}>
                <ProfileStatus updateStatus={props.updateStatus} status={props.status} />
                <div>Имя: {props.profile.fullName}</div>
                <div>Статус: {props.profile.aboutMe}</div>
                <div>
                    Контакты:{" "}
                    {Object.values(props.profile.contacts).map((value) => (
                        <div>{value}</div>
                    ))}
                </div>
                <div>Обо мне: {props.profile.aboutMe}</div>
            </div>
        </div>
    );
};

export default ProfileInfo;
