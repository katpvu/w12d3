
// CONSTANTS
export const SET_REVIEWS = 'reviews/setReviews'
export const ADD_REVIEW = 'reviews/addReview'
export const REMOVE_REVIEW = 'reviews/removeReview'

// ACTION CREATORS
export const setReviews = reviews => ({
    type: SET_REVIEWS,
    payload: reviews
})
export const addReview = review => ({
    type: ADD_REVIEW,
    payload: review
})

export const removeReview = reviewId => ({
    type: REMOVE_REVIEW,
    payload: reviewId
})

// THUNK ACTION CREATORS
export const fetchReviews = reviews => async (dispatch) => {
    let res = await fetch('/api/reviews');
    let data = await res.json();
    dispatch(setReviews(data))
}

export const createReview = review => async (dispatch) => {
    let res = await fetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(review)
    });
    let data = await res.json();
    dispatch(addReview(data));
}
// SELECTORS
export const getReviews = () => (state) => (
    state.reviews ? Object.values(state.reviews) : []
)
export const getReview = (reviewId) => (state) => (
    state.reviews ? state.reviews[reviewId] : null
)

// REDUCER
const reviewsReducer = (state={}, action) => {
    switch (action.type) {
        case SET_REVIEWS:
            return { ...action.payload }
        case ADD_REVIEW:
            return newState[action.payload.id] = action.payload
        case REMOVE_REVIEW:
            delete newState[action.payload.reviewId]
        default:
            return state;
    }
}

export default reviewsReducer;