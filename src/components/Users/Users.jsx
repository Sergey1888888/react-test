import React from "react";
import s from "./Users.module.css";
import defaultUserPhoto from "./../../assets/images/user.gif";
import { NavLink } from "react-router-dom";

let Users = (props) => {
    let pagesCount = Math.ceil(props.totalCount / props.pageSize);
    let pages = [];
    for (let i = props.minPage; i <= props.maxPage; i++) {
        pages.push(i);
    }

    return (
        <div className={s.flex}>
            <div className={s.flex_pages}>
                {pages.map((p) => {
                    return (
                        <span
                            onClick={() => {
                                props.onPageChanged(p, pagesCount);
                            }}
                            className={
                                props.currentPage === p
                                    ? s.activePage
                                    : s.pages
                            }
                        >
                            {p}
                        </span>
                    );
                })}
            </div>
            {props.users.map((u) => (
                <div key={u.key} className={s.flex_wrapper}>
                    <div className={s.flex_avatarbtn}>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img
                                    src={
                                        u.photos.small != null
                                            ? u.photos.small
                                            : defaultUserPhoto
                                    }
                                    className={s.userPhoto}
                                />
                            </NavLink>
                        </div>
                        <div>
                            {u.followed ? (
                                <button
                                    className="btn"
                                    disabled={props.followingInProgress.some(id => id === u.id)}
                                    onClick={() => { props.unfollow(u.id) }}
                                >
                                    Unfollow
                                </button>
                            ) : (
                                <button
                                    className="btn"
                                    disabled={props.followingInProgress.some(id => id === u.id)}
                                    onClick={() => { props.follow(u.id) }}
                                >
                                    Follow
                                </button>
                            )}
                        </div>
                    </div>
                    <div className={s.flex_info}>
                        <div className={s.flex_left_info}>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </div>
                        <div className={s.flex_right_info}>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Users;