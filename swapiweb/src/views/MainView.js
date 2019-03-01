import React, { Component } from 'react';
import LoadingComponent from '../components/LoadingComponent';
import DividerComponent from '../components/DividerComponent';
import TableComponent from '../components/TableComponent';
import PaginationComponent from '../components/PaginationComponent';
import { swapiRequest } from '../services/swapi_connect';
import SearchComponent from '../components/SearchComponent';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';


class MainView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requestObject: null,
      consultTable: null,
      loading: false
    }

  }

  componentDidMount() {
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
      <div className="d-flex flex-column" >
        <div className="col-12 bg-dark">
          <label className="lead" style={{ color: 'white' }}>
          <Link to='/details' style={{textDecoration: 'none', color: 'white'}}>
            <strong>Star Wars API</strong>
          </Link>
          </label>
        </div>
        <div className="w-75 d-flex flex-row">
          <div className="col-2 flex-column bg-dark d-flex">
            <div className=" w-100" style={{}}>
            <DividerComponent object={this.state.requestObject} onSelected={e => this.nextPage(e)}/>
            </div>
          </div>
          <div className="col-12">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <div>
                <label className="lead">
                  {this.state.loading ? null : `${this.state.requestObject.object} List`}
                </label>
              </div>
              <div>
                {
                  this.state.loading ?
                    null : <SearchComponent onSearch={value => this.handleSearch(value)} />
                }
              </div>
            </div>
            <div>
              <div>
                {
                  this.state.loading ?
                    <div className="d-flex justify-content-center align-items-center flex-column" style={{ height: 300 }}>
                      <label className="p-4">
                        Data table in progress ...
                      </label>
                      <CircularProgress />
                    </div>
                    : <div><TableComponent object={this.state} /><br /></div>
                }
              </div>
              <div>{
                this.state.loading ? null : <PaginationComponent data={this.state.requestObject} onSelected={(page, object) => this.goToPage(page, object)} />
              }
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : <LoadingComponent />
      ;
  }
}

export default (MainView);