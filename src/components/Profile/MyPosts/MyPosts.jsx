import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { reduxForm, Field } from "redux-form";
import { required, maxLengthCreator } from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10);

const NewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name="newPostText" component={Textarea} placeholder="Enter your post"
                    validate={[ required, maxLength10 ]} />
            <button className="btn">Add post</button>
        </form>
    )
}

const NewPostReduxForm = reduxForm({form: 'myPostsNewPostForm'})(NewPostForm);

const MyPosts = props => {
    let postsElements = props.profilePage.posts.map(p => (
        <Post message={p.message} likesCount={p.likesCount} />
    ));

    let onSubmit = (formData) => {
        props.addPost(formData.newPostText);
    }

    return (
        <div className={s.posts_block}>
            <h3>My posts</h3>
            <div>
                <div className={s.flex_message_btn}>
                    <NewPostReduxForm onSubmit={ onSubmit }/>
                </div>
            </div>
            <div className={s.posts}>{postsElements}</div>
        </div>
    );
};

export default MyPosts;
