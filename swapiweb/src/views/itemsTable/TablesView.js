import React, { Component } from 'react';
import planet from '../../images/_planet.png';
import starship from '../../images/_starship.png';
import vehicle from '../../images/_vehicle.png';
import people from '../../images/_people.png';
import swlogo from '../../images/swlogo.png';
import { Paper, Button, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { swapiRequest } from '../../services/swapi_connect';
import PaginationComponent from '../../components/itemsTable/PaginationComponent';
import TableComponent from '../../components/itemsTable/TableComponent';

class TablesView extends Component {
    constructor() {
        super();

        this.state = {
            stateNavigation: null,
            statePagination: null,
            loading: false
        }
    }

    getImage() {
        return this.props.match.params.object === 'planets' ? planet :
            this.props.match.params.object === 'starships' ? starship :
                this.props.match.params.object === 'vehicles' ? vehicle : people;
    }

    handleState(itemName) {
        const { state } = this.props.location;

        return itemName === 'people' ? state.peoples :
            itemName === 'planets' ? state.planets :
                itemName === 'starships' ? state.starships : state.vehicles;
    }

    getStateNavigation() {
        return this.state.stateNavigation || this.props.location.state;
    }

    goToPage(url = null, page = null) {
        let object = this.props.match.params.object;
        object = object === 'peoples' ? 'people' : object;

        const stateNavigation = this.getStateNavigation();

        this.setState({ loading: true, stateNavigation });

        swapiRequest(url, page, object).then((value) => {
            value.titlesTable = value.object === 'Peoples' ? ['Name', 'Gender', 'Eyes Color'] :
                                value.object === 'Planets' ? ['Name', 'Climate', 'Orbital Peroid'] :
                                value.object === 'Starships' ? ['Name', 'Model', 'Starship Class'] : ['Name', 'Model', 'Passengers'];
            let state = this.state.stateNavigation;

            value.object === 'Peoples' ? state.peoples = value :
                value.object === 'Planets' ? state.planets = value :
                value.object === 'Starships' ? state.starships = value: state.vehicles = value;
            
            this.setState({statePagination: value, loading: false, stateNavigation: state});
        })
    }

    render() {

        return (
            <div style={{
                position: "fixed",
                width: "100%",
                height: "100%",
                zIndex: "-10",
                backgroundColor: "#343a40"
            }}  >
                <div className="d-flex p-1 m-1 justify-content-between align-items-center">
                    <Paper elevation={5} className="d-flex justify-content-center align-items-center p-2">
                        <img src={this.getImage()} alt="" style={{ height: 90, width: "auto" }} />
                    </Paper>

                    <img src={swlogo} alt="" style={{ height: 100, width: "auto" }} />
                </div>
                <div className="d-block bg-light h-75 align-items-center justify-content-center">
                    <div className="d-flex bg-light h-100" style={{ borderRadius: 8 }}>
                        {
                            this.state.loading ?
                                <div className="d-flex flex-grow-1 justify-content-center align-content-center" >
                                    <div className="d-flex align-self-center flex-column align-items-center justify-content-center">
                                        <label className="p-4 lead">
                                            Data table in progress ...
                                         </label>
                                        <CircularProgress color="inherit" />
                                    </div>
                                </div>
                                : <TableComponent statePagination={this.state.statePagination} object={this.getStateNavigation()} itemName={this.props.match.params.object} />
                        }
                    </div>
                    <div className="h-25 w-50 pt-3 pl-3">
                        <PaginationComponent data={this.state.statePagination || this.handleState()} onSelected={(url, page) => this.goToPage(url, page)} />
                    </div>
                </div>
                <div className="d-block">
                    <div className="d-flex justify-content-center pt-3">
                        <Link to={{
                            pathname: '/',
                            state: this.getStateNavigation()
                        }} style={{ textDecoration: 'none', textDecorationStyle: 'none', color: '#777' }}>
                            <Button variant="contained" color="inherit">
                                <div className="lead">
                                    Voltar
                            </div>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default TablesView;