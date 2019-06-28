import * as React from "react";
import Card from "./Card";
import Grid from "@material-ui/core/Grid";
import RemainingDay from "./RemainingDay";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Holiday from "./Holiday";
import Group from "./Group";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { State } from "../componentsModels/HomeState";

const baseUrl = "http://localhost:64008/api/";

var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

export default class Home extends React.Component {
    state: State = {
        upcomingHoliday: []
    };

    componentDidMount() {
        var self = this;
        axios
            .get(
                baseUrl + "LeaveDashboard/GetUpcomingHoliday?numberOfHoliday=4",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    }
                }
            )
            .then(function(response) {
                console.log(response.data);
                self.setState({ upcomingHoliday: response.data });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="home">
                <Grid container justify="center">
                    <Grid item lg={8} xs={12} className="remaining-day-card">
                        <Card name="Remaining days">
                            <Grid container direction="row" className="list">
                                <RemainingDay day={6.5} reason="Annual Leave" />
                                <RemainingDay day={-2} reason="Sick Leave" />
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item lg={8} xs={12} className="holiday-card">
                        <Card name="Upcoming holidays">
                            <Grid container direction="row" className="list">
                                {this.state.upcomingHoliday.map(holiday => (
                                    <ExpansionPanel className="expansion">
                                        <ExpansionPanelSummary
                                            className="heading"
                                            expandIcon={
                                                <ChevronRight className="icon" />
                                            }
                                        >
                                            <Holiday
                                                day={
                                                    holiday.numberOfDay <= 1
                                                        ? holiday.startDate
                                                        : holiday.startDate +
                                                          " to " +
                                                          holiday.endDate
                                                }
                                                reason={holiday.displayName}
                                                holidayNumber={
                                                    holiday.numberOfDay
                                                }
                                            />
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails className="expansion-detail">
                                            <p className="body">
                                                No description
                                            </p>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                ))}
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item lg={8} xs={12} className="team-leave-card">
                        <Card name="Team leaves">
                            <Grid container direction="row" className="list">
                                <ExpansionPanel className="expansion">
                                    <ExpansionPanelSummary
                                        className="heading"
                                        expandIcon={<ChevronRight />}
                                    >
                                        <Typography className="text">
                                            Global group
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails className="expansion-detail">
                                        <p className="body">
                                            No one is this team has any leave
                                            requests
                                        </p>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel className="expansion">
                                    <ExpansionPanelSummary
                                        className="heading"
                                        expandIcon={<ChevronRight />}
                                    >
                                        <Typography className="text">
                                            New group
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails className="expansion-detail">
                                        <Group
                                            name="Johnson Mary"
                                            type="Annual Leave"
                                            date="24-May-2019"
                                            timeBox="Full Day"
                                        />
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
                <button className="add-request">
                    <AddIcon />
                </button>
            </div>
        );
    }
}
