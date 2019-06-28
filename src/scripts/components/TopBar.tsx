import * as React from "react";
import IconButton from "@material-ui/core/IconButton";
import NotificationIcon from "@material-ui/icons/NotificationsNone";
import Grid from "@material-ui/core/Grid";
import { Props } from "../componentsModels/TopBarProps";

export default class TopBar extends React.Component<Props> {
    render() {
        return (
            <header className="top-bar">
                <Grid container className="container">
                    <Grid item lg={2} />
                    <Grid item lg={7}>
                        <h3 className="app-name">{this.props.text}</h3>
                    </Grid>
                    <Grid
                        item
                        container
                        lg={1}
                        justify="flex-end"
                        alignItems="center"
                    >
                        <Grid item>
                            <IconButton
                                aria-label="notification"
                                className="notification"
                            >
                                <NotificationIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item lg={2} />
                </Grid>
            </header>
        );
    }
}
