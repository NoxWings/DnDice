import { h, Component } from "preact";
import { Roll } from "../models/Roll";
import { Line } from "preact-chartjs-2";
import { createDataset } from "../data_helpers/create_dataset";
import { chartOptions } from "../data_helpers/chart_options";

export interface RollChartProps {
    rolls: Readonly<Roll[]>;
}

export interface RollChartState {
    datasets: object;
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
        return <Line data={this.state} options={chartOptions} />;
    }

    private updateChartData() {
        const datasets = this.props.rolls.map(createDataset);
        this.setState({ datasets });
    }
}
