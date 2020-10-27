import React from "react";
import s from "./ProfileInfo.module.css";
import { useState, useEffect } from "react";

const ProfileStatusWithHooks = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        if (status !== props.status) {
            props.updateStatus(status);
        }
    };

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    };

    return (
        <div>
            {editMode ? (
                <div>
                    <input
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                deactivateEditMode();
                            }
                        }}
                        onChange={onStatusChange}
                        autoFocus={true}
                        onBlur={deactivateEditMode}
                        value={status}
                    />
                </div>
            ) : (
                <div>
                    <span onDoubleClick={activateEditMode}>
                        {props.status ? props.status : "Нет статуса"}
                    </span>
                </div>
            )}
        </div>
    );
};

export default ProfileStatusWithHooks;
