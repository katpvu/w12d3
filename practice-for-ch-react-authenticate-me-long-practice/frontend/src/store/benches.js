import csrfFetch from "./csrf"

// Constants
export const SET_BENCHES = 'benches/setBenches'
export const ADD_BENCH = 'benches/addBench'

// POJO Action Creator
export const setBenches = benches => ({
    type: SET_BENCHES,
    payload: benches
})

export const addBench = bench => ({
    type: ADD_BENCH,
    payload: bench
})


//THUNK Action Creator

// fetch all benches from database, parse data to send to redux state
export const fetchBenches = () => async (dispatch) => {
    let res = await csrfFetch('/api/benches')
    let data = await res.json()
    // console.log(data)
    return dispatch(setBenches(data))
}

// fetch 1 bench from database, parse data
export const fetchBench = (benchId) => async (dispatch) => {
    let res = await csrfFetch(`/api/benches/${benchId}`);
    let data = await res.json();
    // console.log(data)
    return dispatch(addBench(data))
}

// send a post request to backend, persist to db, parse data if successful
export const createBench = (benchData) => async (dispatch) => {
    let res = await csrfFetch('/api/benches', {
        method: 'POST',
        body: JSON.stringify(benchData)
    });
    let data = await res.json();
    // console.log(data)
    return dispatch(addBench(data))
}

// Selectors
export const getBench = (benchId) => (state) => (
    state.benches[benchId] ? state.benches[benchId] : null
);


// Reducer
const BenchesReducer = (state = {}, action) => {
    let newState = { ...state }
    switch (action.type) {
        case SET_BENCHES:
            return { ...action.payload };
        case ADD_BENCH:
            return newState[action.payload.id] = action.payload
        default:
            return state;
    }
}

export default BenchesReducer;