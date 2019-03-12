import React, { Component } from 'react';
import planet from '../../images/_planet.png';
import starship from '../../images/_starship.png';
import vehicle from '../../images/_vehicle.png';
import people from '../../images/_people.png';
import swlogo from '../../images/swlogo.png';
import { Paper, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import TableComponent from '../../components/itemsTable/TableComponent';

class TablesView extends Component {

    getImage() {
        return this.props.match.params.object === 'planets' ? planet :
            this.props.match.params.object === 'starships' ? starship :
                this.props.match.params.object === 'vehicles' ? vehicle : people;
    }

    render() {
        const {state} = this.props.location;

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
                    <div className="d-flex bg-light" style={{ borderRadius: 8 }}>
                        <TableComponent object={state} itemName={this.props.match.params.object}/>
                    </div>
                    {/* <div className="h-25 w-50 bg-secondary pt-3 pl-3">
                        blablabla
                    </div> */}
                </div>
                <div className="d-block">
                    <div className="d-flex justify-content-center pt-3">
                        <Link to={{
                            pathname: '/',
                            state
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