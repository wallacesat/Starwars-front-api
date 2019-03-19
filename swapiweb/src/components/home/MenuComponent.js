import React from "react";
import { Fade, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";

import "./MenuComponent.css";

const MenuComponent = props => (
  <Link
    to={{
      pathname: `${props.itemName.toLowerCase()}`
    }}
    style={{
      textDecoration: "none",
      textDecorationStyle: "none",
      color: "#777"
    }}
    className="d-flex  h-50 w-25 m-2 paper"
  >
    <Fade in={true} style={{ transitionDelay: "200ms" }}>
      <Paper
        elevation={5}
        className="flex-grow-1 d-flex flex-column justify-content-around align-items-center"
      >
        <div className="h-75 w-50 d-flex justify-content-center align-items-center">
          <img
            src={props.itemImage}
            alt={props.itemName}
            className="img-fluid p-1 h-100 w-auto"
          />
        </div>
        <div className="d-flex">
          <div className="lead">{props.itemName}</div>
        </div>
      </Paper>
    </Fade>
  </Link>
);

export default MenuComponent;
