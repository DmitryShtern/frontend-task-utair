import { combineReducers } from "redux"
import { handleAction, handleActions } from "redux-actions"
import { CARD_ADD, CARD_DELETE, CARD_MARK } from "../actions"

const lsArray = []

for (let i = localStorage.length - 1; i !== -1; i--) {
  lsArray.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
}

const list = handleActions(
  {
    [CARD_ADD]: (state, { payload }) => {
      const card = {
        id: state.reduce((maxId, card) => Math.max(card.id, maxId), -1) + 1,
        color: payload,
        favorite: false,
      }

      localStorage.setItem(card.id, JSON.stringify(card))

      return [card, ...state]
    },
    [CARD_DELETE]: (state, { payload }) => {
      localStorage.removeItem(payload)

      return state.filter(card => {
        return card.id !== payload
      })
    },
    [CARD_MARK]: (state, { payload }) => {
      return state.map(card => {
        if (card.id === payload) {
          localStorage.setItem(
            payload,
            JSON.stringify({
              id: card.id,
              color: card.color,
              favorite: !card.favorite,
            }),
          )
        }

        return card.id === payload ? { ...card, favorite: !card.favorite } : card
      })
    },
  },
  lsArray,
)

export default combineReducers({
  list,
})
