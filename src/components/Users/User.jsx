import React from "react";
import s from "./Users.module.css";
import defaultUserPhoto from "./../../assets/images/user.gif";
import { NavLink } from "react-router-dom";

let User = (props) => {
    return (
        <div className={s.flex_wrapper}>
            <div className={s.flex_avatarbtn}>
                <div>
                    <NavLink to={"/profile/" + props.user.id}>
                        <img
                            src={
                                props.user.photos.small != null
                                    ? props.user.photos.small
                                    : defaultUserPhoto
                            }
                            className={s.userPhoto}
                        />
                    </NavLink>
                </div>
                <div>
                    {props.user.followed ? (
                        <button
                            className="btn"
                            disabled={props.followingInProgress.some(
                                (id) => id === props.user.id
                            )}
                            onClick={() => {
                                props.unfollow(props.user.id);
                            }}
                        >
                            Unfollow
                        </button>
                    ) : (
                        <button
                            className="btn"
                            disabled={props.followingInProgress.some(
                                (id) => id === props.user.id
                            )}
                            onClick={() => {
                                props.follow(props.user.id);
                            }}
                        >
                            Follow
                        </button>
                    )}
                </div>
            </div>
            <div className={s.flex_info}>
                <div className={s.flex_left_info}>
                    <div>{props.user.name}</div>
                    <div>{props.user.status}</div>
                </div>
                <div className={s.flex_right_info}>
                    <div>{"user.location.country"}</div>
                    <div>{"user.location.city"}</div>
                </div>
            </div>
        </div>
    );
};

export default User;