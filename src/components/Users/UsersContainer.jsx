import React from 'react'
import { connect } from 'react-redux';
import { follow, unfollow, setCurrentPage, setIsFollowingProgress, getUsers } from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getUsersSelector, getPageSizeSelector, getTotalItemsCountSelector, getCurrentPageSelector, getMinPageSelector, getMaxPageSelector, getIsFetchingSelector, getFollowingInProgressSelector } from '../../redux/users-selectors';

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
                <Users totalItemsCount={this.props.totalItemsCount}
                        pageSize={this.props.pageSize}
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
        users: getUsersSelector(state),
        pageSize: getPageSizeSelector(state),
        totalItemsCount: getTotalItemsCountSelector(state),
        currentPage: getCurrentPageSelector(state),
        minPage: getMinPageSelector(state),
        maxPage: getMaxPageSelector(state),
        isFetching: getIsFetchingSelector(state),
        followingInProgress: getFollowingInProgressSelector(state)
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

export default compose(connect(mapStateToProps, {follow, unfollow, setCurrentPage, setIsFollowingProgress, getUsers}))(UsersContainer);