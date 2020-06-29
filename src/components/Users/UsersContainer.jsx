import React from 'react'
import { connect } from 'react-redux';
import * as axios from 'axios';
import { followAC, unfollowAC, setUsersAC, setCurrentPageAC, setTotalUsersCountAC, setMinMaxPagesAC, setIsFetchingAC } from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        axios
        .get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
        .then((response) => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount)
        });
    }

    onPageChanged = (pageNumber, pagesCount) => {
        this.props.toggleIsFetching(true);
        this.props.setCurrentPage(pageNumber);
        if (pageNumber === this.props.maxPage && (this.props.maxPage != pagesCount)) {
            this.props.setMinMaxPages(this.props.minPage+1, this.props.maxPage+1);
        }
        else if (pageNumber === this.props.minPage && (this.props.minPage != 1)) {
            this.props.setMinMaxPages(this.props.minPage-1, this.props.maxPage-1);
        }
        axios
        .get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
        .then((response) => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(response.data.items);
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
                        unfollow={this.props.unfollow} />
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
        isFetching: state.usersPage.isFetching
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId));
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
        setCurrentPage: (currentPage) => {
            dispatch(setCurrentPageAC(currentPage));
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setTotalUsersCountAC(totalCount));
        },
        setMinMaxPages: (min, max) => {
            dispatch(setMinMaxPagesAC(min, max))
        },
        toggleIsFetching: (isFetching) => {
            dispatch(setIsFetchingAC(isFetching))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);