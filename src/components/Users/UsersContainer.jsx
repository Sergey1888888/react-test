import React from 'react'
import { connect } from 'react-redux';
import { follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, setMinMaxPages, setIsFetching, setIsFollowingProgress } from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { usersAPI } from '../../api/api';

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.setIsFetching(true);
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then((data) => {
            this.props.setIsFetching(false);
            this.props.setUsers(data.items);
            this.props.setTotalUsersCount(data.totalCount)
        });
    }

    onPageChanged = (pageNumber, pagesCount) => {
        this.props.setIsFetching(true);
        this.props.setCurrentPage(pageNumber);
        if (pageNumber === this.props.maxPage && (this.props.maxPage != pagesCount)) {
            this.props.setMinMaxPages(this.props.minPage+1, this.props.maxPage+1);
        }
        else if (pageNumber === this.props.minPage && (this.props.minPage != 1)) {
            this.props.setMinMaxPages(this.props.minPage-1, this.props.maxPage-1);
        }
        usersAPI.getUsers(pageNumber, this.props.pageSize).then((data) => {
            this.props.setIsFetching(false);
            this.props.setUsers(data.items);
        });
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
                        followingInProgress={this.props.followingInProgress}
                        setIsFollowingProgress={this.props.setIsFollowingProgress} />
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

export default connect(mapStateToProps, {follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, setMinMaxPages, setIsFetching, setIsFollowingProgress})(UsersContainer);