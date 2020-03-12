const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: "Hi, how are you?", likesCount: 13 },
                { id: 2, message: "It's my first post!", likesCount: 15 }
            ],
            newPostText: "hello"
        },
        dialogsPage: {
            messages: [
                { id: 1, message: "Hi" },
                { id: 2, message: "How are you?" },
                { id: 3, message: "Yo" },
                { id: 4, message: "Y2" },
                { id: 5, message: "Yo" }
            ],
            dialogs: [
                { id: 1, name: "User1" },
                { id: 2, name: "User2" },
                { id: 3, name: "User3" },
                { id: 4, name: "User4" },
                { id: 5, name: "User5" },
                { id: 6, name: "User6" }
            ],
            newTextMessage: ""
        }
    },
    _callSubcriber() {
        console.log("State changed");
    },

    getState() {
        return this._state;
    },
    subscirbe(observer) {
        this._callSubcriber = observer;
    },

    dispatch(action) {
        if (action.type === ADD_POST) {
            let newId = this._state.profilePage.posts.length + 1;
            let newPost = {
                id: newId,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = "";
            this._callSubcriber(this._state);
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText;
            this._callSubcriber(this._state);
        } else if (action.type === ADD_MESSAGE) {
            let newId = this._state.dialogsPage.messages.length + 1;
            let newMessage = {
                id: newId,
                message: this._state.dialogsPage.newTextMessage
            };
            this._state.dialogsPage.messages.push(newMessage);
            this._state.dialogsPage.newTextMessage = "";
            this._callSubcriber(this._state);
        } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
            this._state.dialogsPage.newTextMessage = action.newMessageText;
            this._callSubcriber(this._state);
        }
    }
};

export const addPostActionCreator = () => ({ type: ADD_POST });

export const updateNewPostTextActionCreator = text => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text
});

export const addMessageActionCreator = () => ({ type: ADD_MESSAGE });

export const updateNewMessageTextActionCreator = text => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newMessageText: text
});

window.store = store;
export default store;
