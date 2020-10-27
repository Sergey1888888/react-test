import React from "react";
import { reduxForm } from "redux-form";
import { required } from "../../../utils/validators/validators";
import {
    createField,
    Input,
    Textarea,
} from "../../common/FormsControls/FormsControls";
import s from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import style from "../../common/FormsControls/FormsControls.module.css";

const ProfileDataForm = ({
    profile,
    updateStatus,
    status,
    handleSubmit,
    error
}) => {
    return (
        <form
            onSubmit={handleSubmit}
            className={s.description_block}
        >
            <ProfileStatusWithHooks
                updateStatus={updateStatus}
                status={status}
            />
            <button>Сохранить</button>
            {error && <div className={style.formSummaryError}>
            {error}
            </div> }
            <div className={s.description}>
                <b>Имя:</b>{" "}
                {createField("Полное имя", "fullName", [required], Input)}
            </div>
            <div className={s.description}>
                <b>Обо мне:</b>{" "}
                {createField("Описание личности", "aboutMe", [required], Input)}
            </div>
            <div className={s.description}>
                <b>Ищу работу:</b>{" "}
                {createField("", "lookingForAJob", [], Input, {
                    type: "checkbox"
                })}
            </div>
            <div className={s.description}>
                <b>Описание:</b>{" "}
                {createField(
                    "Описание как работника",
                    "lookingForAJobDescription",
                    [required],
                    Textarea,
                )}
            </div>
            <div className={s.description}>
                <b>Контакты:</b>
                {Object.entries(profile.contacts).map((array) => (
                    <div key={array[0]} className={s.description}>
                        <b style={{ marginLeft: "5rem" }}>{array[0]}:</b>{" "}
                        {createField(array[0], "contacts." + array[0], [], Input)}
                    </div>
                ))}
            </div>
        </form>
    );
};

const ProfileDataFormReduxForm = reduxForm({ form: "editProfile" })(
    ProfileDataForm
);

export default ProfileDataFormReduxForm;
