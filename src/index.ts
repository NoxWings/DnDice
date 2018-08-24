import { RollDistribution } from "./RollDistribution";

const d = RollDistribution.singleDice;
const magicMissile = d(4).add(d(1)).multiply(3);

console.log(magicMissile);



