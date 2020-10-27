import React from "react";
import s from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileData = ({
    profile,
    updateStatus,
    status,
    isOwner,
    onEditMode,
}) => {
    return (
        <div className={s.description_block}>
            <ProfileStatusWithHooks
                updateStatus={updateStatus}
                status={status}
            />
            {isOwner && <button onClick={onEditMode}>Редактировать</button>}
            <div className={s.description}>
                <b>Имя:</b> {profile.fullName}
            </div>
            <div className={s.description}>
                <b>Обо мне:</b> {profile.aboutMe}
            </div>
            <div className={s.description}>
                <b>Ищу работу:</b> {profile.lookingForAJob ? "Да" : "Нет"}
            </div>
            {profile.lookingForAJob && (
                <div className={s.description}>
                    <b>Описание:</b> {profile.lookingForAJobDescription}
                </div>
            )}
            <div className={s.description}>
                <b>Контакты:</b>
                {Object.entries(profile.contacts).map((array) =>
                    array[1] ? (
                        <div key={array[0]} className={s.description}>
                            <b style={{ marginLeft: "5rem" }}>{array[0]}:</b>{" "}
                            {array[1]}
                        </div>
                    ) : null
                )}
            </div>
        </div>
    );
};

export default ProfileData;