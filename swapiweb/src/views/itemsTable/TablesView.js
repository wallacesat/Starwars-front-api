import React, { Component, Fragment } from "react";
import { Paper, Button, CircularProgress } from "@material-ui/core";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchPeople, updatePeople } from "../../store/actions/peoples";
import { fetchPlanets, updatePlanets } from "../../store/actions/planets";
import { fetchStarships, updateStarships } from "../../store/actions/starships";
import { fetchVehicles, updateVehicles } from "../../store/actions/vehicles";
import { selectPagePagination } from "../../store/actions/pagination";

import planet from "../../images/_planet.png";
import starship from "../../images/_starship.png";
import vehicle from "../../images/_vehicle.png";
import people from "../../images/_people.png";
import swlogo from "../../images/swlogo.png";
import PaginationComponent from "../../components/itemsTable/PaginationComponent";
import TableComponent from "../../components/itemsTable/TableComponent";

class TablesView extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  pageIsOne() {
    const { selectPagePagination } = this.props;
    selectPagePagination(1);
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
          fetchStarships();
        }
        break;

      case "vehicles":
        if (!state.vehicles) {
          fetchVehicles();
        }
        break;
      default:
        break;
    }
  }

  handlePaginate(page) {
    const resource = this.props.match.params.object;
    const {
      updatePeople,
      updatePlanets,
      updateStarships,
      updateVehicles
    } = this.props;

    const item = {
      peoples: updatePeople,
      planets: updatePlanets,
      starships: updateStarships,
      vehicles: updateVehicles
    };

    if (!this.props.findInState(page)) {
      const itemUpdate = item[resource];
      itemUpdate(page);
    }
  }

  isLoading() {
    const resource = this.props.match.params.object;
    const { state } = this.props;
    return !state[resource] || state[resource].isFetching ? true : false;
  }

  handleItemsTable() {
    const resource = this.props.match.params.object;
    const { state, updatePeople } = this.props;
    const selectedPage = state.pagination.page;
    const pages = state[resource].pages;

    if (!pages.find(item => item.page === selectedPage)) {
      updatePeople(selectedPage);
    }

    const item = pages.find(item => item.page === selectedPage);

    return item.list;
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
            {this.isLoading() ? (
              <div className="d-flex flex-grow-1 justify-content-center align-content-center">
                <div className="d-flex align-self-center flex-column align-items-center justify-content-center">
                  <label className="p-4 lead">Data table in progress ...</label>
                  <CircularProgress color="inherit" />
                </div>
              </div>
            ) : (
              <TableComponent
                columns={this.state.columns[resource]}
                items={state[resource].pages[this.props.currentPage()].list}
                itemName={resource}
              />
            )}
          </div>
          <div className="h-25 w-50 pt-3 pl-3">
            {this.isLoading() ? (
              <Fragment />
            ) : (
              <PaginationComponent
                handlePagination={e => this.handlePaginate(e)}
                resource={resource}
              />
            )}
          </div>
        </div>
        <div className="d-block">
          <div className="d-flex justify-content-center pt-3">
            <Link
              to={{
                pathname: "/"
              }}
              style={{
                textDecoration: "none",
                textDecorationStyle: "none",
                color: "#777"
              }}
              onClick={() => this.pageIsOne()}
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

const mapStateToProps = (state, ownProps) => ({
  state,
  findInState: page => {
    const resource = ownProps.match.params.object;
    const pages = state[resource].pages;
    return pages.find(item => item.page === page);
  },
  currentPage: () => {
    const resource = ownProps.match.params.object;
    const pages = state[resource].pages;
    const resultado = pages.findIndex(
      item => item.page === state.pagination.page
    );
    return resultado < 0 ? 0 : resultado;
  }
});

const mapDispatchToProps = {
  fetchPeople,
  updatePeople,
  fetchPlanets,
  updatePlanets,
  fetchStarships,
  updateStarships,
  fetchVehicles,
  updateVehicles,
  selectPagePagination
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TablesView)
);
