import React from "react";
import s from "./Users.module.css";
import * as axios from "axios";
import defaultUserPhoto from "./../../assets/images/user.png";

class Users extends React.Component {
    componentDidMount() {
        axios
        .get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
        .then((response) => {
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount)
        });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios
        .get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
        .then((response) => {
            this.props.setUsers(response.data.items);
        });
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalCount / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }

        return (
                <div className={s.flex}>
                    <div className={s.flex_pages}>
                        {pages.map( p => {
                            return <span onClick={() => {this.onPageChanged(p)}} className={this.props.currentPage === p ? s.activePage : s.pages}>{p}</span>
                        })}
                    </div>
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
