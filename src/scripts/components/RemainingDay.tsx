import * as React from "react";
import { Props } from "../componentsModels/RemainingDayProps";

export default class RemainingDay extends React.Component<Props> {
    render() {
        return (
            <div className="remaining-day">
                <div className="number">
                    <p>{this.props.day}</p>
                </div>
                {this.props.reason}
            </div>
        );
    }
}
