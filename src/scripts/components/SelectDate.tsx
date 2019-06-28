import * as React from "react";
import DatePicker from "react-datepicker";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import * as vi from "date-fns/locale/vi/index.js";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { Props } from "../componentsModels/SelectDateProps";
import { State } from "../componentsModels/SelectDateState";
import { deepOrange } from "@material-ui/core/colors";

registerLocale("vi", vi);
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

const theme = createMuiTheme({
    palette: {
        primary: deepOrange
    },
    overrides: {
        MuiDialog: {
            paperWidthSm: {
                margin: 0
            },
            paperScrollPaper: {
                maxHeight: "100%"
            }
        }
    }
});

export default class SelectDate extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.handleSelectDate = this.handleSelectDate.bind(this);
        this.handleToggleDatePicker = this.handleToggleDatePicker.bind(this);
        this.handleCloseDatePicker = this.handleCloseDatePicker.bind(this);
        this.handleClearDate = this.handleClearDate.bind(this);
    }

    state: State = {
        date: "",
        isShowDatePicker: false,
        formattedDate: ""
    };

    handleSelectDate(value) {
        this.setState({
            date: value
        });
        let stringDateFormat =
            value.getDate() +
            "-" +
            months[value.getMonth()] +
            "-" +
            value.getFullYear();
        this.setState({ formattedDate: stringDateFormat });

        let ISODate = value.toISOString();

        let stringDate =
            value.getDate() +
            "-" +
            (value.getMonth() + 1 > 9
                ? value.getMonth() + 1
                : "0" + (value.getMonth() + 1)) +
            "-" +
            value.getFullYear();

        this.props.getDate(stringDate, ISODate);
    }

    handleClearDate() {
        this.setState({
            date: null
        });
        this.setState({ formattedDate: "" });
        this.props.getDate("", "");
    }

    handleToggleDatePicker() {
        this.setState({ isShowDatePicker: !this.state.isShowDatePicker });
    }

    handleCloseDatePicker() {
        this.setState({ isShowDatePicker: false });
    }

    isWeekday(date) {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Grid container direction="column">
                    <TextField
                        onClick={this.handleToggleDatePicker}
                        fullWidth
                        value={this.state.formattedDate}
                        label={this.props.label}
                        placeholder={this.props.placeholder}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <Dialog
                        className="select-date"
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.isShowDatePicker}
                        onClose={this.handleCloseDatePicker}
                    >
                        <DatePicker
                            filterDate={this.isWeekday}
                            locale="vi"
                            calendarClassName="date-picker"
                            inline
                            selected={this.state.date}
                            onChange={this.handleSelectDate}
                            showMonthDropdown
                            showYearDropdown
                        />
                        <div className="datepicker-action">
                            <Button
                                variant="outlined"
                                className="apply"
                                onClick={this.handleCloseDatePicker}
                            >
                                Apply
                            </Button>
                            <Button
                                variant="outlined"
                                className="action-button"
                                onClick={this.handleClearDate}
                            >
                                Clear
                            </Button>
                        </div>
                    </Dialog>
                </Grid>
            </MuiThemeProvider>
        );
    }
}
