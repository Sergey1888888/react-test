const { createSelector } = require("reselect");

const getUsers = state => {
    return state.usersPage.users;
}

const getPageSize = state => {
    return state.usersPage.pageSize;
}

const getTotalCount = state => {
    return state.usersPage.totalCount;
}

const getCurrentPage = state => {
    return state.usersPage.currentPage;
}

const getMinPage = state => {
    return state.usersPage.minPage;
}

const getMaxPage = state => {
    return state.usersPage.maxPage;
}

const getIsFetching = state => {
    return state.usersPage.isFetching;
}

const getFollowingInProgress = state => {
    return state.usersPage.followingInProgress;
}

export const getUsersSelector = createSelector(getUsers, (users) => {
    return users;
})

export const getPageSizeSelector = createSelector(getPageSize, (pageSize) => {
    return pageSize;
})

export const getTotalCountSelector = createSelector(getTotalCount, (totalCount) => {
    return totalCount;
})

export const getCurrentPageSelector = createSelector(getCurrentPage, (currentPage) => {
    return currentPage;
})

export const getMinPageSelector = createSelector(getMinPage, (minPage) => {
    return minPage;
})

export const getMaxPageSelector = createSelector(getMaxPage, (maxPage) => {
    return maxPage;
})

export const getIsFetchingSelector = createSelector(getIsFetching, (isFetching) => {
    return isFetching;
})

export const getFollowingInProgressSelector = createSelector(getFollowingInProgress, (followingInProgress) => {
    return followingInProgress;
})