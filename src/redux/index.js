import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { marketListReducer } from "./marketSlice";
import { searchReducer } from "./searchSlice";

const rootReducer = combineReducers({
  marketList: marketListReducer,
  searchResult: searchReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());

store.subscribe(() => console.log(store.getState()));
