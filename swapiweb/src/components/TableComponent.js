import React, { Component } from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    TableFooter
} from '@material-ui/core';
import { Link } from 'react-router-dom';


class TableComponent extends Component {
    constructor(props) {
        super(props);
    }

    handleTable() {
        let { results, object } = this.object;
        return object === 'Peoples' ?
            results.map((result, i) =>
                <TableRow key={i} onClick={()=>{console.log(i)}} hover>
                    <TableCell>
                        <img src={result.avatar} className="img-fluid border border-ligth rounded-circle" />
                    </TableCell>
                    <TableCell>{result.name}</TableCell>
                    <TableCell>{result.gender}</TableCell>
                    <TableCell>{result.eye_color}</TableCell>
                </TableRow>) : object === 'Starships' ?
                results.map((result, i) =>
                    <TableRow key={i}>
                        <TableCell>
                            <img src={result.avatar} className="img-fluid border border-ligth rounded-circle" />
                        </TableCell>
                        <TableCell>{result.name}</TableCell>
                        <TableCell>{result.model}</TableCell>
                        <TableCell>{result.starship_class}</TableCell>
                    </TableRow>) : object === 'Planets' ?
                    results.map((result, i) =>
                        <TableRow key={i}>
                            <TableCell>
                                <img src={result.avatar} className="img-fluid border border-ligth rounded-circle" />
                            </TableCell>
                            <TableCell>{result.name}</TableCell>
                            <TableCell>{result.climate}</TableCell>
                            <TableCell>{result.orbital_period} days</TableCell>
                        </TableRow>) : object === 'Vehicles' ?
                        results.map((result, i) =>
                            <TableRow key={i}>
                                <TableCell>
                                    <img src={result.avatar} className="img-fluid border border-ligth rounded-circle" />
                                </TableCell>
                                <TableCell>{result.name}</TableCell>
                                <TableCell>{result.model}</TableCell>
                                <TableCell>{result.passengers}</TableCell>
                            </TableRow>) : null;;
    }

    render() {
        this.resApi = this.props.object;
        const { results, titlesTable, object } = this.resApi.consultTable;

        this.object = {
            results,
            titlesTable,
            object
        }

        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Avatar</TableCell>
                            {
                                titlesTable.map((item, i) =>
                                    <TableCell key={i}>{item}</TableCell>)
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
            </Paper>
        );
    }
}

export default TableComponent;