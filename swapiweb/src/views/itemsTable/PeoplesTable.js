import React, { Component } from 'react';
import people from '../../images/_people.png';

class PeoplesTable extends Component {

    render() {
        return(
            <div style={{
                position: "fixed",
                width: "100%",
                height: "100%",
                zIndex: "-10",
            }}>
            <div>
                <img src={people} alt=""/>
            </div>
            </div>
        );
    }
}

export default PeoplesTable;