import { FETCH_POSTS, NEW_POST } from "../actions/types";

const initialState = {
  items: [],
  item: {},
  color: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_ITEMS":
      return {
        ...state,
        items: action.payload
      };
    case "SKATA":
      return {
        ...state,
        color: action.eidos
      };
    case FETCH_POSTS:
      console.log("reducer");
      return {
        ...state, //current state (spread operator)
        items: action.payload
      };
    default:
      return state;
  }
}

const whatsYourName = name => console.log(`HEllo ${name}`);
