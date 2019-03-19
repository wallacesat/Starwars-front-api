import React, { Component } from "react";
import { Paper, Button, CircularProgress } from "@material-ui/core";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchPeople } from "../../store/actions/peoples";
import { fetchPlanets } from "../../store/actions/planets";
import { fetchStarships } from "../../store/actions/starships";
import { fetchVehicles } from "../../store/actions/vehicles";
import { paginate } from "../../services/utilsService";

import planet from "../../images/_planet.png";
import starship from "../../images/_starship.png";
import vehicle from "../../images/_vehicle.png";
import people from "../../images/_people.png";
import swlogo from "../../images/swlogo.png";
// import { swapiRequest } from "../../services/swapi_connect";
// import PaginationComponent from "../../components/itemsTable/PaginationComponent";
import TableComponent from "../../components/itemsTable/TableComponent";

class TablesView extends Component {
  constructor() {
    super();

    this.state = {
      skip: 0,
      take: 10,
      columns: {
        peoples: ["Name", "Gender", "Eyes Color"],
        planets: ["Name", "Climate", "Orbital Peroid"],
        starships: ["Name", "Model", "Starship Class"],
        vehicles: ["Name", "Model", "Passengers"]
      }
    };
  }

  getImage() {
    const { match } = this.props;

    switch (match.params.object) {
      case "planets":
        return planet;
      case "starships":
        return starship;
      case "vehicles":
        return vehicle;
      default:
        return people;
    }
  }

  componentDidMount() {
    const {
      match,
      state,
      fetchPeople,
      fetchPlanets,
      fetchStarships,
      fetchVehicles
    } = this.props;

    switch (match.params.object) {
      case "peoples":
        if (!state.peoples) {
          fetchPeople();
        }
        break;

      case "planets":
        if (!state.planets) {
          fetchPlanets();
        }
        break;

      case "starships":
        if (!state.starships) {
          console.log("AQUI");

          fetchStarships();
        }
        break;

      case "vehicles":
        if (!state.vehicles) {
          fetchVehicles();
        }
        break;
    }
  }

  render() {
    const { state } = this.props;
    const resource = this.props.match.params.object;

    return (
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          zIndex: "-10",
          backgroundColor: "#343a40"
        }}
      >
        <div className="d-flex p-1 m-1 justify-content-between align-items-center">
          <Paper
            elevation={5}
            className="d-flex justify-content-center align-items-center p-2"
          >
            <img
              src={this.getImage()}
              alt=""
              style={{ height: 90, width: "auto" }}
            />
          </Paper>

          <img src={swlogo} alt="" style={{ height: 100, width: "auto" }} />
        </div>
        <div className="d-block bg-light h-75 align-items-center justify-content-center">
          <div className="d-flex bg-light h-100" style={{ borderRadius: 8 }}>
            {!state[resource] || state[resource].isFetching ? (
              <div className="d-flex flex-grow-1 justify-content-center align-content-center">
                <div className="d-flex align-self-center flex-column align-items-center justify-content-center">
                  <label className="p-4 lead">Data table in progress ...</label>
                  <CircularProgress color="inherit" />
                </div>
              </div>
            ) : (
              <TableComponent
                columns={this.state.columns[resource]}
                items={paginate(
                  state[resource].list,
                  this.state.skip,
                  this.state.take
                )}
                itemName={resource}
              />
            )}
          </div>
          {/* <div className="h-25 w-50 pt-3 pl-3">
            <PaginationComponent
              data={this.state.statePagination || this.handleState()}
              onSelected={(url, page) => this.goToPage(url, page)}
            />
          </div> */}
        </div>
        <div className="d-block">
          <div className="d-flex justify-content-center pt-3">
            <Link
              to={{
                pathname: "/"
                // state: this.getStateNavigation()
              }}
              style={{
                textDecoration: "none",
                textDecorationStyle: "none",
                color: "#777"
              }}
            >
              <Button variant="contained" color="inherit">
                <div className="lead">Voltar</div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state
});

const mapDispatchToProps = {
  fetchPeople,
  fetchPlanets,
  fetchStarships,
  fetchVehicles
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TablesView)
);
