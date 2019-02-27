import React, { Component } from 'react';
import {
    List,
    ListItem,
} from "@material-ui/core";

class DividerComponent extends Component {

    render() {
        this.object = this.props.object;
        const itemList = ['Peoples', 'Starships', 'Planets', 'Vehicles'];
        const { onSelected } = this.props;
        return (
            <List component="nav" style={{height: 200}}>
                {
                    itemList.map((item, i) =>
                    <ListItem onClick={() => onSelected(`${item}`.charAt(0).toLowerCase() + `${item}`.slice(1))} button divider key={i} selected={item === this.object.object}>
                       <span style={{color: '#e0e0e0'}}>{item}</span>
                    </ListItem>)
                }
            </List>
        );
    }
}

export default DividerComponent;