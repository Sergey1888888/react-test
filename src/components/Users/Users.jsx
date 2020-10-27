import React from "react";
import s from "./Users.module.css";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

let Users = (props) => {
    return (
        <div className={s.flex}>
            <Paginator currentPage={props.currentPage}
                        onPageChanged={props.onPageChanged}
                        totalItemsCount={props.totalItemsCount}
                        pageSize={props.pageSize}
                        minPage={props.minPage}
                        maxPage={props.maxPage}/>
            {props.users.map((u) => (
                <User key={u.id} user={u} followingInProgress={props.followingInProgress} unfollow={props.unfollow} follow={props.follow} />
            ))}
        </div>
    );
};

export default Users;