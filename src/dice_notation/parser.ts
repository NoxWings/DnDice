import { lexer, tokens } from "./lexer";
import { Parser } from "chevrotain";

// ---Grammar---

// expression
//     : additionExpression
// additionExpression
//     : multiplicationExpression { AdditionOperator, multiplicationExpression }
// multiplicationExpression
//     : atomicExpression { MultiplicationOperator, atomicExpression }
// atomicExpression
//     : Integer | Dice | subExpression
// subExpression
//     : LParen expression RParen

export class DiceParser extends Parser {
    private static _instance: DiceParser;

    public static get instance () {
        if (!DiceParser._instance) {
            DiceParser._instance = new DiceParser();
        }
        return DiceParser._instance;
    }

    private expression;
    private additionExpression;
    private multiplicationExpression;
    private atomicExpression;
    private subExpression;

    private constructor () {
        super([], tokens);

        this.RULE("expression", () => {
            this.SUBRULE(this.additionExpression);
        });
        this.RULE("additionExpression", () => {
            this.SUBRULE(this.multiplicationExpression, { LABEL: "lhs" });
            this.MANY(() => {
                this.CONSUME(tokens.AdditionOperator);
                this.SUBRULE2(this.multiplicationExpression, { LABEL: "rhs" });
            });
        });
        this.RULE("multiplicationExpression", () => {
            this.SUBRULE(this.atomicExpression, { LABEL: "lhs" });
            this.MANY(() => {
                this.OPTION(() => {
                    this.CONSUME(tokens.MultiplicationOperator);
                });
                this.SUBRULE2(this.atomicExpression, { LABEL: "rhs" });
            });
        });
        this.RULE("atomicExpression", () => {
            this.OR([
                { ALT: () => { this.CONSUME(tokens.Integer); } },
                { ALT: () => { this.CONSUME(tokens.Dice); } },
                { ALT: () => { this.SUBRULE(this.subExpression); } }
            ]);
        });
        this.RULE("subExpression", () => {
            this.CONSUME(tokens.LParen);
            this.SUBRULE(this.expression);
            this.CONSUME(tokens.RParen);
        });

        this.performSelfAnalysis();
    }

    public parse (input: string) {
        const lexingResult = lexer.tokenize(input);

        if (lexingResult.errors.length > 0) {
            throw new Error("Lexing errors detected");
        }

        this.input = lexingResult.tokens;

        this["expression"]();

        if (this.errors.length > 0) {
            const errorMessages = [
                "Parsing errors detected",
                ...this.errors.map(error => error.message)
            ].join("\n");

            throw new Error(errorMessages);
        }
    }
}
