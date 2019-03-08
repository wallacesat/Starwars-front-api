import React, { Component } from "react";
import { Fade, Paper } from "@material-ui/core";
import './MenuComponent.css';

class MenuComponent extends Component {

    render() {
        return (
            <div className="d-flex h-50 w-25 m-2 paper">
                <Fade in={true} style={{ transitionDelay: '200ms' }}>
                    <Paper elevation={5} className="flex-grow-1 d-flex flex-column justify-content-around align-items-center">
                        <div className="h-75 w-100 d-flex justify-content-center align-items-center">
                            <img src={this.props.itemImage} alt="" style={{ height: 150, width: 'auto' }} />
                        </div>
                        <div className="d-flex">
                            <div className="lead">
                                {this.props.itemName}
                            </div>
                        </div>
                    </Paper>
                </Fade>
            </div>
        );
    }
}

export default MenuComponent;