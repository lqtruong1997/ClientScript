import * as React from "react";
import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";
import PersonIcon from "@material-ui/icons/Person";
import Grid from "@material-ui/core/Grid";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { Props } from "../componentsModels/FooterProps";
import { State } from "../componentsModels/FooterState";

const theme = createMuiTheme({
    props: {
        MuiBottomNavigationAction: {
            className: "navigation-action"
        }
    },
    overrides: {
        MuiBottomNavigation: {
            root: {
                width: "100%"
            }
        },
        MuiBottomNavigationAction: {
            root: {
                maxWidth: "100%"
            }
        }
    }
});

export default class Footer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    state: State = {
        page: 0,
        isRedirectToDashboard: true
    };

    handleChange(event: any, value: number) {
        event.preventDefault();
        this.props.handleChangePage(event, value);
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <footer className="footer">
                    <Grid container justify="center">
                        <Grid
                            item
                            container
                            xs={12}
                            justify="center"
                            className="footer-bar"
                        >
                            <Grid
                                item
                                container
                                lg={8}
                                xs={12}
                                className="nav-bar"
                                justify="center"
                            >
                                <BottomNavigation
                                    value={this.props.page}
                                    onChange={this.handleChange}
                                    showLabels
                                    className="navigation"
                                >
                                    <BottomNavigationAction
                                        className="item"
                                        label="Home"
                                        icon={<HomeIcon />}
                                    />
                                    <BottomNavigationAction
                                        className="item"
                                        label="Request List"
                                        icon={<ListIcon />}
                                    />
                                    <BottomNavigationAction
                                        className="item"
                                        label="Profile"
                                        icon={<PersonIcon />}
                                    />
                                </BottomNavigation>
                            </Grid>
                        </Grid>
                    </Grid>
                </footer>
            </MuiThemeProvider>
        );
    }
}
