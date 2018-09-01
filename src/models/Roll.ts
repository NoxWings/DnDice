import { zip, range, times, constant } from "lodash";
import d from "../dice_notation";

type operatorFunction = (result1: number, result2: number) => number;

export class Roll {
    public static fromDie(diceSize: number) {
        const outcomes = range(1, diceSize + 1);
        const odds = times(diceSize, constant(1));
        const partialOdds = new Map(zip(outcomes, odds));

        return Roll.fromOdds(partialOdds, diceSize);
    }

    private static fromOdds(odds: Map<number, number>, denominator: number) {
        const roll = new Roll();
        roll.odds = new Map(odds);
        roll.denominator = denominator;
        return roll;
    }

    private _string: string = "";
    private odds: Map<number, number> = new Map();
    private denominator: number = 1;

    constructor(rollString?: string) {
        if (rollString) {
            this.string = rollString;
        }
    }

    set string(value) {
        const parsedRoll = d(value);

        this._string = value;
        this.odds = new Map(parsedRoll.odds);
        this.denominator = parsedRoll.denominator;
    }

    get string() {
        return this._string;
    }

    public add(otherRoll: Roll) {
        return this.combine(otherRoll, (a, b) => a + b);
    }

    public minus(otherRoll: Roll) {
        return this.combine(otherRoll, (a, b) => a - b);
    }

    public multiply(numberOfTimes: number) {
        const initialRoll = this.copy();
        let result = this.copy();

        for (let i = 1; i < numberOfTimes; i++) {
            result = result.add(initialRoll);
        }

        return result;
    }

    private combine(otherRoll: Roll, operationFn: operatorFunction) {
        const denominator = this.denominator * otherRoll.denominator;
        const odds = new Map();

        otherRoll.odds.forEach((contributionB, rollB) => {
            this.odds.forEach((contributionA, rollA) => {
                const rollC = operationFn(rollA, rollB);
                const contributionC = contributionA * contributionB;

                const currentOdds = odds.get(rollC) || 0;
                odds.set(rollC, currentOdds + contributionC);
            });
        });

        return Roll.fromOdds(odds, denominator);
    }

    private copy() {
        return Roll.fromOdds(this.odds, this.denominator);
    }
}
