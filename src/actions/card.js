import { createAction } from "redux-actions"

// Action Types

export const CARD_ADD = "CARD_ADD"
export const CARD_DELETE = "CARD_DELETE"
export const CARD_MARK = "CARD_MARK"

// Action Creators

export const addCard = createAction(CARD_ADD)
export const deleteCard = createAction(CARD_DELETE)
export const markCard = createAction(CARD_MARK)
