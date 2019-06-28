import * as React from "react";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import Home from "../components/Home";
import { Redirect } from "react-router-dom";
import { State } from "../componentsModels/DashboardState";
import axios from "axios";

const baseUrl = "http://localhost:64008/api/";

export default class Dashboard extends React.Component<State> {
    state: State = {
        page: 0,
        text: "Leave Dashboard"
    };

    getPage(event: any, value: number) {
        this.setState({ page: value });
        console.log("page in dashboard: ", value);
    }

    render() {
        return (
            <div>
                {this.state.page == 1 && <Redirect to="/leave-request" push />}
                <TopBar text="Leave dashboard" />
                <main className="app">
                    <Home />
                </main>
                <Footer
                    handleChangePage={this.getPage.bind(this)}
                    page={this.state.page}
                />
            </div>
        );
    }
}
