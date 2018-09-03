import { h, Component } from "preact";
import { Roll } from "../models/Roll";

export interface RollInputProps {
    onNewRoll: (roll: Roll) => void;
}

export interface RollInputState {
    value: string;
    errors: string[];
}

export class RollInput extends Component<RollInputProps, RollInputState> {
    constructor(props: RollInputProps) {
        super(props);

        this.setState({ value: "", errors: [] });
    }

    public render() {
        return <div>
            <input type="text"
                onInput={this.handleInput.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
                placeholder="input your roll"
                value={this.state.value}
            />
            <ul>
                {this.state.errors.map(e => <li>{e}</li>)}
            </ul>
        </div>;
    }

    public handleInput(e) {
        this.setState({
            value: e.target.value,
            errors: []
        });
    }

    public handleKeyPress(e) {
        if (e.key === "Enter") {
            try {
                const roll = new Roll(this.state.value);
                this.props.onNewRoll(roll);
                this.setState({
                    value: "",
                    errors: []
                });
            } catch (e) {
                this.setState({
                    value: this.state.value,
                    errors: e.message.split("\n")
                });
            }
        }
    }
}
