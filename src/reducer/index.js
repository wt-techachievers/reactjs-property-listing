import { INITIALIZE_MAP, SET_DATA_FEATURES, SET_FILTERED_FEATURES } from "../constant/mapAction";

const initialState = {
    map: {},
    data_features: [],
    filtered_features: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
      case INITIALIZE_MAP: return{
          ...state,
          map: action.payload.map
      }
      case SET_DATA_FEATURES: return{
        ...state,
        data_features: action.payload.data_features
      }
      case SET_FILTERED_FEATURES: return{
        ...state,
        filtered_features: action.payload.filtered_features
      }
      default: return state;
  }
};
export default rootReducer;