import * as React from "react";
import { Grid } from "@material-ui/core";
import CalendarToday from "@material-ui/icons/CalendarToday";
import { Props } from "../componentsModels/HolidayProps";

export default class Holiday extends React.Component<Props> {
    render() {
        return (
            <Grid
                container
                direction="row"
                className="holiday"
                alignItems="center"
            >
                <div>
                    <Grid item className="number">
                        <p>{this.props.holidayNumber}</p>
                    </Grid>
                    <Grid item className="text">
                        <p>day</p>
                    </Grid>
                </div>
                <div>
                    <Grid item container direction="column">
                        <Grid
                            container
                            item
                            direction="row"
                            alignItems="center"
                            className="day"
                        >
                            <Grid item>
                                <CalendarToday />
                            </Grid>
                            <Grid item>
                                <p>{this.props.day}</p>
                            </Grid>
                        </Grid>
                        <Grid item>{this.props.reason}</Grid>
                    </Grid>
                </div>
            </Grid>
        );
    }
}
