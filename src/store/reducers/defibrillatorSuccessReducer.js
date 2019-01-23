export const UPDATE_DEFIBRILLATOR = "UPDATE_DEFIBRILLATOR";
export const CLEAN_DEFIBRILLATOR_DATA = "CLEAN_DEFIBRILLATOR_DATA";

const defibrillatorSuccessReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DEFIBRILLATOR:
      return action.payload;

    case CLEAN_DEFIBRILLATOR_DATA:
      return {};
    default:
      return state;
  }
};

export default defibrillatorSuccessReducer;
