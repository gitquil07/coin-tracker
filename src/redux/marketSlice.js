const MARKET_LIST_ON_LOAD = "MARKET_LIST_ON_LOAD";
const MARKET_LIST_ON_ERROR = "MARKET_LIST_ON_ERROR";
const MARKET_LIST_ON_SUCCESS = "MARKET_LIST_ON_SUCCESS";

export const marketListOnLoad = () => {
  return {
    type: MARKET_LIST_ON_LOAD,
    payload: { loading: true, data: null, error: null },
  };
};

export const marketListOnError = (error) => {
  return {
    type: MARKET_LIST_ON_ERROR,
    payload: { loading: false, error, data: null },
  };
};

export const marketListOnSuccess = (data) => {
  return {
    type: MARKET_LIST_ON_SUCCESS,
    payload: { loading: false, data, error: null },
  };
};

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const marketListReducer = (state = initialState, action) => {
  switch (action.type) {
    case MARKET_LIST_ON_LOAD:
    case MARKET_LIST_ON_SUCCESS:
    case MARKET_LIST_ON_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
