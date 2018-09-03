import { colors } from "./colors";
import { createDatasetSyle } from "./create_dataset_style";
import { Roll } from "../models/Roll";
import { entries } from "lodash";

const toDataPoint = ([key, value]) => ({ x: key, y: value });

export function createDataset(roll: Roll, index: number) {
    const color = colors[index % colors.length];
    const style = createDatasetSyle(color);
    const data = entries(roll.distribution).map(toDataPoint);

    return Object.assign(style, {
        label: roll.string,
        lineTension: 0.1,
        data
    });
}
