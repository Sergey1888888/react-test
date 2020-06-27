import React from "react";
import s from "./Users.module.css";
import * as axios from "axios";
import defaultUserPhoto from "./../../assets/images/user.png";

class Users extends React.Component {
    componentDidMount() {
        axios
        .get("https://social-network.samuraijs.com/api/1.0/users")
        .then((response) => {
            this.props.setUsers(response.data.items);
        });
    }

    render() {
        return (
                <div className={s.flex}>
                {this.props.users.map((u) => (
                    <div key={u.key} className={s.flex_wrapper}>
                        <div className={s.flex_avatarbtn}>
                            <div>
                                <img
                                    src={
                                        u.photos.small != null
                                            ? u.photos.small
                                            : defaultUserPhoto
                                    }
                                    className={s.userPhoto}
                                />
                            </div>
                            <div>
                                {u.followed ? (
                                    <button
                                        className={s.btn}
                                        onClick={() => {
                                            this.props.unfollow(u.id);
                                        }}
                                    >
                                        Unfollow
                                    </button>
                                ) : (
                                    <button
                                        className={s.btn}
                                        onClick={() => {
                                            this.props.follow(u.id);
                                        }}
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
        )
    }
}

export default Users;
