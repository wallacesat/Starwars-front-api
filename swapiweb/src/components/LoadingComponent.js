import React, { Component } from 'react';
import {
    CircularProgress,

} from '@material-ui/core';

class LoadingComponent extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center align-items-end" style={{ height: 400 }}>
                <div className="p-4 d-flex justify-content-end align-items-center flex-column h-50 w-50" style={{ backgroundColor: '#e7e8ec', borderRadius: 10 }}>
                    <label className="p-4 display-4">
                        Please, wait loading...
                    </label>
                    <CircularProgress />
                </div>
            </div>
        );
    }
}

export default LoadingComponent;