export const FETCH_DEFIBRILLATORS = "FETCH_DEFIBRILLATORS";
export const INSERT_DEFIBRILLATOR = "INSERT_DEFIBRILLATOR";

const defibrillatorsReducer = (state = [], action) => {
  switch (action.type) {
    case INSERT_DEFIBRILLATOR:
      return [...state, action.payload];

    case FETCH_DEFIBRILLATORS:
      return action.payload;

    default:
      return state;
  }
};

export default defibrillatorsReducer;
