import * as React from "react";
const HrLogo = "./images/omnia-hr-logo-w.png";
import LoginForm from "../components/LoginForm";
import { Redirect } from "react-router-dom";
import { State } from "../componentsModels/LoginState";

interface Props {}

export default class Login extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }
    state: State = {
        isRedirect: false
    };

    handleSubmitForm(event: any) {
        event.preventDefault();
        console.log("Handle submit", event);
        this.setState({ isRedirect: true });
    }

    render() {
        return (
            <div>
                {this.state.isRedirect && (
                    <Redirect to="/leave-dashboard" push />
                )}
                <header className="login-header">
                    <img
                        src={HrLogo}
                        className="hr-logo"
                        alt="This is omnia hr logo"
                    />
                </header>
                <main className="login-body">
                    <LoginForm handleSubmitForm={this.handleSubmitForm} />
                </main>
            </div>
        );
    }
}
