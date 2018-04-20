import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import { createLogger } from "redux-logger"
import rootReducer from "../reducers"

const logger = createLogger()

const middleware = [logger]

const composedEnhancers = compose(applyMiddleware(...middleware))

export default function configureStore() {
  const store = createStore(rootReducer, composedEnhancers)

  if (module.hot) {
    module.hot.accept(rootReducer, () => {
      const nextRootReducer = require("../reducers")
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
