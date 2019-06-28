import * as React from "react";
import { Grid } from "@material-ui/core";
import CalendarToday from "@material-ui/icons/CalendarToday";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import CommentIcon from "@material-ui/icons/Comment";
import { Props } from "../componentsModels/RequestProps";

export default class Request extends React.Component<Props> {
    render() {
        return (
            <div className="request">
                <div>
                    <Grid className="number">
                        <p>{this.props.days}</p>
                    </Grid>
                    <Grid className="text">
                        <p>days</p>
                    </Grid>
                </div>
                <div>
                    <Grid container direction="column" className="content">
                        <Grid item xs={12} className="during">
                            <CalendarToday />
                            <p>{this.props.during}</p>
                        </Grid>
                        <Grid
                            container
                            item
                            direction="row"
                            alignItems="center"
                            className="pending"
                        >
                            <Grid item>
                                <AccessTimeIcon />
                            </Grid>
                            <Grid item>
                                <p>Pending</p>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            direction="row"
                            alignItems="center"
                            className="annual-leave"
                        >
                            <Grid item>
                                <BusinessCenterIcon />
                            </Grid>
                            <Grid item>
                                <p>{this.props.leaveType}</p>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            direction="row"
                            alignItems="center"
                            className="vacation"
                        >
                            <Grid item>
                                <CommentIcon />
                            </Grid>
                            <Grid item>
                                <p>Vacation</p>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}
