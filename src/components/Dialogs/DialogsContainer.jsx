import React from "react";
import { addMessageActionCreator, updateNewMessageTextActionCreator } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";

const DialogsContainer = props => {
    // let state = props.store.getState().dialogsPage;

    // let onNewMessageText = text => {
    //     props.store.dispatch(updateNewMessageTextActionCreator(text));
    // };

    // let onAddMessage = () => {
    //     props.store.dispatch(addMessageActionCreator());
    // };

    return (
        <StoreContext.Consumer>
            {store => {
                let state = store.getState().dialogsPage;

                let onNewMessageText = text => {
                    store.dispatch(updateNewMessageTextActionCreator(text));
                };

                let onAddMessage = () => {
                    store.dispatch(addMessageActionCreator());
                };
                return (
                    <Dialogs
                        dialogs={state.dialogs}
                        messages={state.messages}
                        newTextMessage={state.newTextMessage}
                        updateNewMessageText={onNewMessageText}
                        addMessage={onAddMessage}
                    />
                );
            }}
        </StoreContext.Consumer>
    );
};

export default DialogsContainer;
