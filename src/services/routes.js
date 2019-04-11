import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import DetailsView from "../views/details/DetailsView";
import HomeView from "../views/home/HomeView";
import TablesView from "../views/itemsTable/TablesView";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomeView} />
      <Route exact path="/:object" component={TablesView} />
      <Route exact path="/:object/:id" component={DetailsView} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
