import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { addPostActionCreator, updateNewPostTextActionCreator } from "../../../redux/profile-reducer";

const MyPosts = props => {
    let postsElements = props.posts.map(p => (
        <Post message={p.message} likesCount={p.likesCount} />
    ));

    let addPost = () => {
        props.dispatch(addPostActionCreator());
    };

    let onPostChange = (e) => {
        let text = e.target.value;
        props.dispatch(updateNewPostTextActionCreator(text));
    }

    return (
        <div className={s.posts_block}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} value={props.newPostText} />
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>{postsElements}</div>
        </div>
    );
};

export default MyPosts;
