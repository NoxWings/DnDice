import * as Color from "color";

export function createDatasetSyle(color: string) {
    const reference = Color(color);
    const baseColor = reference.rgb();
    const fillColor = reference.alpha(0.3);

    return {
        fill: "origin",
        backgroundColor: fillColor,
        borderColor: baseColor,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: baseColor,
        pointHoverBorderColor: "#fff",
        pointBackgroundColor: "#fff",
        pointHoverBackgroundColor: baseColor,
        pointBorderWidth: 2,
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 5,
        pointHitRadius: 10
    };
}
