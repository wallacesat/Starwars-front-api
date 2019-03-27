import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Paper, Button } from "@material-ui/core";
import LoadingComponent from "../../components/details/LoadingComponent";
import DetailsComponent from "../../components/details/detailsComponent";

class DetailsView extends Component {
  render() {
    let data = this.props.location.state.find(
      item => item.idItem === +this.props.match.params.id
    );
    const resource = this.props.match.params.object;

    return data ? (
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          zIndex: "-10",
          background: "#343a40"
        }}
      >
        <div className="d-flexflex-column">
          <div className="col-12 bg-dark">
            <label className="lead" style={{ color: "white" }}>
              <strong>Details Page: {resource} </strong>
            </label>
          </div>
          <div
            className="d-flex justify-content-center align-items-stretch"
            style={{ height: 600 }}
          >
            <Paper
              elevation={1}
              className="w-50 h-100 d-flex flex-column align-items-center"
              style={{ margin: 20 }}
            >
              <div
                className="d-flex h-50 flex-column align-items-center justify-content-start"
                style={{ marginTop: 10 }}
              >
                <div>
                  <img
                    alt=""
                    src={data.avatar.replace("/40?", "/160?")}
                    className="img-fluid border border-ligth rounded-circle"
                  />
                </div>
                <div>
                  <label className="display-4">{data.name}</label>
                </div>
              </div>
              <DetailsComponent data={data} resource={resource} />
              <div style={{ marginBottom: 20 }}>
                <Link
                  to={{
                    pathname: `/${this.props.match.params.object}`,
                    state: this.props.location.state
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="contained">To Back</Button>
                </Link>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    ) : (
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          zIndex: "-10",
          background: "#343a40"
        }}
      >
        <LoadingComponent />;
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state
});

export default withRouter(connect(mapStateToProps)(DetailsView));
