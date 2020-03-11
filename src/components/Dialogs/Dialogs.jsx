import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { addMessageActionCreator, updateNewMessageTextActionCreator } from "../../redux/state";

const Dialogs = props => {
    let dialogElements = props.dialogsPage.dialogs.map(d => (
        <DialogItem name={d.name} id={d.id} />
    ));

    let messageElements = props.dialogsPage.messages.map(m => (
        <Message message={m.message} />
    ));

    let newMessageElement = React.createRef();

    let newMessageText = () => {
        let text = newMessageElement.current.value;
        props.dispatch(updateNewMessageTextActionCreator(text));
    }

    let addMessage = () => {
        props.dispatch(addMessageActionCreator());
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_items}>{dialogElements}</div>
            <div className={s.messages}>
                {messageElements}
                <div className={s.textMessage}>
                    <div className={s.textMessageFlex}>
                        <textarea ref={newMessageElement} onChange={newMessageText} value={props.dialogsPage.newTextMessage} />
                        <button onClick={addMessage} className={s.btnSendMessage}>
                            Send Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;
