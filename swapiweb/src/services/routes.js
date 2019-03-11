import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import MainView from '../views/MainView';
import DetailsView from '../views/DetailsView';
import HomeView from '../views/home/HomeView';
import TablesView from '../views/itemsTable/TablesView';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={HomeView} />
            <Route path="/mainview" component={MainView} />
            <Route path="/:object/table" component={TablesView} />
            <Route exact path="/details/:object/:id" component={DetailsView} />
        </Switch>
    </BrowserRouter>
);

export default Routes;