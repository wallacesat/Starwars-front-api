import React, { Component } from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableFooter
} from '@material-ui/core';
import { Link } from 'react-router-dom';


class TableComponent extends Component {
    constructor() {
        super();

        this.state = {
            estado: null,
            object: null
        }
    }

    componentDidMount() {
        const {state: estado} = this.props;
        
    }

    handleUrl(url) {

        let id = url.replace('https://swapi.co/api', '');
        return `/details${id}`;

    }

    handleState() {
        const {object, item} = this.props;

        console.log(object, item);

        return item === 'peoples' ? object.peoples :
            item === 'planets' ? object.planets :
            item === 'starships' ? object.starships : object.vehicles;
    }

    handleTable() {
        let { results, object } = this.object;

        return object === 'Peoples' ?
            results.map((result, i) =>
                <Link key={i} to={{
                    pathname: `${this.handleUrl(result.url)}`,
                    state: this.props.object
                }} style={{ textDecoration: 'none', }}
                    className="d-flex width={1}">
                    <TableRow key={i} hover className="d-flex w-100 align-items-end">

                        <TableCell className="col-2">
                            <img src={result.avatar} className="img-fluid border border-ligth rounded-circle" />
                        </TableCell>
                        <TableCell className="col-4">{result.name}</TableCell>
                        <TableCell className="col-4">{result.gender}</TableCell>
                        <TableCell className="col-2">{result.eye_color}</TableCell>

                    </TableRow >
                </Link>
            ) : object === 'Starships' ?
                results.map((result, i) =>
                    <Link key={i} to={{
                        pathname: `${this.handleUrl(result.url)}`,
                        state: this.props.object
                    }} style={{ textDecoration: 'none', }}
                        className="d-flex width={1}">
                        <TableRow key={i} hover className="d-flex w-100 align-items-end">
                            <TableCell className="col-2">
                                <img src={result.avatar} className="img-fluid border border-ligth rounded-circle" />
                            </TableCell>
                            <TableCell className="col-4">{result.name}</TableCell>
                            <TableCell className="col-4">{result.model}</TableCell>
                            <TableCell className="col-2">{result.starship_class}</TableCell>
                        </TableRow>
                    </Link>) : object === 'Planets' ?
                    results.map((result, i) =>
                        <Link key={i} to={{
                            pathname: `${this.handleUrl(result.url)}`,
                            state: this.props.object
                        }} style={{ textDecoration: 'none', }}
                            className="d-flex width={1}">
                            <TableRow key={i} hover className="d-flex w-100 align-items-end">
                                <TableCell className="col-2">
                                    <img src={result.avatar} className="img-fluid border border-ligth rounded-circle" />
                                </TableCell>
                                <TableCell className="col-4">{result.name}</TableCell>
                                <TableCell className="col-4">{result.climate}</TableCell>
                                <TableCell className="col-2">{result.orbital_period} days</TableCell>
                            </TableRow>
                        </Link>) : object === 'Vehicles' ?
                        results.map((result, i) =>
                            <Link key={i} to={{
                                pathname: `${this.handleUrl(result.url)}`,
                                state: this.props.object
                            }} style={{ textDecoration: 'none', }}
                                className="d-flex width={1}">
                                <TableRow key={i} hover className="d-flex w-100 align-items-end">
                                    <TableCell className="col-2">
                                        <img src={result.avatar} className="img-fluid border border-ligth rounded-circle" />
                                    </TableCell>
                                    <TableCell className="col-4">{result.name}</TableCell>
                                    <TableCell className="col-4">{result.model}</TableCell>
                                    <TableCell className="col-2">{result.passengers}</TableCell>
                                </TableRow>
                            </Link>) : null;
    }

    render() {

        const {results, titlesTable, object} = this.handleState();

        console.log(this.props.object);
        

        this.object = {
            results,
            titlesTable,
            object
        }

        console.log(this.object);
        
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
                    <TableFooter>
                        <TableRow>

                        </TableRow>
                    </TableFooter>
                </Table>
        );
    }
}

export default TableComponent;