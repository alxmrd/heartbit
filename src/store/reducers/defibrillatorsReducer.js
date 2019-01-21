export const FETCH_DEFIBRILLATORS = "FETCH_DEFIBRILLATORS";
export const INSERT_DEFIBRILLATOR = "INSERT_DEFIBRILLATOR";
export const CHANGE_DEFIBRILLATOR_FLAG = "CHANGE_DEFIBRILLATOR_FLAG";

const defibrillatorsReducer = (state = [], action) => {
  switch (action.type) {
    case INSERT_DEFIBRILLATOR:
      return [...state, action.payload];

    case FETCH_DEFIBRILLATORS:
      return action.payload;

    case CHANGE_DEFIBRILLATOR_FLAG:
      return state.map((defibrillators, index) => {
        if (defibrillators.id !== action.payload.id) {
          return defibrillators;
        }

        return {
          ...defibrillators,
          ...action.payload
        };
      });
    default:
      return state;
  }
};

export default defibrillatorsReducer;
