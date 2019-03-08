import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import MainView from '../views/MainView';
import DetailsView from '../views/DetailsView';
import HomeView from '../views/home/HomeView';
import PeoplesTable from '../views/itemsTable/PeoplesTable';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={HomeView} />
            <Route path="/table" component={MainView}/>
            <Route path="/peoples_table" component={PeoplesTable}/>
            <Route exact path="/details/:object/:id" component={DetailsView} />
        </Switch>
    </BrowserRouter>
);

export default Routes;