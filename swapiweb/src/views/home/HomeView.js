import React, { Component } from 'react';
import swlogo from '../../images/swlogo.png';
import planet from '../../images/_planet.png';
import starship from '../../images/_starship.png';
import vehicle from '../../images/_vehicle.png';
import people from '../../images/_people.png';
import { swapiRequest } from '../../services/swapi_connect';
import MenuComponent from '../../components/home/MenuComponent';
import './HomeView.css';

class HomeView extends Component {
    constructor() {
        super();

        this.state = {
            peoples: null,
            planets: null,
            starships: null,
            vehicles: null,
        }
    }

    componentDidMount() {

        const { state } = this.props.location;

        state ? this.setState(state) :

            swapiRequest().then((peoples) => {
                peoples.titlesTable = ['Name', 'Gender', 'Eyes Color'];
                swapiRequest(null, null, 'planets').then((planets) => {
                    planets.titlesTable = ['Name', 'Climate', 'Orbital Peroid'];
                    swapiRequest(null, null, 'starships').then((starships) => {
                        starships.titlesTable = ['Name', 'Model', 'Starship Class'];
                        swapiRequest(null, null, 'vehicles').then((vehicles) => {
                            vehicles.titlesTable = ['Name', 'Model', 'Passengers'];
                            this.setState({ peoples, planets, starships, vehicles, isDone: true });;
                        });
                    });
                });
            });
    }

    render() {
        return (
            <div style={{
                position: "fixed",
                width: "100%",
                height: "100%",
                zIndex: "-10",
                backgroundColor: "#343a40"
            }}>
                <div className="d-block bg-light">

                </div>
                <div className="d-flex h-50 justify-content-center align-items-center" style={{ backgroundColor: '#2a2f35' }}>
                    <img src={swlogo} alt="" style={{ height: 'auto', width: 300 }} />
                </div>
                <div className="d-flex flex-row justify-content-center h-50">
                    <div className="d-flex bg-dark w-75 h-100 flex-row align-items-center">
                        <MenuComponent itemName='Peoples' itemImage={people} object={this.state} />
                        <MenuComponent itemName='Planets' itemImage={planet} object={this.state} />
                        <MenuComponent itemName='Starships' itemImage={starship} object={this.state} />
                        <MenuComponent itemName='Vehicles' itemImage={vehicle} object={this.state} />
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeView;