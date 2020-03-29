import React from "react";
import { addMessageActionCreator, updateNewMessageTextActionCreator } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = props => {
    let state = props.store.getState().dialogsPage;

    let onNewMessageText = text => {
        props.store.dispatch(updateNewMessageTextActionCreator(text));
    };

    let onAddMessage = () => {
        props.store.dispatch(addMessageActionCreator());
    };

    return <Dialogs dialogs={state.dialogs} messages={state.messages} newTextMessage={state.newTextMessage} updateNewMessageText={onNewMessageText} addMessage={onAddMessage} />;
};

export default DialogsContainer;
