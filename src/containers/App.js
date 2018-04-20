import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { addCard, deleteCard, markCard } from "../actions"
import { Header, CardList } from "../components"

class App extends Component {
  render() {
    const { addCard, cardList, markCard, deleteCard } = this.props

    return (
      <div>
        <Header addCard={addCard} />
        <CardList cardList={cardList} markCard={markCard} deleteCard={deleteCard} />
      </div>
    )
  }
}

App.propTypes = {
  cardList: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  cardList: state.cards.list,
})

const mapDispatchToProps = {
  addCard,
  markCard,
  deleteCard,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
