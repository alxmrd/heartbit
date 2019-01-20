export const SELECT_PLACE = "SELECT_PLACE";
export const CLEAR_SELECT_PLACE = "CLEAR_SELECT_PLACE";

const selectedPlaceReducer = (state = [], action) => {
  switch (action.type) {
    case SELECT_PLACE:
      return action.payload;
    case CLEAR_SELECT_PLACE:
      return [];

    default:
      return state;
  }
};

export default selectedPlaceReducer;
