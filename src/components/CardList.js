import React, { Component } from "react"
import styled from "styled-components"

export default class CardList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { cardList, deleteCard, markCard } = this.props

    const DynamicSize = type => {
      const listIsEmpty = cardList.length === 0 ? true : false

      switch (type) {
        case "padding":
          return listIsEmpty ? "5%" : "0"
        case "left":
          return listIsEmpty ? "35%" : "15%"
        case "width":
          return listIsEmpty ? "20%" : "70%"
        case "height":
          return listIsEmpty ? "5%" : "60%"
      }
    }

    const List = styled.div`
      position: fixed;
      padding: ${DynamicSize("padding")};
      top: 30%;
      left: ${DynamicSize("left")}
      width: ${DynamicSize("width")}
      height: ${DynamicSize("height")}
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 10px;
      text-align: center;
      font-size: 1.5vw;
      color: #000;
    `

    const Card = styled.div`
      position: relative;
      margin: 5% 5%;
      width: 14%;
      height: 35%;
      border: 1px solid #ddd;
      border-radius: 10px;
    `

    const CardTitle = styled.label`
      margin-bottom: 15%;
      display: block;
      font-size: 1.5vw;
      color: #555;
    `

    const CardColor = styled.div`
      margin: 15% 35%;
      border: 1px solid #000;
      border-radius: 10px;
      width: 30%;
      height: 20%;
      background-color: ${props => props.color || "#000"};
    `

    const CardFavoriteButton = styled.button`
      position: absolute;
      left: 10px;
      bottom: 10px
      width: 20%;
      height: 20%;
      background: ${props => (props.favorite ? "#ff0" : "#fff")} url("star.png") center no-repeat;
      background-size: cover;
      border: none;
      cursor: pointer;

      :hover {
        background-color: #ff08;
      }

      :active {
        background-color: ${props => (props.favorite ? "#fff" : "#ff0")};
      }
    `

    const CardDeleteButton = styled.button`
      position: absolute;
      right: 10px;
      bottom: 10px;
      width: 20%;
      height: 20%;
      background: #f00 url("trash.png") center no-repeat;
      background-size: cover;
      border: none;
      cursor: pointer;

      :hover {
        background-color: #940000;
      }

      :active {
        background-color: #750000;
      }
    `

    const CardList = cardList.map(card => {
      return (
        <Card key={card.id}>
          <CardColor color={card.color} />
          <CardTitle>{card.color.toUpperCase()}</CardTitle>
          <CardFavoriteButton favorite={card.favorite} onClick={() => markCard(card.id)} />
          <CardDeleteButton onClick={() => deleteCard(card.id)} />
        </Card>
      )
    })

    const content = cardList.length > 0 ? CardList : "Список карточек пуст.. 😕"

    console.log("cardList.length: " + cardList.length)
    console.log("cardList: " + cardList)
    console.log("content: " + content)
    console.log("cardList.length > 0 is a " + (cardList.length > 0))

    return <List>{content}</List>
  }
}
