import { colors } from "./colors";
import { createDatasetSyle } from "./create_dataset_style";
import { entries } from "lodash";

const toDataPoint = ([key, value]) => ({ x: key, y: value });

export function createDataset(label: string, distribution: { [s: string]: number }, index: number) {
    const color = colors[index % colors.length];
    const style = createDatasetSyle(color);
    const data = entries(distribution).map(toDataPoint);

    return Object.assign(style, {
        label,
        lineTension: 0.1,
        data
    });
}
