const SEARCH_ON_LOAD = "SEARCH_ON_LOAD";
const SEARCH_ON_SUCCESS = "SEARCH_ON_SUCCESS";
const SEARCH_ON_ERROR = "SEARCH_ON_ERROR";
const SEARCH_CLEARED = "SEARCH_CLEARED";

export const searchOnLoad = () => {
  return {
    type: SEARCH_ON_LOAD,
    payload: { loading: true, data: null, error: null },
  };
};

export const searchOnSuccess = (data) => {
  return {
    type: SEARCH_ON_SUCCESS,
    payload: { loading: false, data, error: null },
  };
};

export const searchOnError = (error) => {
  return {
    type: SEARCH_ON_ERROR,
    payload: { loading: false, data: null, error },
  };
};

export const searchCleared = () => {
  return {
    type: SEARCH_CLEARED,
    payload: { loading: false, data: null, error: null },
  };
};

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_ON_LOAD:
    case SEARCH_ON_SUCCESS:
    case SEARCH_ON_ERROR:
    case SEARCH_CLEARED:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
