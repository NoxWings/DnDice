import { h, Component } from "preact";
import { Roll } from "../models/Roll";

export interface RollChartProps {
    rolls: Readonly<Roll[]>;
}

export class RollChart extends Component<RollChartProps, {}> {
    public render({ rolls }: RollChartProps) {
        return <div>
            <h1>Roll chart</h1>
        </div>;
    }
}
