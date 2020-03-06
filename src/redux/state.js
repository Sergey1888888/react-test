let store = {
	_state: {
		profilePage: {
			posts: [
				{ id: 1, message: "Hi, how are you?", likesCount: 13 },
				{ id: 2, message: "It's my first post!", likesCount: 15 }
			],
			newPostText: 'hello'
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
			newTextMessage: ''
		}
	},
	getState() {
		return this._state;
	},
	_callSubcriber() {
		console.log('State changed');
	},
	addPost() {
		let newPost = {
			id: 3,
			message: this._state.profilePage.newPostText,
			likesCount: 0
		}
		this._state.profilePage.posts.push(newPost);
		this._state.profilePage.newPostText = '';
		this._callSubcriber(this._state);
	},
	updateNewPostText(newText) {
		this._state.profilePage.newPostText = newText;
		this._callSubcriber(this._state);
	},
	addMessage() {
		let newId = this._state.dialogsPage.messages.length + 1;
		let newMessage = {
			id: newId,
			message: this._state.dialogsPage.newTextMessage
		}
		this._state.dialogsPage.messages.push(newMessage);
		this._state.dialogsPage.newTextMessage = '';
		this._callSubcriber(this._state);
	},
	updateNewMessageText(newMessageText) {
		this._state.dialogsPage.newTextMessage = newMessageText;
		this._callSubcriber(this._state);
	},
	subscirbe(observer) {
		this._callSubcriber = observer;
	}
}

window.store = store;
export default store;