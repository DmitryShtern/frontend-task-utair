import React, { Component } from "react"
import styled from "styled-components"

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hexValue: "",
      timerID: 0,
    }
  }

  handleEditValue = e => {
    clearTimeout(this.state.timerID)
    const value = e.target.value

    const timerID = setTimeout(() => this.setState({ hexValue: value }), 10)
    this.setState({ timerID: timerID })

    if (e.key === "Enter") {
      this.handleAddCard()
    }
  }

  handleAddCard = () => {
    const isValidValue = this.validateValue()

    isValidValue
      ? this.props.addCard(this.state.hexValue)
      : alert("Неверный формат значения.. Пример: #FED или #F0E1D2")

    setTimeout(() => this.setState({ hexValue: "" }), 20)
  }

  validateValue = () => {
    const value = this.state.hexValue

    if (value === "" || value.indexOf(" ") !== -1 || value.indexOf("#") !== 0) {
      return false
    } else if (value.length !== 4 && value.length !== 7) {
      return false
    }

    return true
  }

  render() {
    const Header = styled.div`
      position: fixed;
      top: 7%;
      left: 25%;
      width: 50%;
      height: 20%;
      text-align: center;
      font-size: 2vw;
      color: #000;
    `

    const Wrapper = styled.div`
      position: relative;
      margin: 25px 10%;
      width: 80%;
      height: 50%;
      background-color: #ddd;
      border-radius: 5px;
    `

    const ValueInput = styled.input.attrs({
      placeholder: "#HEX значение",
      value: this.state.hexValue,
    })`
      position: absolute;
      top: 30%;
      left: 10%;
      padding: 0 2%;
      width: 30%;
      height: 40%;
      border: 1px solid #555;
      border-radius: 5px;
      font-size: 0.9vw;
      color: #555;
    `

    const InsertButton = styled.button`
      position: absolute;
      top: 30%;
      right: 10%;
      width: 35%;
      height: 41%;
      border: 0px;
      border-radius: 5px;
      background-color: #444;
      text-align: center;
      font-size: 1vw;
      color: white;
      cursor: pointer;

      :hover {
        background-color: #222;
      }

      :active {
        background-color: #fff;
        color: #000;
      }
    `

    return (
      <Header>
        <label>Управление карточками</label>
        <Wrapper>
          <ValueInput autoFocus onChange={this.handleEditValue} onKeyPress={this.handleEditValue} />
          <InsertButton onClick={this.handleAddCard}>Добавить</InsertButton>
        </Wrapper>
      </Header>
    )
  }
}
