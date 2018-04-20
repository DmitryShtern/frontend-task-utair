import React, { Component } from "react"
import styled, { keyframes } from "styled-components"

export default class CardList extends Component {
  render() {
    const { cardList, deleteCard, markCard, moveDirection } = this.props

    const DynamicSize = type => {
      const listIsEmpty = cardList.length === 0

      switch (type) {
        case "padding":
          return listIsEmpty ? "5%" : "4% 1% 4%"
        case "left":
          return listIsEmpty ? "30%" : "15%"
        case "width":
          return listIsEmpty ? "30%" : "66%"
        case "height":
          return listIsEmpty ? "5%" : "48%"
      }
    }

    const List = styled.div`
      position: fixed;
      padding: ${DynamicSize("padding")};
      top: 30%;
      left: ${DynamicSize("left")}
      width: ${DynamicSize("width")}
      height: ${DynamicSize("height")}
      overflow: scroll;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 10px;
      text-align: center;
      font-size: 1.5vw;
      color: #000;
    `

    const moveCard = id => {
      let x,
        y,
        rId = id

      if (moveDirection === "normal") {
        x = "left"
        y = "top"
      } else if (moveDirection === "reverse") {
        x = "right"
        y = "bottom"
        rId++
      }

      if (rId % 4 === 0 && id !== 0) {
        return keyframes`
              0% {${x}: 69%; ${y}: -55%}
              25% {${x}: 92%; ${y}: -55%}
              26% {${x}: 100%; ${y}: 100%}
              27% {${x}: -100%; ${y}: 100%}
              28% {${x}: -100%; ${y}: 0%}
              100% {${x}: 0;}
          `
      } else if (id === 0) {
        return keyframes`
              0% {${x}: -23%;}
              100% {${x}: 0%;}
            `
      } else {
        return keyframes`
              0% {${x}: -23%;}
              100% {${x}: 0%;}
            `
      }
    }

    const Card = styled.div`
      display: inline-block;
      position: relative;
      margin: 0 3% 4%;
      width: 17%;
      height: 45%;
      border: 1px solid #ddd;
      border-radius: 10px;

      animation: ${props => moveCard(props.Idx)} 0.5s ease-in-out 1;
    `

    const CardTitle = styled.label`
      margin-bottom: 15%;
      display: block;
      font-size: 1.5vw;
      color: #555;
    `

    const CardColor = styled.div`
      margin: 15% 35%;
      border: 1px solid #ddd;
      border-radius: 10px;
      width: 30%;
      height: 20%;
      background-color: ${props => props.Color || "#000"};
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
        background-color: rgba(255, 255, 0, 0.3);
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

    const CardList = cardList.map((card, idx) => {
      return (
        <Card key={card.id} Id={card.id} Idx={idx}>
          <CardColor Color={card.color} />
          <CardTitle>{card.color.toUpperCase()}</CardTitle>
          <CardFavoriteButton favorite={card.favorite} onClick={() => markCard(card.id)} />
          <CardDeleteButton onClick={() => deleteCard(card.id)} />
        </Card>
      )
    })

    const content =
      cardList.length > 0 ? (
        CardList
      ) : (
        <div>
          Список карточек пуст.. 😕<br />Добавьте несколько в окошке выше
        </div>
      )

    return <List>{content}</List>
  }
}
