export const SELECT_PLACE = "SELECT_PLACE";

const selectedPlaceReducer = (state = [], action) => {
  switch (action.type) {
    case SELECT_PLACE:
      return action.payload;

    default:
      return state;
  }
};

export default selectedPlaceReducer;
