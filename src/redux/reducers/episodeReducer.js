export default function episodeReducer(state = [], action) {
  switch (action.type) {
    case "CREATE_EPISODE":
      return [...state, { ...action.episode }];
    default:
      return state;
  }
}
