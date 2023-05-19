import React, { Component } from "react";
import Header from "../components/Header";
import CardContainer from "../components/CardContainer";
import "./../css/Flashcard.scss";
import HeaderWeb from "../components/HeaderWeb";

class Main extends Component {
  render() {
    return (
      <div className="wrapper">
        <HeaderWeb />
        <br />
        <br />
        <br />
        <Header />
        <div className="content-wrapper">
          <CardContainer />
        </div>
      </div>
    );
  }
}

export default Main;
