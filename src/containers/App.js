import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { addCard, deleteCard, markCard } from "../actions"
import { Header, CardList } from "../components"

class App extends Component {
  render() {
    const { addCard, cardList, markCard, deleteCard, moveDirection } = this.props

    return (
      <div>
        <Header addCard={addCard} />
        <CardList
          cardList={cardList}
          markCard={markCard}
          deleteCard={deleteCard}
          moveDirection={moveDirection}
        />
      </div>
    )
  }
}

App.propTypes = {
  cardList: PropTypes.array.isRequired,
  moveDirection: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  cardList: state.cards.list,
  moveDirection: state.cards.moveDirection,
})

const mapDispatchToProps = {
  addCard,
  markCard,
  deleteCard,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
