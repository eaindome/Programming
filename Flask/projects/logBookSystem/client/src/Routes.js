// Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FortiClientVPNTable from './components/Tables/FortiClientVPNTable';
import FortiClientForm from './components/Forms/FortiClientVPNForm';


const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path='/client/src/components/Tables/FortiClientVPNTable.js' component={FortiClientVPNTable} />
                <Route path='/client/src/components/Forms/FortiClientVPNForm.js' component={FortiClientForm} />
            </Switch>
        </Router>
    );
};

export default Routes;










