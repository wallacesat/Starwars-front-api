import React, { Component } from "react";
import { Fade, Paper, CircularProgress } from "@material-ui/core";
import './MenuComponent.css';
import { Link } from 'react-router-dom';

class MenuComponent extends Component {

    handleState() {
        const name = this.props.itemName;
        const object = this.props.object;

        return name === 'Peoples' ? object.peoples :
        name === 'Planets' ? object.planets :
        name === 'Starships' ? object.starships : object.vehicles;
    }

    render() {
        return (
            <div className="d-flex h-50 w-25 m-2 paper">
                <Link
                    to={{
                        pathname: `${this.props.itemName.toLowerCase()}/table`,
                        state: this.props.object ? this.props.object : null
                    }}

                    style={{
                        textDecoration: 'none',
                        textDecorationStyle: 'none',
                        color: '#777',
                    }}

                    className="img-fluid" >
                    <Fade in={true} style={{ transitionDelay: '200ms' }}>
                        <Paper elevation={5} className="flex-grow-1 d-flex flex-column justify-content-around align-items-center">
                            {
                                !this.props.object.isDone ?
                                    <div className="d-flex justify-content-center align-items-center" style={{ width: 250, height: 130 }}>
                                        <CircularProgress color="inherit" />
                                    </div>
                                    :
                                    <div className="h-75 w-100 d-flex justify-content-center align-items-center">
                                        <img src={this.props.itemImage} alt="" className="img-fluid p-1" style={{ maxWidth: "50%", height: 'auto' }} />
                                    </div>
                            }
                            <div className="d-flex">
                                <div className="lead">
                                    {this.props.itemName}
                                </div>
                            </div>
                        </Paper>
                    </Fade>
                </Link>
            </div>
        );
    }
}

export default MenuComponent;