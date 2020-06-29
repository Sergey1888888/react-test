import React from "react";
import { addPost, updateNewPostText } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

// const MyPostsContainer = props => {
//     // let state = props.store.getState().profilePage;

//     // let addPost = () => {
//     //     props.store.dispatch(addPostActionCreator());
//     // };

//     // let onPostChange = text => {
//     //     props.store.dispatch(updateNewPostTextActionCreator(text));
//     // };

//     return (
//         <StoreContext.Consumer>
//             {store => {
//                 let state = store.getState().profilePage;

//                 let addPost = () => {
//                     store.dispatch(addPostActionCreator());
//                 };

//                 let onPostChange = text => {
//                     store.dispatch(updateNewPostTextActionCreator(text));
//                 };

//                 return (
//                     <MyPosts
//                         updateNewPostText={onPostChange}
//                         addPost={addPost}
//                         profilePage={state.profilePage}
//                     />
//                 );
//             }}
//         </StoreContext.Consumer>
//     );
// };

const mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateNewPostText: (text) => {
//             dispatch(updateNewPostTextActionCreator(text));
//         },
//         addPost: () => {
//             dispatch(addPostActionCreator());
//         }
//     }
// }

const MyPostsContainer = connect(mapStateToProps, {updateNewPostText, addPost})(MyPosts);

export default MyPostsContainer;