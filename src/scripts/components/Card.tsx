import * as React from "react";
import { Props } from "../componentsModels/CardProps";

export default class Card extends React.Component<Props> {
    render() {
        return (
            <section className="card">
                {this.props.name != "" && (
                    <p className="card-name">{this.props.name}</p>
                )}
                {this.props.children}
            </section>
        );
    }
}
