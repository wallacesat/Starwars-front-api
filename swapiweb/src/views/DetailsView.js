import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { detailsRequest } from '../services/swapi_connect';
import {
    Paper,
    Button,
    Divider
} from '@material-ui/core';
import LoadingComponent from '../components/LoadingComponent';

class DetailsView extends Component {
    constructor() {
        super();

        this.state = {
            data: null,
        }
    }

    componentDidMount() {
        const { url } = this.props.match.params;
        console.log(url);
        
        detailsRequest(url).then((value) => {
            const { data } = value;

            this.setState({ data });
        });
    }

    render() {

        const { data } = this.state;
        const {object} = this.props.match.params;
        const { state } = this.props.location;
        console.log(state);

        return this.state.data ? (
            <div style={{
                position: "fixed",
                width: "100%",
                height: "100%",
                zIndex: "-10",
                background: "#343a40"
            }}>
            <div className="d-flexflex-column">
                <div className="col-12 bg-dark">
                    <label className="lead" style={{ color: 'white' }}>
                        <strong>Details Page: {object} </strong>
                    </label>
                </div>
                <div className="d-flex justify-content-center align-items-stretch" style={{ height: 600 }}>
                    <Paper elevation={1} className="w-50 h-100 d-flex flex-column align-items-center" style={{ margin: 20 }}>
                        <div className="d-flex h-50 flex-column align-items-center justify-content-start" style={{marginTop: 10}}>
                            <div>
                                <img src={data.avatar} className="img-fluid border border-ligth rounded-circle" />
                            </div>
                            <div>
                                <label className="display-4">
                                    {data.name}
                                </label>
                            </div>
                        </div>
                        <div className="d-flex w-100">
                            <Divider variant="inset" />
                        </div>
                        {
                            object === 'Planets' ?
                                <div className="d-flex flex-row h-75 w-75 align-items-start justify-content-between">
                                    <div className="d-flex flex-column">
                                        <label className="lead">
                                            <strong>Terrain:</strong> {data.terrain}
                                        </label>
                                        <label className="lead">
                                            <strong>Gravity:</strong> {data.gravity}
                                        </label>
                                        <label className="lead">
                                            <strong>Diameter:</strong> {data.diameter}
                                        </label>
                                        <label className="lead">
                                            <strong>Climate:</strong> {data.climate}
                                        </label>
                                        <label className="lead">
                                            <strong>Popularion:</strong> {data.population}
                                        </label>
                                        <label className="lead">
                                            <strong>Orbital Period:</strong> {`${data.orbital_period} Days`}
                                        </label>
                                        <label className="lead">
                                            <strong>Rotation Period:</strong> {`${data.rotation_period} Days`}
                                        </label>
                                        <label className="lead">
                                            <strong>Surface Water:</strong> {data.surface_water}
                                        </label>
                                    </div>
                                </div> :
                            
                            object === 'Vehicles' ?
                                <div className="d-flex flex-row h-75 w-75 align-items-start justify-content-between">
                                    <div className="d-flex flex-column">
                                        <label className="lead">
                                            <strong>Vehicle Class:</strong> {data.vehicle_class}
                                        </label>
                                        <label className="lead">
                                            <strong>Model:</strong> {data.model}
                                        </label>
                                        <label className="lead">
                                            <strong>Manufacturer:</strong> {data.manufacturer}
                                        </label>
                                        <label className="lead">
                                            <strong>Cargo Capacity:</strong> {data.cargo_capacity} Pounds
                                        </label>
                                        <label className="lead">
                                            <strong>Passengers:</strong> {data.passengers} Persons
                                        </label>
                                        <label className="lead">
                                            <strong>Length:</strong> {data.length} Meters
                                        </label>
                                        <label className="lead">
                                            <strong>Consumables:</strong> {data.consumables} 
                                        </label>
                                        <label className="lead">
                                            <strong>Max Atmosphering Speed:</strong> {data.max_atmosphering_speed}
                                        </label>
                                    </div>
                                </div> : 
                            
                            object === 'Starships' ?
                                <div className="d-flex flex-row h-75 w-75 align-items-start justify-content-between">
                                    <div className="d-flex flex-column">
                                        <label className="lead">
                                            <strong>Starship Class:</strong> {data.starship_class}
                                        </label>
                                        <label className="lead">
                                            <strong>Model:</strong> {data.model}
                                        </label>
                                        <label className="lead">
                                            <strong>Manufacturer:</strong> {data.manufacturer}
                                        </label>
                                        <label className="lead">
                                            <strong>Cargo Capacity:</strong> {data.cargo_capacity} Pounds
                                        </label>
                                        <label className="lead">
                                            <strong>Passengers:</strong> {data.passengers} Persons
                                        </label>
                                        <label className="lead">
                                            <strong>Length:</strong> {data.length} Meters
                                        </label>
                                        <label className="lead">
                                            <strong>Consumables:</strong> {data.consumables} 
                                        </label>
                                        <label className="lead">
                                            <strong>Max Atmosphering Speed:</strong> {data.max_atmosphering_speed}
                                        </label>
                                    </div>
                                </div> : 
                            
                            object === 'Peoples' ?
                                <div className="d-flex flex-row h-75 w-75 align-items-start justify-content-between">
                                    <div className="d-flex flex-column">
                                        <label className="lead">
                                            <strong>Gender:</strong> {data.gender}
                                        </label>
                                        <label className="lead">
                                            <strong>Eye Color:</strong> {data.eye_color}
                                        </label>
                                        <label className="lead">
                                            <strong>Hair Color:</strong> {data.hair_color}
                                        </label>
                                        <label className="lead">
                                            <strong>Height:</strong> {data.height} Centimeters
                                        </label>
                                        <label className="lead">
                                            <strong>Skin Color:</strong> {data.skin_color}
                                        </label>
                                        <label className="lead">
                                            <strong>Mass:</strong> {data.mass} pounds
                                        </label>
                                        <label className="lead">
                                            <strong>Birth Year:</strong> {data.birth_year}
                                        </label>
                                        <label className="lead">
                                            <strong>Vehicles:</strong> n/a
                                        </label>
                                    </div>
                                </div> : null
                        }
                        <div style={{ marginBottom: 20 }}>
                            <Link to={{
                                pathname: '/',
                                state: state
                            }} style={{textDecoration: 'none'}}>
                                <Button variant="contained">
                                    To Back
                                </Button>
                            </Link>
                        </div>
                    </Paper>
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
            <LoadingComponent />;
        </div>
    }
}

export default DetailsView;