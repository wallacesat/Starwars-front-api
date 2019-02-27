import React, { Component } from "react";
import SearchIcon from '@material-ui/icons/Search';
import { TextField, Grid } from '@material-ui/core';

class SearchComponent extends Component {

    render() {
        const { onSearch } = this.props;
        return (
            <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                    <SearchIcon />
                </Grid>
                <Grid item>
                    <TextField label="Search for 'Name' ..." onChange= {(event) => onSearch(event.target.value)}/>
                </Grid>
            </Grid>
        );
    }
}

export default SearchComponent;