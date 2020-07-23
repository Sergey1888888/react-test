import React from 'react'
import { connect } from 'react-redux';
import { follow, unfollow, setCurrentPage, setMinMaxPages, setIsFollowingProgress, getUsers } from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber, pagesCount) => {
        this.props.getUsers(pageNumber, this.props.pageSize, this.props.minPage, this.props.maxPage, pagesCount);
    }

    render() {
        return <>
                { this.props.isFetching ? <Preloader /> : null }
                <Users totalCount={this.props.totalCount}
                        pageSize={this.props.pageSize}
                        minPage={this.props.minPage}
                        maxPage={this.props.maxPage}
                        currentPage={this.props.currentPage}
                        users={this.props.users}
                        onPageChanged={this.onPageChanged}
                        follow={this.props.follow}
                        unfollow={this.props.unfollow}
                        followingInProgress={this.props.followingInProgress} />
                </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalCount: state.usersPage.totalCount,
        currentPage: state.usersPage.currentPage,
        minPage: state.usersPage.minPage,
        maxPage: state.usersPage.maxPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId));
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId));
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users));
//         },
//         setCurrentPage: (currentPage) => {
//             dispatch(setCurrentPageAC(currentPage));
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setTotalUsersCountAC(totalCount));
//         },
//         setMinMaxPages: (min, max) => {
//             dispatch(setMinMaxPagesAC(min, max))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(setIsFetchingAC(isFetching))
//         }
//     }
// }

export default compose(connect(mapStateToProps, {follow, unfollow, setCurrentPage, setMinMaxPages, setIsFollowingProgress, getUsers}))(UsersContainer);