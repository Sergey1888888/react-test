import React from 'react';
import s from './Post.module.css'

const Post = (props) => {
    return (
      <div className={s.item}>
        <img src="https://i1.sndcdn.com/avatars-000477535869-mq50ss-t500x500.jpg"/>
        <div className={s.message}>
          {props.message} {props.likesCount} Likes
        </div>
      </div>
    )
}

export default Post;