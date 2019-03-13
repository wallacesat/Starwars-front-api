import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { detailsRequest } from '../../services/swapi_connect';
import {
    Paper,
    Button,
    Divider
} from '@material-ui/core';
import LoadingComponent from '../../components/LoadingComponent';
import DetailsComponent from '../../components/details/detailsComponent';

class DetailsView extends Component {
    constructor() {
        super();

        this.state = {
            data: null,
        }
    }

    handleState() {
        const {itemName} = this.props.match.params;
        const {state} = this.props.location;

        return itemName === 'people' ? state.peoples :
            itemName === 'planets' ? state.planets :
            itemName === 'starships' ? state.starships : state.vehicles;
    }

    componentDidMount() {
        const { itemName, id } = this.props.match.params;
        const {object} = this.handleState();

        let item = itemName === 'people' ? 'peoples' : itemName;

        this.props.location.state && item.toUpperCase() === object.toUpperCase() ? (() => {

            let { results } = this.handleState();

            let res = results.filter((item) => {
                return item.idItem === id;
            });

            this.setState({ data: res[0] });
        })() : detailsRequest(itemName, id).then((value) => {
            const { data } = value;
            this.setState({ data });
        });

    }

    render() {

        const { data } = this.state;
        const { itemName } = this.props.match.params;
        const { state } = this.props.location;

        return data ? (
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
                            <strong>Details Page: {itemName} </strong>
                        </label>
                    </div>
                    <div className="d-flex justify-content-center align-items-stretch" style={{ height: 600 }}>
                        <Paper elevation={1} className="w-50 h-100 d-flex flex-column align-items-center" style={{ margin: 20 }}>
                            <div className="d-flex h-50 flex-column align-items-center justify-content-start" style={{ marginTop: 10 }}>
                                <div>
                                    <img alt="" src={data.avatar.replace('40?', '120?')} className="img-fluid border border-ligth rounded-circle" />
                                </div>
                                <div>
                                    <label className="display-4">
                                        {data.name}
                                    </label>
                                </div>
                            </div>
                                <DetailsComponent data={data} itemName={itemName}/>
                            <div style={{ marginBottom: 20 }}>
                                <Link to={{
                                    pathname: `/${this.props.match.params.itemName}/table`,
                                    state
                                }} style={{ textDecoration: 'none' }}>
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