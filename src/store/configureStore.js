import { createStore, combineReducers, applyMiddleware, compose } from "redux"
// import createSagaMiddleware from "redux-saga"
// import { default as rootSaga } from "../sagas"
import { createLogger } from "redux-logger"
import rootReducer from "../reducers"

// const sagaMiddleware = createSagaMiddleware()
const logger = createLogger()

const middleware = [logger]

const composedEnhancers = compose(applyMiddleware(...middleware))

export default function configureStore() {
  const store = createStore(rootReducer, composedEnhancers)

  if (module.hot) {
    module.hot.accept(rootReducer, () => {
      // const nextRootReducer = require(rootReducer) // WARNiNG: 'Critical dependency: the request of a dependency is an expression' when require() has argument instead string
      const nextRootReducer = require("../reducers")
      store.replaceReducer(nextRootReducer)
    })
  }

  // sagaMiddleware.run(rootSaga)

  return store
}
