import React from "react";
import { addPostActionCreator, updateNewPostTextActionCreator } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext";

const MyPostsContainer = props => {
    // let state = props.store.getState().profilePage;

    // let addPost = () => {
    //     props.store.dispatch(addPostActionCreator());
    // };

    // let onPostChange = text => {
    //     props.store.dispatch(updateNewPostTextActionCreator(text));
    // };

    return (
        <StoreContext.Consumer>
            {store => {
                let state = store.getState().profilePage;

                let addPost = () => {
                    store.dispatch(addPostActionCreator());
                };

                let onPostChange = text => {
                    store.dispatch(updateNewPostTextActionCreator(text));
                };

                return (
                    <MyPosts
                        updateNewPostText={onPostChange}
                        addPost={addPost}
                        posts={state.posts}
                        newPostText={state.newPostText}
                    />
                );
            }}
        </StoreContext.Consumer>
    );
};

export default MyPostsContainer;
