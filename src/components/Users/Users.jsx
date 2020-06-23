import React from "react";
import s from "./Users.module.css";

let Users = (props) => {
    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                photoUrl: "https://i.redd.it/tyhrngisvqv31.png",
                followed: false,
                fullName: "Sergey",
                status: "Я бог",
                location: { city: "Moscow", country: "Russia" },
            },
            {
                id: 2,
                photoUrl:
                    "https://i.ytimg.com/vi/gRm57CMI28Y/hqdefault_live.jpg",
                followed: true,
                fullName: "Dmitry",
                status: "Я бог",
                location: { city: "Volgograd", country: "Russia" },
            },
            {
                id: 3,
                photoUrl: "https://cdn.frankerfacez.com/emoticon/390750/4",
                followed: false,
                fullName: "Vitya",
                status: "Я бог",
                location: { city: "Harkiv", country: "Ukraine" },
            },
            {
                id: 4,
                photoUrl: "https://i.redd.it/qm3ksi2yajq41.png",
                followed: false,
                fullName: "Maks",
                status: "Я бог",
                location: { city: "Minsk", country: "Belarus" },
            },
        ]);
    }

    return (
        <div className={s.flex}>
            {props.users.map((u) => (
                <div key={u.key} className={s.flex_wrapper}>
                    <div className={s.flex_avatarbtn}>
                        <div>
                            <img src={u.photoUrl} className={s.userPhoto} />
                        </div>
                        <div>
                            {u.followed ? (
                                <button
                                    className={s.btn}
                                    onClick={() => {
                                        props.unfollow(u.id);
                                    }}
                                >
                                    Unfollow
                                </button>
                            ) : (
                                <button
                                    className={s.btn}
                                    onClick={() => {
                                        props.follow(u.id);
                                    }}
                                >
                                    Follow
                                </button>
                            )}
                        </div>
                    </div>
                    <div className={s.flex_info}>
                        <div className={s.flex_left_info}>
                            <div>{u.fullName}</div>
                            <div>{u.status}</div>
                        </div>
                        <div className={s.flex_right_info}>
                            <div>{u.location.country}</div>
                            <div>{u.location.city}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Users;
