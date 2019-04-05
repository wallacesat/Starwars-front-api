import React, { Component } from "react";

import swlogo from "../../images/swlogo.png";
import planet from "../../images/_planet.png";
import starship from "../../images/_starship.png";
import vehicle from "../../images/_vehicle.png";
import people from "../../images/_people.png";

import MenuComponent from "../../components/home/MenuComponent";
import "./HomeView.css";

class HomeView extends Component {
  render() {
    return (
      <div
        id="container"
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          zIndex: "-10",
          backgroundColor: "#343a40"
        }}
      >
        <div id="subContainer" className="d-block bg-light" />
        <div
          id="head"
          className="d-flex h-50 justify-content-center align-items-center"
          style={{ backgroundColor: "#2a2f35" }}
        >
          <img src={swlogo} alt="" style={{ height: "auto", width: 300 }} />
        </div>
        <div id="body" className="d-flex flex-row justify-content-center h-50">
          <div
            id="menu"
            className="d-flex bg-dark w-75 h-100 flex-row align-items-center"
          >
            <MenuComponent itemName="Peoples" itemImage={people} />
            <MenuComponent itemName="Planets" itemImage={planet} />
            <MenuComponent itemName="Starships" itemImage={starship} />
            <MenuComponent itemName="Vehicles" itemImage={vehicle} />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeView;
