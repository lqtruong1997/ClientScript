import * as React from "react";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import RequestList from "../components/RequestList";
import { Redirect } from "react-router-dom";
import { State } from "../componentsModels/LeaveRequestState";
import axios from "axios";

const baseUrl = "http://localhost:64008/api/";

export default class LeaveRequest extends React.Component<State> {
    state: State = {
        page: 1,
        text: "Leave Request",
        requests: [],
        leaveTypes: []
    };

    getPage(event: any, value: number) {
        this.setState({ page: value });
        console.log("page in dashboard: ", value);
    }

    componentDidMount() {
        var self = this;
        axios
            .get(baseUrl + "LeaveRequest/GetLeaveTypes", {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then(function(response) {
                console.log(response.data);
                self.setState({ leaveTypes: response.data });
            })
            .catch(function(error) {
                console.log(error);
            });

        axios
            .get(baseUrl + "LeaveRequest/GetLeaveRequest", {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then(function(response) {
                console.log(response.data);
                self.setState({ requests: response.data });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                {this.state.page == 0 && (
                    <Redirect to="/leave-dashboard" push />
                )}
                <TopBar text="Leave requests" />
                <main className="app">
                    <RequestList
                        requests={this.state.requests}
                        leaveTypes={this.state.leaveTypes}
                    />
                </main>
                <Footer
                    handleChangePage={this.getPage.bind(this)}
                    page={this.state.page}
                />
            </div>
        );
    }
}
