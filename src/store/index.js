import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducer/index";

const initialState = {
    map:{},
    data_features: []
};

const middleware = [thunk];
const store = createStore(
 rootReducer,
 initialState,
 composeWithDevTools(
   applyMiddleware(...middleware)
 )
);

export default store;