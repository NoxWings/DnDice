import { RollDistribution } from "./RollDistribution";

const d = RollDistribution.singleDice;
const diceCombination = d(3).add(d(3)).add(d(4));

console.log(diceCombination);
