import * as React from "react";
import { Props } from "../componentsModels/LoginFormProps";

interface State {
    userName: string;
    passWord: string;
}

export default class LoginForm extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePassWordChange = this.handlePassWordChange.bind(this);
    }
    state: State = {
        userName: "",
        passWord: ""
    };

    handleSubmitForm(event: any) {
        this.props.handleSubmitForm(event);
    }
    handleUserNameChange(event: any) {
        this.setState({ userName: event.target.value });
    }
    handlePassWordChange(event: any) {
        this.setState({ passWord: event.target.value });
    }
    render() {
        return (
            <form className="login-form" onSubmit={this.handleSubmitForm}>
                <label className="form-label">Username</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="Username"
                    value={this.state.userName}
                    onChange={this.handleUserNameChange}
                />
                <label className="form-label">Password</label>
                <input
                    type="password"
                    className="form-input"
                    placeholder="Password"
                    value={this.state.passWord}
                    onChange={this.handlePassWordChange}
                />
                <button type="submit" className="form-button">
                    Login
                </button>
                <a className="form-link" href="#">
                    Forgot your password?
                </a>
            </form>
        );
    }
}
