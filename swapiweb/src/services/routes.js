import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import MainView from '../views/MainView';
import DetailsView from '../views/DetailsView';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={MainView} />
            <Route exact path="/details/:object/:url" component={DetailsView} />
        </Switch>
    </BrowserRouter>
);

export default Routes;