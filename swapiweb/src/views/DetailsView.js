import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DetailsView extends Component {

    render() {
        return(
            <Link to='/'>
                <h4>Details Page</h4>
            </Link>
        );
    }
}

export default DetailsView;