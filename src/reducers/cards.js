import { combineReducers } from "redux"
import { handleAction, handleActions } from "redux-actions"
import { CARD_ADD, CARD_DELETE, CARD_MARK } from "../actions"

const list = handleActions(
  {
    [CARD_ADD]: (state, { payload }) => [
      ...state,
      {
        id: state.reduce((maxId, card) => Math.max(card.id, maxId), -1) + 1,
        color: payload,
        favorite: false,
      },
    ],
    [CARD_DELETE]: (state, { payload }) =>
      state.filter(card => {
        return card.id !== payload
      }),
    [CARD_MARK]: (state, { payload }) =>
      state.map(card => (card.id === payload ? { ...card, favorite: !card.favorite } : card)),
  },
  [{ id: 0, color: "#fff", favorite: false }],
)

// const list = handleAction(CARDS_ADD, (state, { payload }) => [payload, ...state], [
//   { color: "#fff", favorite: "false" },
// ])

export default combineReducers({
  list,
})
