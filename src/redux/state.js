import { renderEntireTree } from "../render";

let state = {
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
};

export let addPost = () => {
	let newPost = {
		id: 3,
		message: state.profilePage.newPostText,
		likesCount: 0
	}
	state.profilePage.posts.push(newPost);
	state.profilePage.newPostText = '';
	renderEntireTree(state);
}

export let updateNewPostText = (newText) => {
	state.profilePage.newPostText = newText;
	renderEntireTree(state);
}

export let addMessage = () => {
	let newId = state.dialogsPage.messages.length + 1;
	let newMessage = {
		id: newId,
		message: state.dialogsPage.newTextMessage
	}
	state.dialogsPage.messages.push(newMessage);
	state.dialogsPage.newTextMessage = '';
	renderEntireTree(state);
}

export let updateNewMessageText = (newMessageText) => {
	state.dialogsPage.newTextMessage = newMessageText;
	renderEntireTree(state);
}
window.state = state;
export default state;
