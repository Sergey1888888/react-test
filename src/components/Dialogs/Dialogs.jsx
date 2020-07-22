import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { reduxForm, Field } from "redux-form";
import { Textarea } from "../common/FormsControls/FormsControls";
import { required, maxLengthCreator } from "../../utils/validators/validators";

const maxLength50 = maxLengthCreator(50);

const MessageForm = (props) => {
    return (
        <form onSubmit={ props.handleSubmit }>
            <Field name="newMessage" component={Textarea} placeholder="Enter your message" validate={[ required, maxLength50 ]} />
            <button className="btn">
                Send Message
            </button>
        </form>
    )
}

const MessageFormRedux = reduxForm({form: 'dialogMessageForm'})(MessageForm);

const Dialogs = props => {
    let dialogElements = props.dialogsPage.dialogs.map(d => (
        <DialogItem name={d.name} id={d.id} />
    ));

    let messageElements = props.dialogsPage.messages.map(m => (
        <Message message={m.message} />
    ));

    let onSubmit = (formData) => {
        props.addMessage(formData.newMessage);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_items}>{dialogElements}</div>
            <div className={s.messages}>
                {messageElements}
                <div className={s.textMessage}>
                    <div className={s.textMessageFlex}>
                        <MessageFormRedux onSubmit={onSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;
