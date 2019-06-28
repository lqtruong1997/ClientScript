import * as React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./scripts/pages/Login";
import Dashboard from "./scripts/pages/Dashboard";
import LeaveRequest from "./scripts/pages/LeaveRequest";
import * as ReactDOM from "react-dom";

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/leave-dashboard" component={Dashboard} />
                    <Route path="/leave-request" component={LeaveRequest} />
                </Switch>
            </Router>
        );
    }
}
ReactDOM.render(<App />, document.getElementById("root"));
