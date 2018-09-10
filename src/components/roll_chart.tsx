import { h, Component } from "preact";
import { Roll } from "../models/Roll";
import { Line } from "preact-chartjs-2";
import { createDataset } from "../data_helpers/create_dataset";
import { chartOptions } from "../data_helpers/chart_options";
import { entries, cloneDeep } from "lodash";

export interface RollChartProps {
    rolls: Readonly<Roll[]>;
}

export interface RollChartState {
    data: any;
    selected: string;
}

export class RollChart extends Component<RollChartProps, RollChartState> {
    constructor(props) {
        super(props);

        this.updateChartData();
    }

    public componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.updateChartData();
        }
    }

    public render() {
        const selected = this.state.selected;
        const selectedData = cloneDeep(this.state.data[selected]);

        return (
            <div>
                <form>
                    {entries<any>(this.state.data).map(([id, { name }]) => (
                        <div>
                            <input
                                type="radio"
                                name="chartType"
                                id={id} value={id}
                                checked={id === selected}
                                onClick={this.updateSelection.bind(this)}
                            />
                            <label for={id}>{name}</label>
                        </div>
                    ))}
                </form>
                <Line data={selectedData} options={chartOptions} />
            </div>
        );
    }

    private updateChartData() {
        this.setState({
            selected: this.state.selected || "normal",
            data: this.calculateData()
        });
    }

    private updateSelection(e) {
        this.setState({
            selected: e.target.value,
            data: this.state.data
        });
    }

    private calculateData() {
        return {
            normal: { name: "Normal", datasets: this.rollDataset("distribution") },
            atleast: { name: "At least", datasets: this.rollDataset("distributionAtLeast") },
            atmost: { name: "At most", datasets: this.rollDataset("distributionAtMost") }
        };
    }

    private rollDataset(distributionName: string) {
        return this.props.rolls.map((roll, index) =>
            createDataset(roll.string, roll[distributionName], index)
        );
    }
}
