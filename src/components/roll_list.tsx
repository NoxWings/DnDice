import { h, Component } from "preact";
import { RollInput } from "./roll_input";
import { Roll } from "../models/Roll";

export interface RollListProps {
    rolls: Readonly<Roll[]>;
    onRollAdd: (newRoll: Roll) => void;
    onRollRemove: (index: number) => void;
}

export class RollList extends Component<RollListProps, {}> {
    public render({ rolls, onRollAdd, onRollRemove }: RollListProps) {
        return <div>
            <RollInput onNewRoll={onRollAdd} />
            <ul class="rollList">
                {rolls.map((roll, i) =>
                    <li>{roll.string}<span class="close" onClick={onRollRemove.bind(i)} /></li>
                )}
            </ul>
        </div>;
    }
}
