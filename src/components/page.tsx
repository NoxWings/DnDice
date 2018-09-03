import { h, Component } from "preact";
import { RollList } from "./roll_list";
import { RollChart } from "./roll_chart";
import { Roll } from "../models/Roll";
import { clone } from "lodash";

interface PageState {
    rolls: Roll[];
}

export class Page extends Component<{}, PageState> {
    constructor(props) {
        super(props);

        this.state = { rolls: [] };
    }

    public render() {
        return <div>
            <RollList
                rolls={this.state.rolls}
                onRollAdd={this.addRoll.bind(this)}
                onRollRemove={this.removeRoll.bind(this)}
            />
            <RollChart rolls={this.state.rolls} />
        </div>;
    }

    public addRoll(roll) {
        const rolls = clone(this.state.rolls);
        rolls.push(roll);

        this.setState({ rolls });
    }

    public removeRoll(i) {
        const rolls = clone(this.state.rolls);
        rolls.splice(i, 1);

        this.setState({ rolls });
    }
}
