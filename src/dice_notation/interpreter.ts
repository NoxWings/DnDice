import { DiceParserBaseVisitor } from "./parser";
import { tokenMatcher } from "chevrotain";
import { Roll } from "../models/Roll";
import { Plus } from "./tokens";
import { SemanticError } from "./errors";

export class DiceInterpreter extends DiceParserBaseVisitor {
    private static _instance = new DiceInterpreter();
    public static get instance() { return DiceInterpreter._instance; }

    private constructor() {
        super();
        this.validateVisitor();
    }

    public expression(ctx) {
        return this.visit(ctx.additionExpression);
    }

    protected additionExpression(ctx) {
        let result = this.visit(ctx.lhs);

        if (ctx.rhs) {
            ctx.rhs.forEach((rhsOperand, idx) => {
                const operator = ctx.AdditionOperator[idx];
                const rhsValue = this.visit(rhsOperand);

                if (tokenMatcher(operator, Plus)) {
                    result = this.add(result, rhsValue);
                } else {
                    result = this.minus(result, rhsValue);
                }
            });
        }

        return result;
    }

    protected multiplicationExpression(ctx) {
        let result = this.visit(ctx.lhs);

        if (ctx.rhs) {
            ctx.rhs.forEach((rhsOperand) => {
                const rhsValue = this.visit(rhsOperand);
                result = this.multiply(result, rhsValue);
            });
        }

        return result;
    }

    protected atomicExpression(ctx) {
        if (ctx.Integer) {
            const integer = parseInt(ctx.Integer[0].image, 10);
            return integer;
        } else if (ctx.Dice) {
            const diceSize = parseInt(ctx.Dice[0].image.slice(1), 10);
            return Roll.fromDie(diceSize);
        } else if (ctx.subExpression) {
            return this.visit(ctx.subExpression);
        }
    }

    protected subExpression(ctx) {
        return this.visit(ctx.expression);
    }

    protected add(a, b) {
        const aIsRoll = a instanceof Roll;
        const bIsRoll = b instanceof Roll;

        if (aIsRoll || bIsRoll) {
            return toDice(a).add(toDice(b));
        } else {
            return a + b;
        }
    }

    protected minus(a, b) {
        const aIsRoll = a instanceof Roll;
        const bIsRoll = b instanceof Roll;

        if (aIsRoll || bIsRoll) {
            return toDice(a).minus(toDice(b));
        } else {
            return a - b;
        }
    }

    protected multiply(a, b) {
        const aIsRoll = a instanceof Roll;
        const bIsRoll = b instanceof Roll;

        if (aIsRoll && bIsRoll) {
            throw new SemanticError("You can't multiply two dice together.");
        }

        if (aIsRoll) {
            return a.multiply(b);
        } else if (bIsRoll) {
            return b.multiply(a);
        } else {
            return a * b;
        }
    }
}

function toDice(value) {
    if (value instanceof Roll) {
        return value;
    }
    return Roll.fromDie(1).multiply(value);
}
