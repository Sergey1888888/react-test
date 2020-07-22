const ADD_MESSAGE = "ADD-MESSAGE";

let initialState = {
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
    ]
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let stateCopy = {...state};
            stateCopy.messages = [...state.messages];
            let newId = stateCopy.messages.length + 1;
            let newMessage = {
                id: newId,
                message: action.newMessage
            };
            stateCopy.messages.push(newMessage);
            return stateCopy;
        }
        default:
            return state;
    }
}

export const addMessage = (newMessage) => ({ type: ADD_MESSAGE, newMessage });

export default dialogsReducer;