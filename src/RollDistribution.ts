import { zip, range, times, constant } from "lodash";

export class RollDistribution {
    constructor(private odds: Map<number, number>,
                private denominator: number) {}

    add (otherRoll: RollDistribution) {
        const denominator = this.denominator * otherRoll.denominator;
        const odds = new Map();

        otherRoll.odds.forEach((contributionA, rollA) => {
            this.odds.forEach((contributionB, rollB) => {
                const rollC = rollA + rollB;
                const contributionC = contributionA * contributionB;

                odds.set(rollC, (odds.get(rollC) || 0) + contributionC);
            });
        });

        return new RollDistribution(odds, denominator);
    }

    multiply (times: number) {
        const initialRoll = this.copy();
        let result = initialRoll;

        for (let i = 1; i < times; i++) {
            result = result.add(initialRoll);
        }

        return result;
    }

    private copy () {
        return new RollDistribution(new Map(this.odds), this.denominator);
    }

    static singleDice(diceSize: number) {
        const outcomes = range(1, diceSize + 1);
        const odds = times(diceSize, constant(1));
        const partialOdds = new Map(zip(outcomes, odds));

        return new RollDistribution(partialOdds, diceSize);
    }
}
