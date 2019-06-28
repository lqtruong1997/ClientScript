import * as React from "react";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CalendarToday from "@material-ui/icons/CalendarToday";
import Grid from "@material-ui/core/Grid";
import { Props } from "../componentsModels/GroupProps";

export default class Group extends React.Component<Props> {
    render() {
        return (
            <Grid container direction="row" className="group">
                <div>
                    <AccountCircleIcon className="logo" />
                </div>
                <div className="detail">
                    <Grid container direction="column">
                        <p className="name">{this.props.name}</p>
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            className="leave-type"
                        >
                            <BusinessCenterIcon className="icon" />
                            <p>{this.props.type}</p>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            className="date"
                        >
                            <CalendarToday className="icon" />
                            <p>{this.props.date}</p>
                        </Grid>
                        <Grid container direction="row" alignItems="center">
                            <TimelapseIcon className="icon" />
                            <p>{this.props.timeBox}</p>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        );
    }
}
