import { RollDistribution } from "./RollDistribution";

const d = RollDistribution.singleDice;
const diceCombination = d(3).combine(d(3)).combine(d(4));

console.log(diceCombination);
