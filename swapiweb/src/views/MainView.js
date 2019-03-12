import React, { Component } from 'react';
import LoadingComponent from '../components/LoadingComponent';
import DividerComponent from '../components/DividerComponent';
import TableComponent from '../components/TableComponent';
import PaginationComponent from '../components/PaginationComponent';
import { swapiRequest } from '../services/swapi_connect';
import SearchComponent from '../components/SearchComponent';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';


class MainView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requestObject: null,
      consultTable: null,
    }

  }

  componentDidMount() {
    const { state } = this.props.location;
    
    state ? this.setState(state) :

      swapiRequest().then((value) => {
        value.titlesTable = (value.object === "Peoples" ? ['Name', 'Gender', 'Eyes Color'] :
          value.object === "Starships" ? ['Name', 'Model', 'Starship Class'] :
            value.object === "Planets" ? ['Name', 'Climate', 'Orbital Peroid'] : ['Name', 'Model', 'Passengers']);

        let { ...requestObject } = value;
        let { ...consultTable } = value;
        this.setState({ requestObject, consultTable });
      });
  }

  nextPage = (object) => {
    object === 'peoples' ? (() => object = 'people')() : (() => { })();

    this.setState({ loading: true });
    swapiRequest(null, null, object).then((value) => {
      value.titlesTable = (value.object === "Peoples" ? ['Name', 'Gender', 'Eyes Color'] :
        value.object === "Starships" ? ['Name', 'Model', 'Starship Class'] :
          value.object === "Planets" ? ['Name', 'Climate', 'Orbital Peroid'] : ['Name', 'Model', 'Passengers']);

      let { ...requestObject } = value;
      let { ...consultTable } = value;
      this.setState({ requestObject, loading: false, consultTable });
    });
  }

  handleSearch = (word) => {
    const consult = this.state.requestObject.results;
    let results = (consult.map(item => item.name.toUpperCase().includes(word.toUpperCase()) ? item : null).filter(e => e !== null));
    let consultTable = this.state.requestObject;
    consultTable = { ...consultTable, results };
    this.setState({ consultTable });
  }

  goToPage = (page, object) => {
    console.log(page, object);
    object === 'peoples' ? (() => object = 'people')() : (() => { })();
    this.setState({ loading: true });
    swapiRequest(null, page, object).then((value) => {
      value.titlesTable = (value.object === "Peoples" ? ['Name', 'Gender', 'Eyes Color'] :
        value.object === "Starships" ? ['Name', 'Model', 'Starship Class'] :
          value.object === "Planets" ? ['Name', 'Climate', 'Orbital Peroid'] : ['Name', 'Model', 'Passengers']);

      let { ...requestObject } = value;
      let { ...consultTable } = value;
      this.setState({ requestObject, loading: false, consultTable });
    });
  }

  render() {
    return this.state.requestObject ? (
      <div style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: "-10",
        background: "#343a40"
      }}>
      <div className="d-flex flex-column bg-dark pb-3" >
        <div className="col-xs-12 bg-dark header p-0 flex-row d-flex align-items-center">
          <div className="col-2 justify-content-center d-flex pt-1">
            <img src={logo} className="img-fluid" style={{ height: 70, width: 70 }} />
          </div>
          <div className="pl-3 col-10">
            <label className="lead" style={{ color: 'white' }}>
              <Link to='/details' style={{ textDecoration: 'none', color: 'white' }}>
                <strong>Star Wars API</strong>
              </Link>
            </label>
          </div>
        </div>
        <div className="col-12 d-flex flex-row p-0 align-items-start pr-2">
          <div className="col-2 flex-column p-0">
            <div className="" style={{}}>
              <DividerComponent object={this.state.requestObject} onSelected={e => this.nextPage(e)} />
            </div>
          </div>
          <div className="col-10 p-0 m-0 d-flex flex-column justify-content-start">
            <div className="d-flex flex-row justify-content-between">
              <div className="d-flex align-self-center pl-3">
                <label className="lead" style={{ color: "white" }}>
                  {this.state.loading ? null : `${this.state.requestObject.object} List`}
                </label>
              </div>
              <div>
                {
                  this.state.loading ?
                    null : 
                    <div className="bg-white p-2 mb-1">
                      <SearchComponent onSearch={value => this.handleSearch(value)} />
                    </div>
                }
              </div>
            </div>
            <div className="d-flex col-12 flex-column p-0 pl-3">
              <div className="mb-n3 align-items-center justify-content-center d-flex">
                {
                  this.state.loading ?
                    <div className="d-flex justify-content-center align-items-center flex-column" style={{ height: 250, width: 700, backgroundColor: '#e7e8ec', borderRadius: 10 }}>
                      <div className="d-flex flex-column align-items-center justify-content-center">
                        <label className="p-4">
                          Data table in progress ...
                        </label>
                        <CircularProgress />
                      </div>
                    </div>
                    : <div className="d-block w-100"><TableComponent object={this.state} /><br /></div>
                }
              </div>
              <div className="d-flex" style={{ height: 40 }}>{
                this.state.loading ? null : <PaginationComponent data={this.state.requestObject} onSelected={(page, object) => this.goToPage(page, object)} />
              }
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    ) : 
    <div style={{
      position: "fixed",
      width: "100%",
      height: "100%",
      zIndex: "-10",
      background: "#343a40"
    }}>
      <LoadingComponent />
    </div>
      ;
  }
}

export default (MainView);