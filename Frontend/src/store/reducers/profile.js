const initialState = {
  profile: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "LOAD_NEWS":
      return {
        ...state,
        profile: payload,
      };
    default:
      return state;
  }
}
