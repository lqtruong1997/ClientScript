import * as React from "react";
import Card from "./Card";
import Grid from "@material-ui/core/Grid";
import Request from "./Request";
import AddIcon from "@material-ui/icons/Add";
import RefreshIcon from "@material-ui/icons/Refresh";
import FilterListIcon from "@material-ui/icons/FilterList";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import SelectDate from "./SelectDate";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import deepOrange from "@material-ui/core/colors/deepOrange";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { State } from "../componentsModels/RequestListState";
import axios from "axios";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

interface Props {
    requests: object[];
    leaveTypes: object[];
}

const theme = createMuiTheme({
    palette: {
        primary: deepOrange
    }
});

const baseUrl = "http://localhost:64008/api/";

const Transition: React.ComponentType<TransitionProps> = React.forwardRef(
    function Transition(props, ref) {
        return <Slide direction="up" {...props} />;
    }
);

export default class Home extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleToggleFilter = this.handleToggleFilter.bind(this);
        this.handleSelectleaveTypeId = this.handleSelectleaveTypeId.bind(this);
        this.handleSelectStatus = this.handleSelectStatus.bind(this);
        this.handleResetFilter = this.handleResetFilter.bind(this);
        this.handleGetLeaveRequest = this.handleGetLeaveRequest.bind(this);
    }
    state: State = {
        isFilterToggle: false,
        leaveTypeId: 0,
        status: "",
        isReset: false,
        startDate: "",
        endDate: "",
        leaveTypes: [],
        requests: [],
        startDateLink: "",
        endDateLink: ""
    };

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

        history.listen((location, action) => {
            console.log(action, location, location.state);
        });
    }

    handleToggleFilter(event) {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        this.setState({ isFilterToggle: !this.state.isFilterToggle });
    }

    handleGetLeaveRequest() {
        var self = this;
        this.setState({ isFilterToggle: !this.state.isFilterToggle });

        axios
            .get(baseUrl + "LeaveRequest/GetLeaveRequest", {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                params: {
                    startDate: this.state.startDate,
                    endDate: this.state.endDate,
                    leaveTypeId: this.state.leaveTypeId
                }
            })
            .then(function(response) {
                console.log(response.data);
                self.setState({ requests: response.data });
            })
            .catch(function(error) {
                console.log(error);
            });

        let paramString = "";
        paramString = this.addParameterToUrl(
            paramString,
            "end-date",
            this.state.endDateLink
        );
        paramString = this.addParameterToUrl(
            paramString,
            "start-date",
            this.state.startDateLink
        );
        paramString = this.addParameterToUrl(
            paramString,
            "leave-type",
            this.state.leaveTypeId.toString()
        );

        console.log("param string: ", paramString);

        history.push("#/leave-request" + paramString);
    }

    addParameterToUrl(url: string, name: string, value: string) {
        if (value != "" && value != "0") {
            if (url.length == 0) {
                url += "?" + name + "=" + value;
            } else {
                url += "&" + name + "=" + value;
            }
        }
        return url;
    }

    getParameterByName(name: string, url: string) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return "";
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    changeDateToISO(date: string) {
        if (date != "" && date != null) {
            let dateArray = date.split("-");
            let result = "";
            dateArray.reverse().forEach(element => {
                result = result + element + "-";
            });
            return result.substring(0, result.length - 1);
        }
        return date;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.requests !== this.state.requests) {
            let self = this;
            let leaveTypeId = 0;
            if (
                this.getParameterByName("leave-type", history.location.hash) !=
                null
            ) {
                leaveTypeId = parseInt(
                    this.getParameterByName("leave-type", history.location.hash)
                );
            }
            let endDate = this.changeDateToISO(
                this.getParameterByName("end-date", history.location.hash)
            );
            let startDate = this.changeDateToISO(
                this.getParameterByName("start-date", history.location.hash)
            );
            axios
                .get(baseUrl + "LeaveRequest/GetLeaveRequest", {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    },
                    params: {
                        startDate: startDate,
                        endDate: endDate,
                        leaveTypeId: leaveTypeId
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
    }

    getStartDate(date, ISODate) {
        this.setState({ startDate: ISODate, startDateLink: date });
    }

    getEndDate(date, ISODate) {
        this.setState({ endDate: ISODate, endDateLink: date });
    }

    handleSelectleaveTypeId(event) {
        this.setState({ leaveTypeId: event.target.value });
    }

    handleSelectStatus(event) {
        this.setState({ status: event.target.value });
    }

    handleResetFilter(event) {
        var self = this;
        this.setState({ isFilterToggle: false });
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
            <MuiThemeProvider theme={theme}>
                <div className="request-list">
                    {this.state.requests.map(request => (
                        <Grid container justify="center">
                            <Grid item lg={8} xs={12}>
                                <Card name="">
                                    <Request
                                        leaveType={request.leaveType}
                                        days={request.numberOfDay}
                                        during={
                                            request.numberOfDay <= 1
                                                ? request.startDate
                                                : request.startDate +
                                                  " to " +
                                                  request.endDate
                                        }
                                    />
                                </Card>
                            </Grid>
                        </Grid>
                    ))}
                    <button
                        color="primary"
                        className="filter-request"
                        onClick={this.handleToggleFilter}
                    >
                        <FilterListIcon />
                    </button>
                    <button color="primary" className="add-request">
                        <AddIcon />
                    </button>
                    <Dialog
                        TransitionComponent={Transition}
                        keepMounted
                        className="filter"
                        open={this.state.isFilterToggle}
                        onClose={this.handleToggleFilter}
                    >
                        <Grid
                            direction="row"
                            container
                            className="header"
                            justify="flex-end"
                        >
                            <h2 className="title">Filter</h2>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    className="reset"
                                    onClick={this.handleResetFilter}
                                >
                                    <RefreshIcon />
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container direction="row">
                            <Grid item xs={12} lg={6} className="start-date">
                                <SelectDate
                                    getDate={this.getStartDate.bind(this)}
                                    isReset={this.state.isReset}
                                    label="Start date"
                                    placeholder="Click to select the start date"
                                />
                            </Grid>
                            <Grid item xs={12} lg={6} className="end-date">
                                <SelectDate
                                    getDate={this.getEndDate.bind(this)}
                                    isReset={this.state.isReset}
                                    label="End date"
                                    placeholder="Click to select the end date"
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <FormControl fullWidth className="leave-type">
                                <InputLabel
                                    shrink
                                    htmlFor="age-label-placeholder"
                                >
                                    Leave type
                                </InputLabel>
                                <Select
                                    displayEmpty
                                    name="leaveTypeId"
                                    value={this.state.leaveTypeId}
                                    onChange={this.handleSelectleaveTypeId}
                                >
                                    <MenuItem value={0}>None</MenuItem>
                                    {this.state.leaveTypes.map(leaveType => (
                                        <MenuItem value={leaveType.id}>
                                            {leaveType.code}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid container>
                            <FormControl fullWidth className="status">
                                <InputLabel
                                    shrink
                                    htmlFor="age-label-placeholder"
                                >
                                    Status
                                </InputLabel>
                                <Select
                                    displayEmpty
                                    name="status"
                                    fullWidth
                                    value={this.state.status}
                                    onChange={this.handleSelectStatus}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    <MenuItem value={10}>Pending</MenuItem>
                                    <MenuItem value={20}>Approved</MenuItem>
                                    <MenuItem value={30}>Rejected</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <div className="filter-footer">
                            <Button
                                variant="outlined"
                                className="apply"
                                onClick={this.handleGetLeaveRequest}
                            >
                                Apply
                            </Button>
                            <Button
                                variant="outlined"
                                className="close"
                                onClick={this.handleToggleFilter}
                            >
                                Close
                            </Button>
                        </div>
                    </Dialog>
                </div>
            </MuiThemeProvider>
        );
    }
}
