import React, { Component } from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@material-ui/core';
import { Link } from 'react-router-dom';


class TableComponent extends Component {
 
    handleUrl(url) {

        const id = url.replace('https://swapi.co/api', '');
        return `/details${id}`;

    }

    handleState() {
        let {object, itemName, statePagination} = this.props;
        
        if (statePagination !== null ) {
            return statePagination;
        }

        return itemName === 'peoples' ? object.peoples :
            itemName === 'planets' ? object.planets :
            itemName === 'starships' ? object.starships : object.vehicles;
    }

    handleTable() {
        const { results } = this.handleState();
        const { itemName } = this.props;

        let data = [];
        results.map((item, i)=> {
            data.push(
                {
                    name: item.name,
                    avatar: item.avatar,
                    url: item.url,
                    attributes: itemName === 'planets' ? [ item.climate, item.orbital_period] :
                                itemName === 'vehicles' ?[ item.model, item.passengers ] :
                                itemName === 'starships' ?[ item.model, item.starship_class ] : [ item.gender, item.eye_color ]
                }
            );
        })
        
        return data.map((item, i)=> 

            <Link key={i} to={{
                pathname: `${this.handleUrl(item.url)}`,
                state: this.props.object
            }} style={{ textDecoration: 'none', }}
                className="d-flex width={1}">
                <TableRow key={i} hover className="d-flex w-100 align-items-end">
                    <TableCell className="col-2">
                        <img src={item.avatar} className="img-fluid border border-ligth rounded-circle" alt=""/>
                    </TableCell>
                    <TableCell className="col-4">{item.name}</TableCell>
                    <TableCell className="col-4">{item.attributes[0]}</TableCell>
                    <TableCell className="col-2">{item.attributes[1]}</TableCell>
                </TableRow >
            </Link>

        );
    }

    render() {
        const {titlesTable} = this.handleState();

        return (
                <Table className="table-responsive">
                    <TableHead className="d-flex witdh={1}">
                        <TableRow className="d-flex align-items-end w-100">
                            <TableCell className="col-2">Avatar</TableCell>
                            {
                                titlesTable.map((item, i) =>
                                    <TableCell key={i} className={
                                        i === 0 || i === 1 ? 'col-4' : 'col-2'
                                    } >{item}</TableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.handleTable()}
                    </TableBody>
                </Table>
        );
    }
}

export default TableComponent;