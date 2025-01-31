import React from "react";
import { addMessage } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

// const DialogsContainer = props => {
//     // let state = props.store.getState().dialogsPage;

//     // let onNewMessageText = text => {
//     //     props.store.dispatch(updateNewMessageTextActionCreator(text));
//     // };

//     // let onAddMessage = () => {
//     //     props.store.dispatch(addMessageActionCreator());
//     // };

//     return (
//         <StoreContext.Consumer>
//             {store => {
//                 let state = store.getState().dialogsPage;

//                 let onNewMessageText = text => {
//                     store.dispatch(updateNewMessageTextActionCreator(text));
//                 };

//                 let onAddMessage = () => {
//                     store.dispatch(addMessageActionCreator());
//                 };
//                 return (
//                     <Dialogs
//                         dialogsPage={state.dialogsPage}
//                         updateNewMessageText={onNewMessageText}
//                         addMessage={onAddMessage}
//                     />
//                 );
//             }}
//         </StoreContext.Consumer>
//     );
// };

const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateNewMessageText: (text) => {
//             dispatch(updateNewMessageTextActionCreator(text));
//         },
//         addMessage: () => {
//             dispatch(addMessageActionCreator());
//         }
//     }
// }
// let AuthRedirectComponent = withAuthRedirect(Dialogs);
// const DialogsContainer = connect(mapStateToProps, { addMessage, updateNewMessageText })(AuthRedirectComponent)

export default compose(connect(mapStateToProps, { addMessage }), withAuthRedirect)(Dialogs);